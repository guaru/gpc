package com.gisnet.gpc.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.mail.MessagingException;
import com.gisnet.gpc.domain.security.Authoritie;
import com.gisnet.gpc.domain.security.Function;
import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.ConfirmationDTO;
import com.gisnet.gpc.dto.FunctionDTO;
import com.gisnet.gpc.dto.MailDTO;
import com.gisnet.gpc.repository.repository.IUserRepository;
import com.gisnet.gpc.service.IAuthoritieService;
import com.gisnet.gpc.service.IMailService;
import com.gisnet.gpc.service.IUserService;
import com.gisnet.gpc.util.PredicateUtil;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/**
 * <h3>UserDetailServiceImpl</h3>
 * <p>
 * Service implements UserDetailsService from Spring Security
 * </p>
 * 
 * @author Alejandro Ventura
 * @since 28-01-2021
 */
@Service
public class UserDetailService implements IUserService, UserDetailsService {

    @Autowired
    private IUserRepository iUserRepository;

    @Autowired
    private PredicateUtil<User> predicateUtil;

    @Autowired
    private IAuthoritieService iAuthoritieService;  

    @Autowired
    private IMailService iMailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        User user = iUserRepository.findByUserName(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
        return UserPrinciple.build(user);
    }

    @Override
    public Page<User> findAllUsers(Pageable pageable, String name,Long officeId) {
      TextCriteria text = new TextCriteria();
      text.caseSensitive(false);
      text.matching(name);
      BooleanBuilder where = new BooleanBuilder();  
      if(!Utils.isEmpty(name))
           where.and(this.predicateUtil.toTextPredicate(text,User.class));
       if(where.getValue()!=null)
           return iUserRepository.findAll(where.getValue(), pageable);
        else 
            return iUserRepository.findAll(pageable);
    }
    
   
    @Override
    @Transactional(readOnly = true)
    public User findByUserName(String username) {
        return iUserRepository.findByUserName(username).orElseGet(null);
    }

    @Override
    public Optional<User> findById(String id) {
        return iUserRepository.findById(id);
    }

    @Override
    @Transactional(readOnly =  true)
    public List<FunctionDTO> getFunctions(String username) {
        User user  =  iUserRepository.findByUserNameAndEnabledTrue(username);
        List<FunctionDTO> nav =  new ArrayList<FunctionDTO>();
        if(user.getFunctions()!=null){
            List<Function> fathers = user.getFunctions().stream().filter(x -> x.getFunctionFather() == null)
                    .collect(Collectors.toList());
            fathers.forEach(x -> {
                List<Function> child = user.getFunctions().stream()
                        .filter(i -> i.getFunctionFather() != null && i.getFunctionFather().getId().equals(x.getId()))
                        .collect(Collectors.toList());
                nav.add(new FunctionDTO(x, child));
            });
        }
      
        return nav;
    }

    @Override
    public User create(User user) {
        //BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String uuid = java.util.UUID.randomUUID().toString();
        //String credentials = "password"
        //uuid = encoder.encode(uuid);
        Calendar now = Calendar.getInstance();
        now.add(Calendar.HOUR, 24);
        user.setFunctions(this.parseFunctions(user.getAuthorities()));
        user.setPassword(uuid);
        user.setSendEmailRegister(false);
        user.setExpirationConfirmation(now.getTime());
        iUserRepository.save(user);

        Runnable runnable = 
        new Runnable() {
            @Override
            public void run() { UserDetailService.this.sendMailRegister(user); }
        };

        Thread thread = new Thread(runnable);
        thread.start();

        return user;
    }

    @Override
    public User update(User source) {
        User user = iUserRepository.findById(source.getId()).orElse(null);
        if(user!=null){
            source.setFunctions(this.parseFunctions(source.getAuthorities()));
            user.update(source);
            iUserRepository.save(user);
        }else{
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Override
    public User confirmationUser(ConfirmationDTO source) {
        User user = iUserRepository.findById(source.getId()).orElse(null);
        if(user!=null){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(source.getPassword()));
            user.setEnabled(true);
            iUserRepository.save(user);
        }else{
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Override
    public boolean delete(String id) {
       Optional<User> user  = this.findById(id);
       if(user.isPresent()){
           this.iUserRepository.delete(user.get());
           return true;
       }
       return false;
    }

    @Override
    public boolean enabled(String id, boolean enabled) {
        Optional<User> user = this.findById(id);
        if(user.isPresent()){
            User userEntity = user.get();
            userEntity.enabled(enabled);
            this.iUserRepository.save(userEntity);
            return true;
        }
        return false;
    }

    private  List<Function> parseFunctions(List<Authoritie> authorities){
        if(authorities==null || authorities.size()<=0)
          return null;

        List<Function> functions = new ArrayList<Function>();
        authorities.stream().forEach(x -> {
            Authoritie authoritie = this.iAuthoritieService.findOne(x.id);
            if(!Utils.isEmpty(authoritie.getFunctions())){
                authoritie.getFunctions().stream().forEach(functionId -> {
                    functions.add(new Function(functionId));
                });
            }
            
        });
        return functions;
    }

    @Override
    public void sendMailRegister(User user) {

        MailDTO mail = new MailDTO();
        mail.setFrom("aventura@e-gisnet.com");// replace with your desired email
        mail.setMailTo(user.getEmail());// replace with your desired email
        mail.setSubject("Completar registro");

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", "Developer!");
        model.put("location", "United States");
        model.put("sign", "Java Developer");
        mail.setProps(model);

        try {
            iMailService.sendMail(mail,user);
            user.setSendEmailRegister(true);
            this.iUserRepository.save(user);
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    
    @Override
    public List<User> getOperators(ObjectId officeId) {
       return this.iUserRepository.findOperators(officeId,new ObjectId("6032fff88eb6c936593425f8"));
    }

}

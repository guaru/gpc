package com.gisnet.gpc.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.gisnet.gpc.domain.security.Function;
import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.FunctionDTO;
import com.gisnet.gpc.repository.repository.IUserRepository;
import com.gisnet.gpc.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = iUserRepository.findByUserName(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
        return UserPrinciple.build(user);
    }

    @Override
    public Page<User> findAllUsers(Pageable pageable, String userName,Long officeId) {
        return iUserRepository.findUsers(userName, officeId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByUserName(String username) {
        return iUserRepository.findByUserName(username).orElseGet(null);
    }

    @Override
    public Optional<User> findById(Long id) {
        return iUserRepository.findById(id);
    }

    @Override
    @Transactional(readOnly =  true)
    public List<FunctionDTO> getFunctions(String username) {
        User user  =  iUserRepository.findByUserNameAndEnabledTrue(username);
        List<FunctionDTO> nav =  new ArrayList<FunctionDTO>();
        Set<Function>  functions  =  user.getFunctions();
        List<Function> fathers = functions.stream().filter(x->x.getFunctionFather()==null).collect(Collectors.toList());
        fathers.forEach(x->{
            List<Function> child = functions.stream().filter(i->i.getFunctionFather()!=null && i.getFunctionFather().getId().equals(x.getId())).collect(Collectors.toList());
            nav.add(new FunctionDTO(x,child));
        });
        return nav;
    }

}

package com.gisnet.gpc.api;

import java.util.Optional;
import javax.validation.Valid;
import com.gisnet.gpc.constants.ConstantEnum;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.EnabledDTO;
import com.gisnet.gpc.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = ConstantWebApi.USERS_URI)
@Secured(ConstantEnum.Authoritie.Code.ROLE_ADMIN)
public class UserRestController  {

  

    @Autowired
    IUserService userService;

    @GetMapping
    public ResponseEntity<Page<User>>  index(Pageable  pageable,String userName,Long officeId){
            return new ResponseEntity<>(userService.findAllUsers(pageable, userName, officeId), HttpStatus.OK);
    }


    @GetMapping(value = ConstantWebApi.ID_URI )
    public ResponseEntity<?> getUser(@PathVariable(ConstantWebApi.ID) String idUser) {
        Optional<User> user = userService.findById(idUser);
        return   user.isPresent() ? new ResponseEntity<User>(user.get(), HttpStatus.OK)  :
                    new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user){
        return new ResponseEntity<>(userService.create(user),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> update(@Valid @RequestBody User user){
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

    @PutMapping("/enabled")
    public ResponseEntity<?> enabled(@Valid @RequestBody EnabledDTO enabled) {
        return new ResponseEntity<>(userService.enabled(enabled.getId(),enabled.isEnabled()), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
     return  new ResponseEntity<>(userService.delete(id), HttpStatus.OK);
    }

}

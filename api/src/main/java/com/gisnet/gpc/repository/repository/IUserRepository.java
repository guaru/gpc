package com.gisnet.gpc.repository.repository;

import java.util.Optional;
import com.gisnet.gpc.domain.security.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;




/**
 * @author Alejandro Ventura
 * @since 13-02-2021
 */
public interface IUserRepository extends MongoRepository<User, String> , QuerydslPredicateExecutor<User>   {

       
       public Optional<User> findByUserName(String username);

       public User findByUserNameAndEnabledTrue(String username);

}

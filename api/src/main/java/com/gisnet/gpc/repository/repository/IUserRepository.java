package com.gisnet.gpc.repository.repository;

import java.util.List;
import java.util.Optional;
import com.gisnet.gpc.domain.security.User;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;




/**
 * @author Alejandro Ventura
 * @since 13-02-2021
 */
public interface IUserRepository extends MongoRepository<User, String> , QuerydslPredicateExecutor<User>   {

       
       public Optional<User> findByUserName(String username);

       public User findByUserNameAndEnabledTrue(String username);

        @Query(value = "{$and :["
            + "?#{ [0] == null ? { $where : 'true'} : { 'office.$id' : [0] } },"
            + "?#{ [1] == null ? { $where : 'true'} : { 'authorities.$id' : [1] } },"
            + " ] }", count = true)
       List<User> findOperators(ObjectId officeId,ObjectId  authoritieId);

       User findOneByIdNotAndUserName(String id, String username);

       User findOneByEmail(String email);

       List<User> findAllByEnabledTrueAndSendEmailRegisterFalse();

       List<User> findAllByEnabledTrueAndSendEmailRecoverFalse();

}

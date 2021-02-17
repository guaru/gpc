package com.gisnet.gpc.repository.repository;

import java.util.Optional;
import com.gisnet.gpc.domain.security.User;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * @author Alejandro Ventura
 * @since 13-02-2021
 */
public interface IUserRepository extends JpaRepository<User, Long>, IUserCustomRepository {

       public Optional<User> findByUserName(String username);

       public User findByUserNameAndEnabledTrue(String username);
       


}

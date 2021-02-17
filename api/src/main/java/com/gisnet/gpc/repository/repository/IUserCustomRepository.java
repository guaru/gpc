package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.security.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserCustomRepository {
    public abstract Page<User> findUsers(String userName,Long officeId, Pageable pageable); 
}

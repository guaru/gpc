package com.gisnet.gpc.service.impl;

import com.gisnet.gpc.domain.security.Authoritie;
import com.gisnet.gpc.repository.repository.IAuthoritieRepository;
import com.gisnet.gpc.service.IAuthoritieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthoritieService implements IAuthoritieService {

    @Autowired IAuthoritieRepository iAuthoritieRepository;

    @Override
    public Authoritie findOne(String id) {
       return this.iAuthoritieRepository.findById(id).orElse(null);
    }
    
}

package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.security.Authoritie;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IAuthoritieRepository extends IGenericRepository<Authoritie> , QuerydslPredicateExecutor<Authoritie> {
    
}

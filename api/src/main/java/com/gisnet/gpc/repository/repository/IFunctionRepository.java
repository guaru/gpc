package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.security.Function;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;


public interface IFunctionRepository extends  IGenericRepository<Function> , QuerydslPredicateExecutor<Function> {

}

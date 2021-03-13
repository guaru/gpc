package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.catalogs.Parameter;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IParameterRepository extends IGenericRepository<Parameter>, QuerydslPredicateExecutor<Parameter> {
    
}

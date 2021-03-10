package com.gisnet.gpc.repository.repository;


import com.gisnet.gpc.domain.catalogs.State;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IStateRepository extends MongoRepository<State, String>, QuerydslPredicateExecutor<State> {
    
}
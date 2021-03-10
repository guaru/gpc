package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.catalogs.Municipality;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IMunicipalityRepository extends MongoRepository<Municipality, String>, QuerydslPredicateExecutor<Municipality> {
    
}

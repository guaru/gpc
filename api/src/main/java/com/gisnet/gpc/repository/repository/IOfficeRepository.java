package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.catalogs.Office;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IOfficeRepository extends IGenericRepository<Office> , QuerydslPredicateExecutor<Office> {
    
}

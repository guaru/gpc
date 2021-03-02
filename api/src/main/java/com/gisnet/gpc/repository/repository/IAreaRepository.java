package com.gisnet.gpc.repository.repository;

import com.gisnet.gpc.domain.catalogs.Area;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IAreaRepository extends IGenericRepository<Area>, QuerydslPredicateExecutor<Area> {
    
}

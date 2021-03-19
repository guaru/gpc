package com.gisnet.gpc.repository.repository;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.Day;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface IDayRepository extends IGenericRepository<Day> , QuerydslPredicateExecutor<Day>  {
    List<Day> findByEnabledTrueOrderByNumberAsc();
}

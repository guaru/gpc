package com.gisnet.gpc.repository.repository;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.NonWorkingDay;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface INonWorkingDayRepository extends IGenericRepository<NonWorkingDay>, QuerydslPredicateExecutor<NonWorkingDay>  {
    List<NonWorkingDay> findByEnabledTrueOrderByMonthAsc();

    NonWorkingDay findOneByMonthAndDayAndIdNot(Short month, Short day, String id);
}

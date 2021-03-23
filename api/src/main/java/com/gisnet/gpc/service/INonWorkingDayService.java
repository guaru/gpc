package com.gisnet.gpc.service;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.NonWorkingDay;
import com.gisnet.gpc.dto.ResponseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface INonWorkingDayService {
    List<NonWorkingDay> getAll();

    Page<NonWorkingDay> findAll(Pageable pageable, Short filter);

    ResponseDTO exist(Short month, Short day, String id);
}

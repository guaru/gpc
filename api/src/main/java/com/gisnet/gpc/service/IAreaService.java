package com.gisnet.gpc.service;

import com.gisnet.gpc.domain.catalogs.Area;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAreaService {
    
    Page<Area> findAll(Pageable pageable, String filter);
}

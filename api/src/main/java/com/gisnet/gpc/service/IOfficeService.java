package com.gisnet.gpc.service;

import com.gisnet.gpc.domain.catalogs.Office;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IOfficeService {
    Page<Office> findAll(Pageable pageable, String filter);
    Office get(String id);
}

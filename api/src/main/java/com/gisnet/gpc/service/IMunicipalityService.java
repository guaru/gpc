package com.gisnet.gpc.service;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.Municipality;

public interface IMunicipalityService {
    List<Municipality> findAll();
    List<Municipality> findAllByState(String idState);
}

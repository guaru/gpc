package com.gisnet.gpc.service.impl;

import java.util.List;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Municipality;
import com.gisnet.gpc.domain.catalogs.QMunicipality;
import com.gisnet.gpc.repository.repository.IMunicipalityRepository;
import com.gisnet.gpc.service.IMunicipalityService;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MunicipalityService implements IMunicipalityService {

    @Autowired IMunicipalityRepository municipalityRepository;
    
    @Override
    public List<Municipality> findAll() {
        return municipalityRepository.findAll();
    }

    @Override
    public List<Municipality> findAllByState(String idState) {
        QMunicipality municipality =  new  QMunicipality(ConstantDomain.COLL_MUNICIPALITIES);
        BooleanBuilder where  = new BooleanBuilder();
        if(!Utils.isEmpty(idState))
           where.and(municipality.state.id.eq(idState));
        return (List<Municipality>) municipalityRepository.findAll(where.getValue());
    }
    
}

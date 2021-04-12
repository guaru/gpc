package com.gisnet.gpc.service.impl;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.domain.catalogs.QOffice;
import com.gisnet.gpc.exception.NotExistException;
import com.gisnet.gpc.repository.repository.IOfficeRepository;
import com.gisnet.gpc.service.IOfficeService;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OfficeService implements IOfficeService {

    @Autowired IOfficeRepository officeRepository;
    
    @Override
    public Page<Office> findAll(Pageable pageable, String filter) {
        QOffice office =  new  QOffice(ConstantDomain.COLL_OFFICES);
        BooleanBuilder where  = new BooleanBuilder();
        if(!Utils.isEmpty(filter))
           where.and(office.name.containsIgnoreCase(filter)).or(office.key.containsIgnoreCase(filter));
        return where.getValue()!=null ?  officeRepository.findAll(where.getValue(), pageable) :  officeRepository.findAll(pageable);
    }

    @Override
    public Office get(String id) throws NotExistException {
        return this.officeRepository.findById(id).orElseThrow(NotExistException::new);
    }
    
}

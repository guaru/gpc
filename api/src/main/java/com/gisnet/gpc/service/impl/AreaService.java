package com.gisnet.gpc.service.impl;

import com.gisnet.gpc.domain.catalogs.Area;
import com.gisnet.gpc.domain.catalogs.QArea;
import com.gisnet.gpc.repository.repository.IAreaRepository;
import com.gisnet.gpc.service.IAreaService;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gisnet.gpc.constants.ConstantDomain;

/**
 * @author Alejandro Ventura
 * @since 23-02-2021
 */
@Service
public class AreaService implements IAreaService {
    @Autowired IAreaRepository areaRepository;

    @Override
    public Page<Area> findAll(Pageable pageable, String filter) {
        QArea function = new QArea(ConstantDomain.COLL_FUNCTIONS);
        BooleanBuilder where = new BooleanBuilder();
        if (!Utils.isEmpty(filter))
            where.and(function.name.contains(filter)).or(function.key.contains(filter));

        return where.getValue() != null ? areaRepository.findAll(where.getValue(), pageable)
                : areaRepository.findAll(pageable);
    }
    
}

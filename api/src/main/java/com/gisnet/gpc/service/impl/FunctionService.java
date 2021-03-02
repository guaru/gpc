package com.gisnet.gpc.service.impl;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.security.Function;
import com.gisnet.gpc.domain.security.QFunction;
import com.gisnet.gpc.repository.repository.IFunctionRepository;
import com.gisnet.gpc.service.IFunctionService;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author Alejandro Ventura
 * @since 19-02-2021
 */
@Service
public class FunctionService implements IFunctionService {

    @Autowired IFunctionRepository functionRepository;

    public Page<Function> findAll(Pageable pageable, String filter) {
       QFunction function  = new QFunction(ConstantDomain.COLL_FUNCTIONS);
       BooleanBuilder where = new BooleanBuilder();
       if(!Utils.isEmpty(filter))
          where.and(function.name.contains(filter)).or(function.url.contains(filter));
        
        return  where.getValue()!=null ? 
         functionRepository.findAll(where.getValue(), pageable) : 
        functionRepository.findAll(pageable);
    }

    
}

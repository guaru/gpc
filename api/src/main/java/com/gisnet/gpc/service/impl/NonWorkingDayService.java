package com.gisnet.gpc.service.impl;

import java.util.List;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.NonWorkingDay;
import com.gisnet.gpc.domain.catalogs.QNonWorkingDay;
import com.gisnet.gpc.dto.ResponseDTO;
import com.gisnet.gpc.repository.repository.INonWorkingDayRepository;
import com.gisnet.gpc.service.INonWorkingDayService;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NonWorkingDayService implements INonWorkingDayService {
    
    @Autowired INonWorkingDayRepository nonWorkingDayRepository;
    
    @Override
    public List<NonWorkingDay> getAll() 
    {
       return nonWorkingDayRepository.findByEnabledTrueOrderByMonthAsc();
    }

    @Override
    public Page<NonWorkingDay> findAll(Pageable pageable, Short filter) {
        QNonWorkingDay function = new QNonWorkingDay(ConstantDomain.COLL_FUNCTIONS);
        BooleanBuilder where = new BooleanBuilder();
        if (!Utils.isEmpty(filter))
            where.and(function.month.eq(filter));

        return where.getValue() != null ? nonWorkingDayRepository.findAll(where.getValue(), pageable)
                : nonWorkingDayRepository.findAll(pageable);
    }

    @Override
    public ResponseDTO exist(Short month, Short day, String id) {
        
        ResponseDTO response = new ResponseDTO();

        NonWorkingDay result = this.nonWorkingDayRepository.findOneByMonthAndDayAndIdNot(month, day, id);
        
        if(result != null){
            response.setError(true);
            if(result.getEnabled() != null && result.getEnabled().booleanValue() == true){
                response.setMessage("El día inhábil ya se encuentra registrado y activo");
            }else{
                response.setMessage("El día inhábil ya se encuentra registrado, pero se encuentra inactivado");
            }
        }else{
            response.setError(false);
        }
        
        return response;
    }
    
}

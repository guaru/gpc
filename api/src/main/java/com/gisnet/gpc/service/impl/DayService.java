package com.gisnet.gpc.service.impl;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.Day;
import com.gisnet.gpc.repository.repository.IDayRepository;
import com.gisnet.gpc.service.IDayService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DayService implements IDayService {
    
    @Autowired IDayRepository dayRepository;
    
    @Override
    public List<Day> getAll() 
    {
       return dayRepository.findByEnabledTrueOrderByNumberAsc();
    }
    
}

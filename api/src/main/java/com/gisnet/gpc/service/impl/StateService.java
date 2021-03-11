package com.gisnet.gpc.service.impl;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.State;
import com.gisnet.gpc.repository.repository.IStateRepository;
import com.gisnet.gpc.service.IStateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateService implements IStateService {

    @Autowired IStateRepository stateRepository;
    
    @Override
    public List<State> findAll() {
        return stateRepository.findAll();
    }
}

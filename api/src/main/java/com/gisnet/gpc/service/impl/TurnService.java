package com.gisnet.gpc.service.impl;

import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.repository.repository.ITurnRepository;
import com.gisnet.gpc.service.IOfficeService;
import com.gisnet.gpc.service.ITurnService;
import com.gisnet.gpc.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * BUSSNESS LOGIC TURN
 * @author Alejandro Ventura
 * @since  17/03/2021
 */
@Service
public class TurnService implements ITurnService {

    @Autowired IUserService userService;
    @Autowired IOfficeService officeService;
    @Autowired ITurnRepository turnRepository;

    @Override
    public Turn create(Turn turn) {
        
        return null;
    }


}

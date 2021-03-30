package com.gisnet.gpc.api;

import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.service.ITurnService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class TurnadorController {

    @Autowired ITurnService turnService;
    
    @MessageMapping("/turn/{officeId}")
    @SendTo("/api/turnador/{officeId}")
    public Turn recibeMensaje(@DestinationVariable("officeId") String officeId,@Payload Turn turn){
        
        return turn;
        
    }
}

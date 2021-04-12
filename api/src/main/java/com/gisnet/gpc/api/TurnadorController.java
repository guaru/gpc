package com.gisnet.gpc.api;

import java.util.List;

import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.exception.TurnException;
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
    
    @MessageMapping("/turn/new/{officeId}")
    @SendTo("/api/turnador/pending/{officeId}")
    public Turn newTurn(@DestinationVariable("officeId") String officeId,@Payload Turn turn){
        return turn;
    }

    @MessageMapping("/turn/to-attention/{officeId}")
    @SendTo("/api/turnador/in-attention/{officeId}")
    public Turn toAttentionTurn(@DestinationVariable("officeId") String officeId, @Payload Turn turn) throws TurnException {
        return    this.turnService.toAttention(turn);
    }

    @MessageMapping("/turn/attended/{officeId}")
    @SendTo("/api/turnador/attended/{officeId}")
    public Turn attended(@DestinationVariable("officeId") String officeId, @Payload Turn turn)
            throws TurnException {
        return this.turnService.attended(turn);
    }


    @MessageMapping("/turn/get-inattention/{officeId}/{userId}")
    @SendTo("/api/turnador/in-attention/{officeId}/{userId}")
    public List<Turn> getInAttention(@DestinationVariable("officeId") String officeId, @DestinationVariable("officeId") String userId)
            throws TurnException {
        return turnService.getInAttention(officeId);
    }


    @MessageMapping("/turn/get-pending/{officeId}/{userId}")
    @SendTo("/api/turnador/in-pending/{officeId}/{userId}")
    public List<Turn> getPending(@DestinationVariable("officeId") String officeId,
            @DestinationVariable("officeId") String userId) throws TurnException {
        return turnService.getPending(officeId);
    }
}

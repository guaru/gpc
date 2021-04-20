package com.gisnet.gpc.api;

import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.dto.DetailListTurnDTO;
import com.gisnet.gpc.exception.TurnException;
import com.gisnet.gpc.service.ITurnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
public class TurnadorController {

    @Autowired ITurnService turnService;
    @Autowired
    private SimpMessagingTemplate webSocket;
    
    @MessageMapping("/turn/new/{officeId}")
    @SendTo("/api/turnador/pending/{officeId}")
    public Turn newTurn(@DestinationVariable("officeId") String officeId,@Payload Turn turn){
        return turn;
    }

    @MessageMapping("/turn/to-attention/{officeId}")
    
    @SendTo("/api/turnador/in-attention/{officeId}")
    public Turn toAttentionTurn(@DestinationVariable("officeId") String officeId, @Payload Turn turn) throws TurnException {
        String obj = "{" + "\"officeId\":\"" + officeId + "\"," + "\"areaId\": \"" + turn.getArea().getId()+ "\"}";
        webSocket.convertAndSend("/api/turnador/next", obj);
        return  this.turnService.toAttention(turn);
    }

    @MessageMapping("/turn/attended/{officeId}")
    @SendTo("/api/turnador/attended/{officeId}")
    public Turn attended(@DestinationVariable("officeId") String officeId, @Payload Turn turn)
            throws TurnException {
        return this.turnService.attended(turn);
    }


    @MessageMapping("/turn/get-inattention/{officeId}/{userId}")
    @SendTo("/api/turnador/in-attention/{officeId}/{userId}")
    public DetailListTurnDTO getInAttention(@DestinationVariable("officeId") String officeId, @DestinationVariable("userId") String userId)
            throws TurnException {
        return turnService.getInAttention(officeId);
    }


    @MessageMapping("/turn/get-pending/{officeId}/{userId}")
    @SendTo("/api/turnador/in-pending/{officeId}/{userId}")
    public DetailListTurnDTO getPending(@DestinationVariable("officeId") String officeId,
            @DestinationVariable("userId") String userId) throws TurnException {
        return turnService.getPending(officeId);
    }


   

}

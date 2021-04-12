package com.gisnet.gpc.service;

import java.util.List;

import com.gisnet.gpc.domain.operation.Sequence;
import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.exception.TurnException;

public interface ITurnService {
    
    Turn create(Turn turn);

    Sequence getSeq(Turn turn);

    List<Turn> getInAttention(String officeId);

    Turn toAttention(Turn turn) throws TurnException;

    List<Turn> getPending(String officeId);

    Turn attended(Turn turn) throws TurnException;

}

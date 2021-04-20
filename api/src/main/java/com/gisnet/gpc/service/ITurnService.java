package com.gisnet.gpc.service;
import com.gisnet.gpc.domain.operation.Sequence;
import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.dto.DetailDTO;
import com.gisnet.gpc.dto.DetailListTurnDTO;
import com.gisnet.gpc.exception.NotExistException;
import com.gisnet.gpc.exception.TurnException;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;

public interface ITurnService {
    
    Turn create(Turn turn);

    Sequence getSeq(Turn turn);

    DetailListTurnDTO getInAttention(String officeId);

    Turn toAttention(Turn turn) throws TurnException;

    DetailListTurnDTO getPending(String officeId);

    Turn attended(Turn turn) throws TurnException;

    Turn  get(ObjectId id) throws NotExistException;

    AggregationResults<DetailDTO> getDetailInAttention(ObjectId officeId);
    
    AggregationResults<DetailDTO> getDetailPending(ObjectId officeId);

}

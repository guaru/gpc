package com.gisnet.gpc.service.impl;

import java.util.Date;
import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.domain.operation.Sequence;
import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.dto.DetailDTO;
import com.gisnet.gpc.dto.DetailListTurnDTO;
import com.gisnet.gpc.exception.NotExistException;
import com.gisnet.gpc.exception.TurnException;
import com.gisnet.gpc.repository.repository.ITurnRepository;
import com.gisnet.gpc.service.IOfficeService;
import com.gisnet.gpc.service.ITurnService;
import com.gisnet.gpc.service.IUserService;
import com.gisnet.gpc.util.UtilDate;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

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
    @Autowired MongoOperations mongo;

    @Override
    public Turn create(Turn turn) {
        Office office  = new Office();
        office.setId(turn.getOffice().getId());
        office.setName(turn.getOffice().getName());
        office.setKey(turn.getOffice().getKey());
        turn.setOffice(office);
  
        turn.setKey(turn.getArea().getKey());
        turn.setDateCreate(UtilDate.getDate());
        turn.setCreateInstant(new Date());
        turn.setNumber(this.getSeq(turn).getSeq());
        turn.setSendSmsCreate(false);
        turn.setSendSmsNext(false);
        turn.setInAttention(false);
        turn.setAttended(false);
        turn.setInUse(false);
        return  turnRepository.save(turn);
    }

    @Override
    public Sequence getSeq(Turn turn) {
        Query query = new Query();
        query.addCriteria(Criteria.where(ConstantDomain.FIELD_OFFICE_ID).is(turn.getOffice().getId()))
        .addCriteria(Criteria.where(ConstantDomain.FIELD_AREA_ID).is(turn.getArea().getId()))
        .addCriteria(Criteria.where(ConstantDomain.FIELD_DATE).is(UtilDate.getDate()));
        Update update  = new Update();
        update.inc(ConstantDomain.FIELD_SEQUENCE,1);
        FindAndModifyOptions options =  new FindAndModifyOptions();
        options.upsert(true);
        options.returnNew(true);
        return mongo.findAndModify(query,update,options,Sequence.class);            
    }

    @Override
    public DetailListTurnDTO getInAttention(String officeId) throws TurnException {
        if(officeId.isEmpty() || officeId == null)
           throw new TurnException("Oficina no valida");
        DetailListTurnDTO result =  new DetailListTurnDTO();
        result.setTurns(this.turnRepository.findByInAttentionAndOfficeIdAndDateCreateOrderByNumberAsc(true,
                new ObjectId(officeId), UtilDate.getDate()));
        AggregationResults<DetailDTO> detail = this.getDetailInAttention(new ObjectId(officeId));;
        result.setDetail(detail!=null ?  detail.getMappedResults() : null);
       return result;
    }

    @Override
    public Turn toAttention(Turn turn) throws TurnException {
         Turn _turn =  this.turnRepository.findById(turn.getId()).orElse(null);
         if(_turn!=null){
             _turn.setInAttention(true);
            _turn =  this.turnRepository.save(_turn);
         }else{
            throw new TurnException("Turno no identificado");
         }
         return _turn;
    }

    @Override
    public DetailListTurnDTO getPending(String officeId) throws TurnException {
        if (officeId.isEmpty() || officeId == null)
            throw new TurnException("Oficina no valida");
        DetailListTurnDTO result = new DetailListTurnDTO();
        result.setTurns(this.turnRepository.findByInAttentionAndAttendedAndOfficeIdAndDateCreateOrderByNumberAsc(false, false,new ObjectId(officeId),UtilDate.getDate()));
        AggregationResults<DetailDTO> detail = this.getDetailPending(new ObjectId(officeId));
        result.setDetail(detail != null ? detail.getMappedResults() : null);
        return result;
    }


    @Override
    public Turn attended(Turn turn) throws TurnException {
        Turn _turn = this.turnRepository.findById(turn.getId()).orElse(null);
        if (_turn != null) {
            _turn.setInAttention(false);
            _turn.setAttended(true);
            _turn.setAttendedInstant(new Date());
            _turn = this.turnRepository.save(_turn);
        } else {
            throw new TurnException("Turno no identificado");
        }
        return _turn;
    }

    @Override
    public Turn get(ObjectId id) throws NotExistException {
        return this.turnRepository.findById(id.toString()).orElseThrow(NotExistException::new);
    }

    @Override
    public AggregationResults<DetailDTO> getDetailInAttention(ObjectId officeId) {
        return this.findGroupArea(officeId, true);
    }

    @Override
    public AggregationResults<DetailDTO> getDetailPending(ObjectId officeId) {
        return this.findGroupArea(officeId, false);
    }

    private  AggregationResults<DetailDTO>  findGroupArea(ObjectId officeId,boolean inAttention){
        GroupOperation groupByStateAndSumPop = group("area.name").count().as("total");
        MatchOperation filterStates = match(
                Criteria.where("office._id").is(officeId)
                        .and(ConstantDomain.FIELD_DATE_CREATE).is(UtilDate.getDate())
                        .and(ConstantDomain.FIELD_IN_ATTENTION).is(inAttention)
                        .and(ConstantDomain.FIELD_ATTENDED).is(false));
        ProjectionOperation projectToMatchModel = project().andExpression("_id").as("area").andExpression("total")
                .as("total");
        Aggregation aggregation = newAggregation(filterStates, groupByStateAndSumPop, projectToMatchModel);
        AggregationResults<DetailDTO> result = mongo.aggregate(aggregation, ConstantDomain.COLL_TURNS, DetailDTO.class);
        return result;
    }





}

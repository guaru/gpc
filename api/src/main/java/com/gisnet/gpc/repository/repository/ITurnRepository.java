package com.gisnet.gpc.repository.repository;
import java.util.List;

import com.gisnet.gpc.domain.operation.Turn;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ITurnRepository extends MongoRepository<Turn,String> {
    
    @Query(value = "{$and :[" + "?#{{ 'office._id' : [0] }},"
            + "?#{ { 'inAttention' : [1] } }," + " ] }", count = true)
    List<Turn> findInAttention(ObjectId officeId,Boolean inAttention);

    
    List<Turn> findByInAttentionAndOfficeIdAndDateCreateOrderByNumberAsc( Boolean inAttention, ObjectId officeId,String current);

    List<Turn> findByInAttentionAndAttendedAndOfficeIdAndDateCreateOrderByNumberAsc(Boolean inAttention,Boolean attended, ObjectId officeId,String current);

}

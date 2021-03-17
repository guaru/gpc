package com.gisnet.gpc.repository.repository;
import com.gisnet.gpc.domain.operation.Turn;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ITurnRepository extends MongoRepository<Turn,String> {
    
}

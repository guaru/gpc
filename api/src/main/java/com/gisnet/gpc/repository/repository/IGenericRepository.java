package com.gisnet.gpc.repository.repository;

import java.util.List;

import com.gisnet.gpc.domain.common.GenericEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IGenericRepository<T extends GenericEntity<T>> extends MongoRepository<T, String>  
{
     List<T> findByEnabledTrue();
}
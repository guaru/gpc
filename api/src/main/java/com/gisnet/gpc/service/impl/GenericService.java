package com.gisnet.gpc.service.impl;

import com.gisnet.gpc.domain.common.GenericEntity;
import com.gisnet.gpc.repository.repository.IGenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public abstract class GenericService<T extends GenericEntity<T>> {

    private final IGenericRepository<T> repository;

    public GenericService(IGenericRepository<T> repository) {
        this.repository = repository;
    }


    public Page<T> getPage(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<T> getAll() {
        return repository.findAll();
    }

    public T get(String id) {
        return repository.findById(id).orElse(null);
    }

    
    public T update(T updated) {
        T dbDomain = get(updated.getId());
        dbDomain.update(updated);

        return repository.save(dbDomain);
    }

    
    public T create(T newDomain) {
        T dbDomain = newDomain.createNewInstance();
        return repository.save(dbDomain);
    }


    
    public boolean enabled(String id,boolean enabled){
        T dbDomain = get(id);
        dbDomain.enabled(enabled);
        repository.save(dbDomain);
        return true;
    }

    
    public void delete(String id) {
        // check if object with this id exists
        get(id);
        repository.deleteById(id);
    }
}

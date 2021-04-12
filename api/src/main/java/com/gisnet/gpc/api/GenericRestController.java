package com.gisnet.gpc.api;

import javax.validation.Valid;
import com.gisnet.gpc.domain.common.GenericEntity;
import com.gisnet.gpc.dto.EnabledDTO;
import com.gisnet.gpc.repository.repository.IGenericRepository;
import com.gisnet.gpc.service.impl.GenericService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

public abstract class GenericRestController<T extends GenericEntity<T>> extends ExceptionRestController{

    private final GenericService<T> service;

    public GenericRestController(IGenericRepository<T> repository) {
        this.service = new GenericService<T>(repository) {
        };
    }


    @GetMapping("/all")
    public ResponseEntity<List<T>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getOne(@PathVariable String id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PutMapping("")
    public ResponseEntity<T> update(@Valid @RequestBody T updated) {
        return ResponseEntity.ok(service.update(updated));
    }

    @PutMapping("/enabled")
    public ResponseEntity<?> enabled(@Valid @RequestBody EnabledDTO enabled) {
        return ResponseEntity.ok(service.enabled(enabled.getId(),enabled.isEnabled()));
    }

    @PostMapping("")
    public ResponseEntity<T> create(@Valid @RequestBody T created) {
        return ResponseEntity.ok(service.create(created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok(true);
    }

}

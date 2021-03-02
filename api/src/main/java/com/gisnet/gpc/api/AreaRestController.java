package com.gisnet.gpc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gisnet.gpc.constants.ConstantEnum;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.domain.catalogs.Area;
import com.gisnet.gpc.repository.repository.IGenericRepository;
import com.gisnet.gpc.service.IAreaService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(value = ConstantWebApi.AREAS_URI)
@Secured(ConstantEnum.Authoritie.Code.ROLE_ADMIN)
public class AreaRestController extends GenericRestController<Area> {

    @Autowired IAreaService areaService;
    public AreaRestController(IGenericRepository<Area> repository) {
        super(repository);
        // TODO Auto-generated constructor stub
    }


    @GetMapping
    public ResponseEntity<?> index(Pageable pageable, String filter) {
        return new ResponseEntity<>(areaService.findAll(pageable, filter),HttpStatus.OK);
    }
    
    
}

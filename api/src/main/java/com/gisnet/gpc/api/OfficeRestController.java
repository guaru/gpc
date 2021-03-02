package com.gisnet.gpc.api;

import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.repository.repository.IGenericRepository;
import com.gisnet.gpc.service.IOfficeService;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.constants.ConstantEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = ConstantWebApi.OFFICES_URI)
@Secured(ConstantEnum.Authoritie.Code.ROLE_ADMIN)
public class OfficeRestController extends GenericRestController<Office> {

    @Autowired IOfficeService officeService;

    public OfficeRestController(IGenericRepository<Office> repository) {
        super(repository);
    }

    @GetMapping
    public ResponseEntity<?> index(Pageable pageable, String filter) {
        return new ResponseEntity<>(officeService.findAll(pageable, filter), HttpStatus.OK);
    }
    
}

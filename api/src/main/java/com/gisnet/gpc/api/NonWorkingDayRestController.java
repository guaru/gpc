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
import com.gisnet.gpc.domain.catalogs.NonWorkingDay;
import com.gisnet.gpc.dto.ResponseDTO;
import com.gisnet.gpc.repository.repository.IGenericRepository;
import com.gisnet.gpc.service.IAreaService;
import com.gisnet.gpc.service.INonWorkingDayService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping(value = ConstantWebApi.NON_WORKING_DAY_URI)
@Secured(ConstantEnum.Authoritie.Code.ROLE_ADMIN)
public class NonWorkingDayRestController extends GenericRestController<NonWorkingDay> {

    @Autowired INonWorkingDayService nonWorkingDayService;
    public NonWorkingDayRestController(IGenericRepository<NonWorkingDay> repository) {
        super(repository);
    }

    @GetMapping
    public ResponseEntity<?> index(Pageable pageable, Short filter) {
        return new ResponseEntity<>(nonWorkingDayService.findAll(pageable, filter),HttpStatus.OK);
    }
    
    @GetMapping("exist/{month}/{day}/{id}")
    public ResponseEntity<?> exist(@PathVariable Short month, @PathVariable Short day, @PathVariable String id){
        return new ResponseEntity<>(this.nonWorkingDayService.exist(month, day, id), HttpStatus.OK);
    }
}

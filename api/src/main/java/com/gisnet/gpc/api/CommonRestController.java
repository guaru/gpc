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
import com.gisnet.gpc.service.IMunicipalityService;
import com.gisnet.gpc.service.IStateService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(value = ConstantWebApi.COMMON_URI)
@Secured({ConstantEnum.Authoritie.Code.ROLE_ADMIN,ConstantEnum.Authoritie.Code.ROLE_GESTOR})
public class CommonRestController {

    @Autowired IStateService stateService;
    @Autowired IMunicipalityService municipalityService;


    @GetMapping(value = "/getStates")
    public ResponseEntity<?> getStates() {
        return new ResponseEntity<>(stateService.findAll(),HttpStatus.OK);
    }

    @GetMapping(value = "/getMunicipalities")
    public ResponseEntity<?> getMunicipalities(String idState) {
        return new ResponseEntity<>(municipalityService.findAllByState(idState),HttpStatus.OK);
    }
    
}

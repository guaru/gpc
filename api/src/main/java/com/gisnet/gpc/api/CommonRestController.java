package com.gisnet.gpc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gisnet.gpc.constants.ConstantEnum;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.service.IDayService;
import com.gisnet.gpc.service.IMunicipalityService;
import com.gisnet.gpc.service.IStateService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(value = ConstantWebApi.COMMON_URI)
@Secured({ConstantEnum.Authoritie.Code.ROLE_ADMIN,ConstantEnum.Authoritie.Code.ROLE_ADMIN_OFFICE})
public class CommonRestController {

    @Autowired IStateService stateService;
    @Autowired IMunicipalityService municipalityService;
    @Autowired IDayService dayService;


    @GetMapping(value = "/getStates")
    public ResponseEntity<?> getStates() {
        return new ResponseEntity<>(stateService.findAll(),HttpStatus.OK);
    }

    @GetMapping(value = "/getMunicipalities")
    public ResponseEntity<?> getMunicipalities(String idState) {
        return new ResponseEntity<>(municipalityService.findAllByState(idState),HttpStatus.OK);
    }

    @GetMapping(value = "/getDays")
    public ResponseEntity<?> getDays() {
        return new ResponseEntity<>(dayService.getAll(), HttpStatus.OK);
    }
    
}

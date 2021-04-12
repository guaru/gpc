package com.gisnet.gpc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gisnet.gpc.constants.ConstantEnum;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.exception.NotExistException;
import com.gisnet.gpc.service.IDayService;
import com.gisnet.gpc.service.IMunicipalityService;
import com.gisnet.gpc.service.IOfficeService;
import com.gisnet.gpc.service.IStateService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping(value = ConstantWebApi.COMMON_URI)
@Secured({ConstantEnum.Authoritie.Code.ROLE_ADMIN,
    ConstantEnum.Authoritie.Code.ROLE_ADMIN_OFFICE,
    ConstantEnum.Authoritie.Code.ROL_OPERATOR})
public class CommonRestController extends ExceptionRestController {

    @Autowired IStateService stateService;
    @Autowired IMunicipalityService municipalityService;
    @Autowired IDayService dayService;
    @Autowired IOfficeService officeService;


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

    @GetMapping(value = "/getOffice/{id}")
    public ResponseEntity<?> getOffice(@PathVariable("id") String id) throws NotExistException  {
        return new ResponseEntity<>(officeService.get(id), HttpStatus.OK);
    }
    
}

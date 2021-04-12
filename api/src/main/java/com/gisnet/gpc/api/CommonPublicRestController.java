package com.gisnet.gpc.api;

import com.gisnet.gpc.service.impl.OfficeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.exception.NotExistException;

@RestController
@RequestMapping(value = ConstantWebApi.COMMON_PUBLIC_URI)
public class CommonPublicRestController extends ExceptionRestController {

    @Autowired 
    OfficeService officeService;

    @GetMapping(value = "/getOffice/{id}")
    public ResponseEntity<?> getOffice(@PathVariable("id") String id) throws NotExistException {
        return new ResponseEntity<>(officeService.get(id), HttpStatus.OK);
    }
}

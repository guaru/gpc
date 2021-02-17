package com.gisnet.gpc.api;

import java.util.List;
import java.util.Set;

import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.domain.security.Function;
import com.gisnet.gpc.dto.FunctionDTO;
import com.gisnet.gpc.service.IUserService;
import com.gisnet.gpc.util.SecurityUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value =  ConstantWebApi.ACCOUNT_URI)
public class AccountRestController {
    @Autowired IUserService iuserService;

    @GetMapping()
    public ResponseEntity<List<FunctionDTO>> index(){
        return new ResponseEntity<>(iuserService.getFunctions(SecurityUtils.getCurrentUserLogin()),HttpStatus.OK);
    }
}

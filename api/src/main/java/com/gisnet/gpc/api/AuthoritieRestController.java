package com.gisnet.gpc.api;

import com.gisnet.gpc.domain.security.Authoritie;
import com.gisnet.gpc.repository.repository.IGenericRepository;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gisnet.gpc.constants.ConstantEnum;
import com.gisnet.gpc.constants.ConstantWebApi;

@RestController
@RequestMapping(value = ConstantWebApi.AUTHORITIES_URI)
@Secured(ConstantEnum.Authoritie.Code.ROLE_ADMIN)
public class AuthoritieRestController extends GenericRestController<Authoritie> {

    public AuthoritieRestController(IGenericRepository<Authoritie> repository) {
        super(repository);
    }
    
}

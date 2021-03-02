package com.gisnet.gpc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.constants.ConstantEnum;
import com.gisnet.gpc.domain.security.Function;
import com.gisnet.gpc.repository.repository.IGenericRepository;
import com.gisnet.gpc.service.IFunctionService;




@RestController
@RequestMapping(value = ConstantWebApi.FUNCTIONS_URI)
@Secured(ConstantEnum.Authoritie.Code.ROLE_ADMIN)
public class FunctionRestController extends GenericRestController<Function> {

  public FunctionRestController(IGenericRepository<Function> repository) {
    super(repository);
    
  }

  @Autowired
  IFunctionService functionService;

    @GetMapping
    public ResponseEntity<?> index(Pageable pageable,String filter){
      return new ResponseEntity<>(functionService.findAll(pageable, filter),HttpStatus.OK);
    }

  

 

}

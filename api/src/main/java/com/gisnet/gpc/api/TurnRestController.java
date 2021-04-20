package com.gisnet.gpc.api;

import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.domain.operation.Turn;
import com.gisnet.gpc.exception.NotExistException;
import com.gisnet.gpc.service.ITurnService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping(value = ConstantWebApi.TURN_URI)
public class TurnRestController extends ExceptionRestController {
    
    @Autowired  ITurnService ITurnService;

    @PostMapping
    public ResponseEntity<Turn> create(@RequestBody Turn  turn)
    {
         return new ResponseEntity<Turn>(ITurnService.create(turn),HttpStatus.OK);
    }


    @GetMapping(value=ConstantWebApi.ID_URI)
    public ResponseEntity<Turn> get(@PathVariable("id")  ObjectId id ) throws NotExistException {
        return new ResponseEntity<Turn>(ITurnService.get(id), HttpStatus.OK);
    }
  

}

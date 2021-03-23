package com.gisnet.gpc.api;

import java.util.Calendar;
import java.util.List;

import javax.validation.Valid;

import com.gisnet.gpc.constants.ConstantWebApi;
import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.FunctionDTO;
import com.gisnet.gpc.dto.ResponseConfirmationDTO;
import com.gisnet.gpc.dto.ConfirmationDTO;
import com.gisnet.gpc.service.IUserService;
import com.gisnet.gpc.util.SecurityUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PutMapping("validateConfirmation")
    public ResponseEntity<?> validateConfirmation(@Valid @RequestBody ConfirmationDTO confirmation) {
        User u = iuserService.findByUserName(confirmation.getUsername());
        ResponseConfirmationDTO response = new ResponseConfirmationDTO();
        if(u != null){
            if(u.getPassword().equals(confirmation.getPassword())){
                Calendar now = Calendar.getInstance();
                Calendar expiration = Calendar.getInstance();
                expiration.setTime(u.getExpirationConfirmation());

                if(u.getConfirmed()){
                    response.setMessage("La cuenta ya se encuentra confirmada");
                    response.setSuccess(false);
                    return new ResponseEntity<>(response,HttpStatus.OK);
                }

                if(now.compareTo(expiration) > 0){
                    response.setMessage("La confirmacion esta expirada");
                    response.setSuccess(false);
                    return new ResponseEntity<>(response,HttpStatus.OK);
                }
                
                response.setUser(u);
                response.setMessage("Confirmacion valida");
                response.setSuccess(true);
                return new ResponseEntity<>(response,HttpStatus.OK);
            }
            
        }
        response.setMessage("La confirmación no es valida");
        response.setSuccess(false);
        return new ResponseEntity<>(response,HttpStatus.OK);
        
        
    }

    @PutMapping("confirmation")
    public ResponseEntity<?> confirmation(@Valid @RequestBody ConfirmationDTO user){
        return new ResponseEntity<>(iuserService.confirmationUser(user), HttpStatus.OK);
    }

}

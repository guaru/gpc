package com.gisnet.gpc.domain.common;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {
    
    @NotEmpty
    private String name;

    private String lastName;

    @Email
    @NotEmpty
    private String email;

    private String phone;

    private Boolean enabled;

}

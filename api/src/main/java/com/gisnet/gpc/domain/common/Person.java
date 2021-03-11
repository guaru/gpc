package com.gisnet.gpc.domain.common;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.springframework.data.mongodb.core.index.TextIndexed;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {
    
    @NotEmpty
    @TextIndexed
    private String name;

    @TextIndexed
    private String lastName;

    @Email
    @NotEmpty
    @TextIndexed
    private String email;

    private String phone;

    private Boolean enabled;

}

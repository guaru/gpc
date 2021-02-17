package com.gisnet.gpc.domain.common;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.gisnet.gpc.constants.ConstantDomain;


import lombok.Getter;
import lombok.Setter;


@MappedSuperclass
@Getter
@Setter
public class Person {
    
    @NotEmpty
    @Column(name = ConstantDomain.COL_NAME, length = ConstantDomain.LEN_150, nullable = false)
    private String name;

    @Column(name = ConstantDomain.COL_LASTNAME, length = ConstantDomain.LEN_150)
    private String lastName;

    @Email
    @Column(name = ConstantDomain.COL_EMAIL, length = ConstantDomain.LEN_150)
    private String email;

    @Column(name = ConstantDomain.COL_ENABLED)
    private Boolean enabled;

}

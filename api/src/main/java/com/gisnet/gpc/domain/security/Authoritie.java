package com.gisnet.gpc.domain.security;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.gisnet.gpc.constants.ConstantDomain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = ConstantDomain.TBL_AUTHORITIES, schema = ConstantDomain.SCHEME_SECURITY)
@Data
@NoArgsConstructor
public class Authoritie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ConstantDomain.COL_ID)
    public Long id;

    @NotEmpty
    @Column(name = ConstantDomain.COL_NAME, length = ConstantDomain.LEN_100, unique = true, nullable = false)
    private String name;

    @Column(name = ConstantDomain.COL_ENABLED)
    private Boolean enabled;

    /**
    *
    */
    private static final long serialVersionUID = 1838967106789288412L;

}

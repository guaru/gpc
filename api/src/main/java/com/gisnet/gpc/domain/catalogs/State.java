package com.gisnet.gpc.domain.catalogs;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gisnet.gpc.constants.ConstantDomain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <h1>State</h1>
 * <p>
 * Entity for states
 * </p>
 * 
 * @author Alejandro Ventura
 * @since 29-01-2021
 */
@Entity
@Table(name = ConstantDomain.TBL_STATES)
@Data
@NoArgsConstructor
public class State implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ConstantDomain.COL_ID)
    private Integer id;

    @Column(name = ConstantDomain.COL_NAME, length = ConstantDomain.LEN_100, unique = true, nullable = false)
    private String name;

    @Column(name = ConstantDomain.COL_NUMBER_ESTATE, length = ConstantDomain.LEN_20, unique = true)
    private String numberState;

    @Column(name = ConstantDomain.COL_ENABLED)
    private Boolean enabled;

    /**
     *
     */
    private static final long serialVersionUID = -2526567401617497568L;

}

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
 * ENTITTY OFFICE
 * 
 * @author Alejandro Ventura
 * @since 29-01-2021
 */

@Entity
@Table(name = ConstantDomain.TBL_OFFICES, schema = ConstantDomain.SCHEME_CATALOGS)
@Data
@NoArgsConstructor
public class Office implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ConstantDomain.COL_ID)
    private Long id;

    @Column(name = ConstantDomain.COL_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = ConstantDomain.COL_KEY,unique = true, nullable = false)
    private String key;

    @Column(name = ConstantDomain.COL_ADDRESS, length = ConstantDomain.LEN_350)
    private String address;

    @Column(name = ConstantDomain.COL_ENABLED)
    private Boolean enabled;

    /**
     *
     */
    private static final long serialVersionUID = 1L;

}

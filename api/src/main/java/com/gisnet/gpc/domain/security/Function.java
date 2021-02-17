package com.gisnet.gpc.domain.security;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gisnet.gpc.constants.ConstantDomain;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import ch.qos.logback.core.subst.Token.Type;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity function
 * 
 * @author Alejandro Ventura
 * @since 27-01-2021
 */
@Entity
@Table(name = ConstantDomain.TBL_FUNCTIONS, schema = ConstantDomain.SCHEME_SECURITY)
@Data
@NoArgsConstructor
public class Function implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ConstantDomain.COL_ID)
    private Integer id;

    @NotNull
    @Column(name = ConstantDomain.COL_NAME, length = ConstantDomain.LEN_150)
    private String name;

    @Column(name = ConstantDomain.COL_URL, length = ConstantDomain.LEN_250)
    private String url;

    @Column(name = ConstantDomain.COL_ICON, length = ConstantDomain.LEN_50)
    private String icon;

    @Column(name = ConstantDomain.COL_ENABLED)
    private Boolean enabled;

    
    @ManyToOne
    @JoinColumn(name= ConstantDomain.COL_FUNCTION_FATHER_ID,referencedColumnName = ConstantDomain.COL_ID)
    private Function functionFather;

    /**
     * SERIAL ID
     */
    private static final long serialVersionUID = 4468802821146093638L;

}
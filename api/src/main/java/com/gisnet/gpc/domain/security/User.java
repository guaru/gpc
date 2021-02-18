package com.gisnet.gpc.domain.security;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.domain.common.Person;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = ConstantDomain.TBL_USERS, schema = ConstantDomain.SCHEME_SECURITY)
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class User extends Person implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = ConstantDomain.COL_ID)
    private Long id;

    @NotEmpty
    @Column(name = ConstantDomain.COL_USERNAME, length = ConstantDomain.LEN_150, unique = true, nullable = false)
    private String userName;

    @NotEmpty
    @Column(name = ConstantDomain.COL_PASSWORD, length = ConstantDomain.LEN_350, nullable = false)
    private String password;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = ConstantDomain.TBL_USERS_AUTHORITIES, schema = ConstantDomain.SCHEME_SECURITY, joinColumns = @JoinColumn(name = ConstantDomain.COL_USER_ID), inverseJoinColumns = @JoinColumn(name = ConstantDomain.COL_AUTHORITIE_ID), uniqueConstraints = {
            @UniqueConstraint(columnNames = { ConstantDomain.COL_USER_ID, ConstantDomain.COL_AUTHORITIE_ID }) })
    private Set<Authoritie> authorities;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = ConstantDomain.TBL_USER_FUNCTIONS, schema = ConstantDomain.SCHEME_SECURITY, joinColumns = @JoinColumn(name = ConstantDomain.COL_USER_ID), inverseJoinColumns = @JoinColumn(name = ConstantDomain.COL_FUNCTION_ID), uniqueConstraints = {
            @UniqueConstraint(columnNames = { ConstantDomain.COL_USER_ID, ConstantDomain.COL_FUNCTION_ID }) })
    private Set<Function> functions;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = ConstantDomain.COL_OFFICE_ID, referencedColumnName = ConstantDomain.COL_ID)
    private Office office;

    /**
     *
     */
    private static final long serialVersionUID = 4706523753809364203L;
}

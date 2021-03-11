package com.gisnet.gpc.domain.security;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.domain.common.GenericEntity;
import com.gisnet.gpc.domain.common.Person;
import com.querydsl.core.annotations.QueryEntity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@QueryEntity
@Document(collection  = ConstantDomain.COLL_USERS)
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class User extends Person implements Serializable, GenericEntity<User> {

    @Id
    private String id;

    @NotEmpty(message = "Nombre de usuario requerido")
    @Field(name   = ConstantDomain.FIELD_USERNAME)
    private String userName;

    
    @Field(name   = ConstantDomain.FIELD_PASSWORD)
    @JsonIgnore
    private String password;

    @DBRef
    private List<Authoritie> authorities;

    @DBRef(lazy = true)
    @JsonIgnore
    private List<Function> functions;

    @DBRef
    private Office office;

    /**
     *
     */
    private static final long serialVersionUID = 4706523753809364203L;

    @Override
    public void update(User source) {
        this.setUserName(getUserName());
        this.setName(source.getName());
        this.setEnabled(source.getEnabled());
        this.setFunctions(source.getFunctions());
        this.setAuthorities(source.getAuthorities());
        this.setLastName(source.getLastName());
        this.setEmail(source.getEmail());
        this.setPhone(source.getPhone());
        this.setOffice(source.getOffice());
    }

    @Override
    public User createNewInstance() {
        User newUser = new User();
        newUser.update(this);
        return newUser;
    }

    @Override
    public void enabled(boolean enabled) {
        this.setEnabled(enabled);
    }
}

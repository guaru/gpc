package com.gisnet.gpc.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gisnet.gpc.domain.security.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * <h3></h3>
 * <p>
 * Class user login info athorization
 * </p>
 * 
 * @author Alejandro Ventura
 * @since 28-01-2021
 */
public class UserPrinciple implements UserDetails {

    private String id;
    private String name;
    private String username;
    private String lastname;
    private String email;
    private Boolean enable;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(String id, String username, String name, String lastname, String password, String email,
            Boolean enable, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.enable = enable;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }

    public static UserPrinciple build(User user) {
        List<GrantedAuthority> authorities = user.getAuthorities().stream()
                .map(auth -> new SimpleGrantedAuthority(auth.getName())).collect(Collectors.toList());

        return new UserPrinciple(user.getId(), user.getUserName(), user.getName(), user.getLastName(),
                user.getPassword(), user.getEmail(), user.getEnabled(), authorities);
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String lastName() {
        return lastname;
    }

    public String email() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
    }

    /**
     *
     */
    private static final long serialVersionUID = -5683182789798504933L;

}

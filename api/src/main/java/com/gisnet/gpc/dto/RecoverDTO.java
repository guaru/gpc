package com.gisnet.gpc.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class RecoverDTO {
    @NotEmpty
    @NotNull
    private String email;

    /**
     * @return String return the email
     */
    public String getEamil() {
        return email;
    }

    /**
     * @param username the username to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

}

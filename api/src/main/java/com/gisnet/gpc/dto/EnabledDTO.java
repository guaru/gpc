package com.gisnet.gpc.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnabledDTO {
    
    @NotNull
    private boolean enabled;
    @NotEmpty
    @NotNull
    private String id;
}

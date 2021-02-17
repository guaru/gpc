package com.gisnet.gpc.dto;

import java.util.List;

import com.gisnet.gpc.domain.security.Function;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class FunctionDTO {
    
    public Function function;
    public List<Function> childs;
}

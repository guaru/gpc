package com.gisnet.gpc.dto;

import java.util.List;

import com.gisnet.gpc.domain.operation.Turn;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DetailTurnDTO {
    private Turn turn;
    private  List<DetailDTO> detail;
}

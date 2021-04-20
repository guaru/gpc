package com.gisnet.gpc.dto;

import java.util.List;

import com.gisnet.gpc.domain.operation.Turn;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DetailListTurnDTO {
    private List<Turn> turns;
    private List<DetailDTO> detail;
}

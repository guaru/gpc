package com.gisnet.gpc.service;

import java.util.List;

import com.gisnet.gpc.domain.catalogs.State;

public interface IStateService {
    List<State> findAll();
}

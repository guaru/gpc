package com.gisnet.gpc.service;

import com.gisnet.gpc.domain.security.Authoritie;

public interface IAuthoritieService {
    Authoritie  findOne(String id);
}

/*
 * Copyright (C) 2020 by Gisnet. All rights reserved. Gisnet claims copyright in this computer
 * program as an unpublished work, one or more versions of which were first used to provide services
 * to customers on the dates indicated in the foregoing notice. Claim od copyright does not imply
 * waiver of other rights.
 *
 * NOTICE OF PROPRIETARY RIGHTS
 * 
 * This program is a confidential trade secret and the property of Gisnet. Use, examination,
 * reproduction, disassembly, decompiling, transfer and/or disclosure to others of all or any part
 * of this software program are strictly prohibited except by express written agreement with Gisnet.
 */
package com.gisnet.gpc.service;

import com.gisnet.gpc.domain.security.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * <h1>FunctionService</h1>
 * <p>
 * This is the interface for funcitons
 * </p>
 * 
 * @author Alejandro Ventura
 * @since 26-01-2021
 */

public interface IFunctionService   {
 
    Page<Function> findAll(Pageable pageable, String filter);
}

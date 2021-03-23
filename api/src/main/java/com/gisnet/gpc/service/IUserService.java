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

import java.util.List;
import java.util.Optional;

import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.ConfirmationDTO;
import com.gisnet.gpc.dto.FunctionDTO;
import com.gisnet.gpc.dto.ResponseDTO;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Interface for user operations
 * @author Alejandro Ventura
 * @since 28-01-2021
 */
public interface IUserService {

     /**
      * GET ALL USERS
      * 
      * @return List<User>
      */
     Page<User> findAllUsers(Pageable pageable,String userName,Long officeId);

     /**
      * GET USER BY USERNAME
      * 
      * @param username
      * @return User
      */
     User findByUserName(String username);

     /**
      *  GET USER BY ID
      * @param idUser
      * @return Optional User
      */
     Optional<User> findById(String idUser);


     /**
      * GET FUNCTIONS FOR USERS
      * @param username
      * @return List<Function>
      */
     List<FunctionDTO> getFunctions(String username);


     User create(User user);

     User update(User source);

     boolean delete(String id);

     boolean enabled(String id, boolean enabled);

     void sendMailRegister(User user);

     List<User> getOperators(ObjectId officeId);

     User confirmationUser(ConfirmationDTO source);

     ResponseDTO exist(String id, String username);

     void sendEmailsWithoutSend();
}

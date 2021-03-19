package com.gisnet.gpc.service;

import java.io.IOException;

import javax.mail.MessagingException;

import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.MailDTO;

public interface IMailService {
    

    public void sendMail(MailDTO mail,User user) throws MessagingException, IOException;

}

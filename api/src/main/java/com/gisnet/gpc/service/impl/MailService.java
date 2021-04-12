package com.gisnet.gpc.service.impl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.dto.MailDTO;
import com.gisnet.gpc.service.IMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
public class MailService implements IMailService {
    
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Override
    public void sendMail(MailDTO mail,User user) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

      //  helper.addAttachment("template-cover.png", new ClassPathResource("javabydeveloper-email.PNG"));
        Context context = new Context();
        context.setVariables(mail.getProps());
       // String html = templateEngine.process("register", context);
        helper.setTo(mail.getMailTo());
        //helper.setText(html, true);
        helper.setText("http://localhost:4200/confirmation/"+user.getUserName()+"/"+user.getPassword(), true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());

        emailSender.send(message);
    }
    
}

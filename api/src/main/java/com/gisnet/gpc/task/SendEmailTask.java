package com.gisnet.gpc.task;

import java.text.SimpleDateFormat;
import com.gisnet.gpc.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SendEmailTask {

	private static final Logger log = LoggerFactory.getLogger(SendEmailTask.class);

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Autowired
    IUserService userService;

	@Scheduled(fixedRate = (1000*60*60))
	public void reportCurrentTime() {

        userService.sendEmailsWithoutSend();
	}
}

package com.gisnet.gpc.dto;

import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MailDTO {
    private String from;
    private String mailTo;
    private String subject;
    private List<Object> attachments;
    private Map<String, Object> props;
    private String template;
}

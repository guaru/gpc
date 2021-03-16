package com.gisnet.gpc.util;

import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ObjectUtils;

/**
 * <h1>Utils</h1>
 * <p>
 * General commons util function
 * </p>
 * 
 * @author Alejandro Ventura
 * @since 29-01-2021
 */
public class Utils {

    public static String getStringFromReourceFile(String file) {
        Resource resource = new ClassPathResource(file);
        String result = null;
        try {
            result = FileUtils.readFileToString(resource.getFile(), "UTF-8");
        } catch (final IOException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public static boolean isEmpty(Object obj){
           return ObjectUtils.isEmpty(obj);
    }

    public static boolean isEmpty(List<Object> list)
    {
            return list==null ||  ObjectUtils.isEmpty(list);
    }

}

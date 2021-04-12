package com.gisnet.gpc.util;
import java.time.LocalDate;



public class UtilDate {
 
    public static String getDate(){
        return LocalDate.now().toString();
    }

    public static Integer getDay(){
        return LocalDate.now().getDayOfMonth();
    }

    public static Integer getMonth() {
        return LocalDate.now().getMonthValue();
    }

    public static Integer getYear(){
        return LocalDate.now().getYear();
    }
  

}

package com.gisnet.gpc.constants;

import org.springframework.security.core.GrantedAuthority;

public class ConstantEnum {
  
    public enum Authoritie implements GrantedAuthority {

        ROLE_ADMIN(Code.ROLE_ADMIN), ROLE_ADMIN_OFFICE(Code.ROLE_ADMIN_OFFICE);

        private final String authority;

        Authoritie(String authority) {
            this.authority = authority;
        }

        @Override
        public String getAuthority() {
            return authority;
        }

        public class Code {
            public static final String ROLE_ADMIN = "ROLE_ADMIN";
            public static final String ROLE_ADMIN_OFFICE = "ROLE_ADMIN_OFFICE";
        }
    }
    

}

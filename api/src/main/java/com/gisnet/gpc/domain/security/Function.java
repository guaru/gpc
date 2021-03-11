package com.gisnet.gpc.domain.security;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.common.GenericEntity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity function
 * 
 * @author Alejandro Ventura
 * @since 27-01-2021
 */

@Document(collection =  ConstantDomain.COLL_FUNCTIONS)
@Data
@NoArgsConstructor
public class Function  implements Serializable,  GenericEntity<Function>{

    @Id
    private String id;

    @NotEmpty(message = "Name required")
    @Field(value   = ConstantDomain.FIELD_NAME)
    private String name;
    @Field(value   = ConstantDomain.FIELD_URL)
    private String url;
    @Field(value =  ConstantDomain.FIELD_ICON)
    private String icon;
    @Field(value  = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;

    @DBRef
    private Function functionFather;

    public Function(String id){
        this.id =  id;
    }

    /**
     * SERIAL ID
     */
    private static final long serialVersionUID = 4468802821146093638L;

    @Override
    public void update(Function source) {
      this.name =  source.getName();
      this.icon =  source.getIcon();
      this.enabled =  source.getEnabled();
      this.functionFather =  source.getFunctionFather();
      this.url =  source.getUrl();
    }

    @Override
    public Function createNewInstance() {
        Function  newInstance = new Function();
        newInstance.update(this);
        return newInstance;
    }

    @Override
    public void enabled(boolean enabled) {
      this.setEnabled(enabled);
    }

  

}
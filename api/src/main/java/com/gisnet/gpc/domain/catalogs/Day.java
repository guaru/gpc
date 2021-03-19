package com.gisnet.gpc.domain.catalogs;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.common.GenericEntity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = ConstantDomain.COLL_DAY)
@Data
@NoArgsConstructor
public class Day implements GenericEntity<Day> {
    
    @Id
    private String id;
    @Field(value = ConstantDomain.FIELD_NAME)
    private String name;
    @Field(value = ConstantDomain.FIELD_NUMBER)
    private Short number;
    @Field(value = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;
    
    @Override
    public void update(Day source) {
       this.setName(source.getName());
       this.setNumber(source.getNumber());
       this.setEnabled(source.getEnabled());   
    }

    @Override
    public void enabled(boolean enabled) {
        this.setEnabled(enabled);
        
    }


    @Override
    public Day createNewInstance() {
       Day day =  new Day();
       day.update(this);
       return day;
    }
    
}

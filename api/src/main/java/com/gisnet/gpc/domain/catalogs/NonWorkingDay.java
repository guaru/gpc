package com.gisnet.gpc.domain.catalogs;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.common.GenericEntity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = ConstantDomain.COLL_NON_WORKING_DAY)
@Data
@NoArgsConstructor
public class NonWorkingDay implements GenericEntity<NonWorkingDay> {
    
    @Id
    private String id;
    @Field(value = ConstantDomain.FIELD_DAY)
    private Short day;
    @Field(value = ConstantDomain.FIELD_MONTH)
    private Short month;
    @Field(value = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;
    
    @Override
    public void update(NonWorkingDay source) {
       this.setDay(source.getDay());
       this.setMonth(source.getMonth());
       this.setEnabled(source.getEnabled());   
    }

    @Override
    public void enabled(boolean enabled) {
        this.setEnabled(enabled);
        
    }


    @Override
    public NonWorkingDay createNewInstance() {
        NonWorkingDay day =  new NonWorkingDay();
       day.update(this);
       return day;
    }
    
}

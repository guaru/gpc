package com.gisnet.gpc.domain.catalogs;

import java.io.Serializable;
import javax.validation.constraints.NotEmpty;
import com.gisnet.gpc.domain.common.GenericEntity;
import com.querydsl.core.annotations.QueryEntity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.gisnet.gpc.constants.ConstantDomain;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Cooleccion para almacenar areas
 * @author Alejandro Ventura 
 * @since 23-03-2021
 */
@QueryEntity
@Document(collection = ConstantDomain.COLL_AREAS)
@Data
@NoArgsConstructor
public class Area implements Serializable , GenericEntity<Area>{

    @Id
    private String id;

    @NotEmpty
    @Field(value = ConstantDomain.FIELD_NAME)
    private String name;
    @Field(value = ConstantDomain.FIELD_KEY)
    private String key;
    @Field(value = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Override
    public void update(Area source) {
        this.key = source.getKey();
        this.name  = source.getName();
        this.enabled = source.getEnabled();
    }

    @Override
    public void enabled(boolean enabled) {
        this.setEnabled(enabled);
    }

    @Override
    public Area createNewInstance() {
         Area area= new Area();
         area.update(this);
         return area;
    }


}

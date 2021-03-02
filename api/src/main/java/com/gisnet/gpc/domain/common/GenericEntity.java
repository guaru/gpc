package com.gisnet.gpc.domain.common;

public interface GenericEntity<T> {
    // update current instance with provided data
    void update(T source);

    void enabled(boolean enabled);

    String getId();

    // based on current data create new instance with new id
    T createNewInstance();
}

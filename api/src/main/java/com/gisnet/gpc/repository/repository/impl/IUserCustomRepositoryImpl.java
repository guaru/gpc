package com.gisnet.gpc.repository.repository.impl;

import com.gisnet.gpc.domain.security.QUser;
import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.repository.repository.IUserCustomRepository;
import com.gisnet.gpc.util.Utils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public class IUserCustomRepositoryImpl extends QuerydslRepositorySupport implements IUserCustomRepository {

    IUserCustomRepositoryImpl() {
        super(User.class);
    }

    private JPQLQuery<User> getQueryFrom(QUser qEntity){
        return from(qEntity);
    }

    @Override
    public Page<User> findUsers(String userName, Long officeId, Pageable pageable) {
        QUser user =  QUser.user;
        JPQLQuery<User> query = getQueryFrom(user);
        BooleanBuilder where = new BooleanBuilder();
        
        if(!Utils.isEmpty(userName)){
          where.and(user.userName.contains(userName));
        }

        if(!Utils.isEmpty(userName)){
           where.and(user.office.id.eq(officeId));
        }
        query.where(where);
        Long totalRows =  query.fetchCount();
        return new PageImpl<User>(query.fetch(), pageable, totalRows);
    }
    
}

package com.gisnet.gpc.util;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Ops;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.Expressions;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;


@Service
public class PredicateUtil<T> {

     public   Predicate toTextPredicate(final TextCriteria criteria,Class<T> obj) {
         var path = ExpressionUtils.path(obj,"$text");
         var value = Expressions.constant(criteria.getCriteriaObject().get("$text"));
        return ExpressionUtils.predicate(Ops.EQ, path, value);
    }

}

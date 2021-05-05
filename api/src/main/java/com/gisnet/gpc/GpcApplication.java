package com.gisnet.gpc;

import java.util.Collections;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

//import liquibase.database.DatabaseFactory;
//import liquibase.exception.DatabaseException;
//import liquibase.ext.mongodb.database.MongoLiquibaseDatabase;

@SpringBootApplication
@EnableMongoRepositories
public class GpcApplication extends SpringBootServletInitializer 
{    

   //public final String url = "mongodb://liquibase:123@localhost:27017/gpc?mechanism=SCRAM-SHA-256&retryWrites=true&w=majority&authSource=gpc&readPreference=primary&ssl=false&socketTimeoutMS=1000&connectTimeoutMS=1000&serverSelectionTimeoutMS=1000";

   /*@Bean
   public MongoLiquibaseRunner liquibaseRunner(final MongoLiquibaseDatabase database) {
	   return new MongoLiquibaseRunner(database);
   }

   
   @Bean
   public MongoLiquibaseDatabase database() throws DatabaseException {
	   return (MongoLiquibaseDatabase) DatabaseFactory.getInstance().openDatabase(url, null, null, null, null);
   }*/

	public static void main(String[] args) {
		SpringApplication.run(GpcApplication.class, args);
		
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		
		
		return application.sources(applicationClass);
	}

	private static Class<GpcApplication> applicationClass = GpcApplication.class;

@Bean
public TemplateEngine htmlTemplateEngine() {
	final SpringTemplateEngine templateEngine = new SpringTemplateEngine();
	templateEngine.addTemplateResolver(htmlTemplateResolver());

	return templateEngine;
}

private ITemplateResolver htmlTemplateResolver() {
	final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
	templateResolver.setResolvablePatterns(Collections.singleton("html/*"));
	templateResolver.setPrefix("/templates/");
	templateResolver.setSuffix(".html");
	templateResolver.setTemplateMode(TemplateMode.HTML);
	templateResolver.setCharacterEncoding("utf-8");
	templateResolver.setCacheable(false);

	return templateResolver;
}

}

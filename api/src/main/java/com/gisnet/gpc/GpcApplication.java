package com.gisnet.gpc;


import com.gisnet.gpc.repository.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class GpcApplication extends SpringBootServletInitializer {

   @Autowired IUserRepository repository;
	public static void main(String[] args) {
		SpringApplication.run(GpcApplication.class, args);

		

	


	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		
		return application.sources(applicationClass);
	}

	private static Class<GpcApplication> applicationClass = GpcApplication.class;



}

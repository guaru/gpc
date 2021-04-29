FROM maven:3.6.1-jdk-11 as maven_builder


RUN mkdir --parents /usr/src/app
WORKDIR /usr/src/app

ADD pom.xml /usr/src/app/
RUN mvn verify clean --fail-never -Pprod


ADD . /usr/src/app
RUN mvn verify  -Pprod

FROM tomcat:latest
COPY --from=maven_builder /usr/src/app/target/gpc.war /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]
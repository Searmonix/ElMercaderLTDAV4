FROM maven:3.9.3-amazoncorretto-17-debian AS javaimage

# RUN apt-get install maven java-17-openjdk-devel -y \
#     && update-alternatives --config java

RUN addgroup --gid 1000 java \
 	&& adduser --disabled-password --uid 1000 --gid 1000 java \
 	&& chown java:java /usr/bin/java \
    && chown java:java /usr/bin/mvn \
 	&& chmod +x /usr/bin/java \
    && chmod +x /usr/bin/mvn

# build stage
FROM javaimage AS builderzz

WORKDIR /usr/src/app

#COPY --chown=java:java . .

COPY . .

RUN mvn clean package -DskipTests

# execution stage
FROM javaimage

WORKDIR /usr/src/app

COPY --from=builderzz /usr/src/app/target .

RUN chown -R java:java /usr/src/app

USER java	

ENTRYPOINT ["java", "-jar", "ElMercaderLTDA-0.0.1-SNAPSHOT.jar"]

FROM tomcat:9-jre17  

RUN apt-get update && apt-get -y upgrade \ 
    && apt-get install --no-install-recommends -y unzip \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/INL/BlackLab/releases/download/v3.0.1/blacklab-server-3.0.1.war \
    -O /usr/local/tomcat/webapps/blacklab-server.war

RUN mkdir -p /jars/blacklab && \
    mkdir /data && \
    unzip /usr/local/tomcat/webapps/blacklab-server.war -d /jars/blacklab

COPY ./server/blacklab-server.json /etc/blacklab/

ADD ./indexer/formats /data/indexer/formats/
ADD ./indexer/data /data/indexer/data/
ADD ./indexer/scripts /data/indexer/scripts/

RUN chmod +x /data/indexer/scripts/*.sh

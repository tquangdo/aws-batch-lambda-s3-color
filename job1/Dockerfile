FROM ubuntu:16.04
RUN apt-get update
RUN apt-get install -y awscli
RUN export AWS_DEFAULT_PROFILE=jinjer-dev01
COPY print.sh /opt/print.sh
RUN chmod +x /opt/print.sh
ENTRYPOINT /opt/print.sh
WORKDIR /opt
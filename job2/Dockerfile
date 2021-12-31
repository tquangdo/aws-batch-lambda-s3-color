FROM ubuntu:16.04
RUN apt-get update
RUN apt-get install -y awscli
RUN export AWS_DEFAULT_PROFILE=jinjer-dev01
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh
ENTRYPOINT /opt/entrypoint.sh
WORKDIR /opt
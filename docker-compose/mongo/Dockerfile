FROM mongo:6.0.8

ADD entrypoint/rs-init.sh /rs-init.sh

RUN mkdir -p /data/mongo-keyfile
ADD keyfile/mongo-keyfile /data/keyfile/mongo-keyfile
RUN chown -R mongodb:mongodb /data/keyfile/mongo-keyfile
RUN chmod 600 /data/keyfile/mongo-keyfile

RUN echo "mongod --bind_ip_all --replSet rs0 --keyFile /data/keyfile/mongo-keyfile" > /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 27017

ENTRYPOINT ["/bin/bash","/entrypoint.sh"]

RUN echo "sleep 10 \
    ./rs-init.sh" > /replica.sh
RUN chmod +x /replica.sh

CMD ["/bin/bash","/replica.sh"]

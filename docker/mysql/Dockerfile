FROM mysql
RUN apt-get update && apt-get install -y procps
COPY custom.cnf /etc/mysql/conf.d/custom.cnf
COPY schema.sql /schema.sql
ENV MYSQL_ROOT_PASSWORD password
RUN mysql -u root -p password < /schema.sql

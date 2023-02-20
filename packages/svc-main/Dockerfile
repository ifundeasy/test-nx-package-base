# Build image
# docker build --rm -t svc-main -f Dockerfile .

# Run image (test mode)
# docker run -it --rm -p 3001:3001 -p 30010:30010 svc-main

# Run image
# docker run -d -t -p 3001:3001 -p 30010:30010 svc-main

FROM node:16.13.2

LABEL maintainer="com.devops"
LABEL description="svc-main"

# Create app directory
WORKDIR /opt/app

COPY package*.json ./
# RUN npm config set registry http://${NPM_REGISTRY}/ --> no artifactory yet
# RUN WITH_SASL=0 npm install --production --verbose

RUN npm install

# Bundle App Source
COPY . .

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Run layers
RUN [[ -f /opt/app/.env ]] || touch /opt/app/.env
RUN sed -i "s|localhost|host.docker.internal|g" /opt/app/.env
RUN chmod +x /opt/app/bin/migrate-run.sh

EXPOSE 3000
EXPOSE 30000

CMD ["/bin/bash", "bin/migrate-run.sh", "svc-main"]

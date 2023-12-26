FROM node:18

# download dig
RUN apt-get update && apt-get -y upgrade \ 
    && apt-get install --no-install-recommends -y dnsutils \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*


# build backend dockerfile
RUN yarn global add pnpm 

RUN pnpm config set auto-install-peers true

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY ./ ./

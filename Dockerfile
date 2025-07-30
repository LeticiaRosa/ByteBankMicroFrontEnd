FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY main-app ./main-app
COPY dashboard ./dashboard

RUN cd main-app && pnpm install

RUN pnpm --filter main-app build

EXPOSE 3000

CMD ["pnpm", "--filter", "main-app", "start"]
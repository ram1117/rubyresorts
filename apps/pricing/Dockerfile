FROM node:14-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY apps/pricing apps/pricing
COPY libs libs
COPY tsconfig.json tsconfig.json
RUN npm run build

FROM node:14-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production --no-optional
COPY --from=development usr/src/app/dist ./dist
CMD [ "node",'dist/apps/pricing/main' ]
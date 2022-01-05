# # Stage 1
# FROM node:16.13.1-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# CMD ng serve --host 0.0.0.0 
# RUN npm run build --prod

# # Stage 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/dist/LibraryApp-FE /usr/share/nginx/html
# EXPOSE 80

# stage 1

FROM node:16.13.1-alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=my-app-build /app/dist/LibraryApp-FE /usr/share/nginx/html
EXPOSE 80
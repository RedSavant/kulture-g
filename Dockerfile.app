FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY backend-data ./backend-data
COPY pfp-data ./pfp-data
EXPOSE 4000
ENV PORT=4000
CMD ["node", "dist/Kulture-G/server/server.mjs"]

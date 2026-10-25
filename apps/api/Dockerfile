FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/contracts/package.json packages/contracts/package.json
RUN corepack enable && pnpm install --frozen-lockfile --filter @portfolio/api...
COPY packages/contracts packages/contracts
COPY apps/api apps/api
RUN pnpm --filter @portfolio/api build

FROM node:22-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/contracts/package.json packages/contracts/package.json
RUN corepack enable && pnpm install --prod --frozen-lockfile --filter @portfolio/api...
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/apps/api/migrations apps/api/migrations
COPY --from=build /app/packages/contracts/dist packages/contracts/dist
USER node
EXPOSE 4000
CMD ["node", "apps/api/dist/server.js"]

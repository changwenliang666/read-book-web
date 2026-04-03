FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# 构建 Vue3
RUN npm run build

# 安装静态服务工具
RUN npm install -g serve

EXPOSE 5173

# 启动 dist 静态服务
CMD ["serve", "-s", "dist", "-l", "5173"]
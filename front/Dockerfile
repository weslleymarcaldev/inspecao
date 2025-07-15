FROM node:20

WORKDIR /app

COPY package*.json ./

# Força instalação completa, incluindo devDependencies
ENV NODE_ENV=development
RUN npm install

# Garante que os bins estejam disponíveis
ENV PATH="/app/node_modules/.bin:$PATH"

COPY . .

EXPOSE 5173

CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]
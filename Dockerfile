# Usar una imagen base de Node.js
FROM node:16

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Instalar dependencias de la aplicación
# Un asterisco (*) se usa para asegurarse de que tanto el package.json como el package-lock.json sean copiados
# donde están disponibles (npm@5+)
COPY package*.json ./

RUN npm install

# Si estás construyendo tu código para producción
# RUN npm ci --only=production

# Empaquetar el código de la aplicación
COPY . .

# Tu app se une al puerto 3000, así que usarás la instrucción EXPOSE para tenerlo mapeado por el docker daemon
EXPOSE 3002

CMD ["nodemon", "--exec", "ts-node", "src/app.ts"]

#!/bin/bash

echo "🔧 Subindo containers com build..."
docker-compose down
docker-compose up --build -d

echo "⏳ Aguardando CI4 subir..."
sleep 10

echo "🚀 Rodando migrações do CodeIgniter..."
docker exec -it CI4 php spark migrate

echo "🌱 Rodando seeders (caso existam)..."
docker exec -it CI4 php spark db:seed DatabaseSeeder

echo "✅ Sistema iniciado!"

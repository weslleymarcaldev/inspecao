#!/bin/bash

echo "🚀 Iniciando instalação e seed do projeto CI4..."

# Checa se spark existe
if [ ! -f "spark" ]; then
  echo "❌ Arquivo spark não encontrado! Execute este script na raiz do projeto CI4."
  exit 1
fi

# Rodar as migrations
echo "🔄 Rodando migrations..."
php spark migrate

# Rodar o seeder completo
echo "🌱 Populando banco de dados com DatabaseSeeder..."
php spark db:seed DatabaseSeeder

echo "✅ Instalação e seed finalizados!"

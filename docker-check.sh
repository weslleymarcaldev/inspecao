#!/usr/bin/env bash

echo "🚀 Iniciando containers com Docker Compose..."

# Sobe os containers
docker-compose up -d

if [[ $? -ne 0 ]]; then
  echo "❌ Erro ao subir os containers."
  exit 1
fi

echo "⏳ Aguardando containers estabilizarem..."
sleep 5

echo "🔍 Verificando status dos containers..."

# Lista os containers com status
containers=$(docker ps --format "{{.Names}}: {{.Status}}")

if [[ -z "$containers" ]]; then
  echo "❌ Nenhum container em execução!"
  docker ps -a
  exit 1
fi

# Verifica se há containers com status 'Exited'
errors=$(docker ps -a --filter "status=exited" --format "{{.Names}}")

if [[ -n "$errors" ]]; then
  echo "⚠️ Containers com falha de execução detectados:"
  echo "$errors"
  echo ""
  echo "🪵 Últimos logs de erro:"
  for container in $errors; do
    echo "📄 Logs de $container:"
    docker logs "$container" | tail -n 20
    echo "-----------------------------------"
  done
  exit 1
else
  echo "✅ Todos os containers estão rodando corretamente:"
  echo "$containers"
fi

#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n🔍 Verificando containers...\n"

for container in BD_mysql CI4 python-API react-front; do
  if docker ps --format '{{.Names}}' | grep -q "$container"; then
    echo -e "${GREEN}✅ $container está rodando.${NC}"
  else
    echo -e "${RED}❌ $container não está rodando.${NC}"
  fi
done

echo -e "\n🌐 Testando serviços expostos...\n"

# CodeIgniter
if curl -s http://localhost:8080/health | grep -q "ok"; then
  echo -e "${GREEN}✅ CodeIgniter disponível em http://localhost:8080/health${NC}"
else
  echo -e "${RED}❌ CodeIgniter indisponível em http://localhost:8080/health${NC}"
fi

# FastAPI (espera resposta JSON com ou sem erro)
if curl -s http://localhost:8000/docs | grep -q "<title>Swagger UI</title>"; then
  echo -e "${GREEN}✅ FastAPI disponível em http://localhost:8000/docs${NC}"
else
  echo -e "${RED}❌ FastAPI indisponível em http://localhost:8000/docs${NC}"
fi

# React Frontend (verifica status HTTP)
REACT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)
if [[ "$REACT_STATUS" == "200" ]]; then
  echo -e "${GREEN}✅ React Frontend disponível em http://localhost:5173${NC}"
else
  echo -e "${RED}❌ React Frontend indisponível em http://localhost:5173 (HTTP $REACT_STATUS)${NC}"
fi

echo -e "\n📤 Enviando imagem de teste para o FastAPI...\n"

# Caminho da imagem de teste
TEST_IMAGE="idv/writable/uploads/teste.jpg"

if [[ -f "$TEST_IMAGE" ]]; then
  RESPONSE=$(curl -s -F "file=@$TEST_IMAGE" http://localhost:8000/analyze/1)
  if echo "$RESPONSE" | grep -qi "error"; then
    echo -e "${RED}⚠️  Resposta de erro da API: $RESPONSE${NC}"
  else
    echo -e "${GREEN}✅ Imagem enviada e analisada com sucesso.${NC}"
  fi
else
  echo -e "${RED}❌ Imagem de teste não encontrada em: $TEST_IMAGE${NC}"
fi

echo -e "\n✅ Fim dos testes.\n"

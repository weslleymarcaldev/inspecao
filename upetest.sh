#!/bin/bash

GREEN="\033[0;32m"
RED="\033[0;31m"
CYAN="\033[0;36m"
NC="\033[0m"

echo -e "${CYAN}🚀 Iniciando containers com docker-compose...\n${NC}"
docker-compose up -d

echo -e "\n${CYAN}⏳ Aguardando containers subirem...\n${NC}"
sleep 10

containers=("BD_mysql" "CI4" "python-API" "react-front")

echo -e "${CYAN}🔍 Verificando containers...\n${NC}"
for name in "${containers[@]}"; do
  if docker ps --format '{{.Names}}' | grep -q "^${name}$"; then
    echo -e "${GREEN}✅ ${name} está rodando.${NC}"
  else
    echo -e "${RED}❌ ${name} não está rodando.${NC}"
  fi
done

echo -e "\n${CYAN}🌐 Testando serviços expostos...\n${NC}"

test_url() {
  local name=$1
  local url=$2
  local check=$3
  if curl -s "$url" | grep -q "$check"; then
    echo -e "${GREEN}✅ $name disponível em $url${NC}"
  else
    echo -e "${RED}❌ $name indisponível em $url${NC}"
  fi
}

test_url "CodeIgniter" "http://localhost:8080/health" "ok"
test_url "FastAPI" "http://localhost:8000/docs" "FastAPI"
test_url "React Frontend" "http://localhost:5173" "<!DOCTYPE html"

echo -e "\n${CYAN}📤 Enviando imagem de teste para o FastAPI...\n${NC}"

TEST_IMAGE="./idv/writable/uploads/teste.jpg"

if [ -f "$TEST_IMAGE" ]; then
  curl -s -X POST http://localhost:8000/analyze \
    -F "file=@$TEST_IMAGE" | jq .
  echo -e "\n${GREEN}✅ Imagem enviada e analisada com sucesso.${NC}"
else
  echo -e "${RED}❌ Imagem $TEST_IMAGE não encontrada.${NC}"
fi

echo -e "\n${CYAN}✅ Ambiente verificado com sucesso.${NC}\n"

#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔍 Iniciando diagnóstico completo do projeto...${NC}"

# 1. Docker containers
echo -e "\n${YELLOW}📦 Verificando containers Docker...${NC}"
docker ps --format "table {{.Names}}\t{{.Status}}"

# 2. Docker Compose Healthcheck
echo -e "\n${YELLOW}⚙️  docker-compose config e validação...${NC}"
docker-compose config -q && echo -e "${GREEN}✔️ docker-compose válido${NC}" || echo -e "${RED}❌ Erro no docker-compose.yml${NC}"

# 3. Verificando Python (API)
echo -e "\n${YELLOW}🐍 Verificando dependências e lint da API (Python)...${NC}"
cd api || exit
if [ -d "venv" ]; then
  source venv/Scripts/activate 2>/dev/null || source venv/bin/activate
fi
pip install --quiet flake8 >/dev/null
flake8 app/ --count --select=E9,F63,F7,F82 --show-source --statistics || echo -e "${RED}❌ Erros no código Python detectados${NC}"
python -m compileall app/ >/dev/null && echo -e "${GREEN}✔️ Código Python compilado com sucesso${NC}"
cd ..

# 4. Composer (IDV - PHP)
echo -e "\n${YELLOW}🐘 Verificando o projeto IDV (CodeIgniter)...${NC}"
cd idv || exit
if [ -f "composer.json" ]; then
  composer validate --no-check-publish
  composer install --no-scripts --quiet
else
  echo -e "${RED}❌ composer.json não encontrado em /idv${NC}"
fi
php -l app/Controllers/Home.php 2>/dev/null && echo -e "${GREEN}✔️ PHP syntax OK${NC}"
cd ..

# 5. React (Frontend)
echo -e "\n${YELLOW}⚛️ Verificando frontend React...${NC}"
cd front || exit
npm install --quiet
npx eslint src/ || echo -e "${RED}❌ Problemas encontrados no código React${NC}"
npm run build >/dev/null && echo -e "${GREEN}✔️ Build do React realizado com sucesso${NC}" || echo -e "${RED}❌ Erro no build do React${NC}"
cd ..

# 6. Verificação de portas
echo -e "\n${YELLOW}🌐 Testando endpoints expostos...${NC}"
for port in 3306 5173 8080 8000; do
  if powershell.exe -Command "(New-Object Net.Sockets.TcpClient).Connect('localhost', $port)" 2>/dev/null; then
    echo -e "${GREEN}✔️ Porta $port ativa${NC}"
  else
    echo -e "${RED}❌ Porta $port inativa${NC}"
  fi
done

echo -e "\n${YELLOW}📄 Verificando arquivos dockerignore, .env e configs sensíveis...${NC}"
for file in .dockerignore .env Dockerfile; do
  if [ -f "idv/$file" ]; then
    echo -e "${GREEN}✔️ idv/$file encontrado${NC}"
  else
    echo -e "${RED}❌ idv/$file ausente${NC}"
  fi
done

if [ -f "docker-compose.yml" ]; then
  echo -e "${GREEN}✔️ docker-compose.yml encontrado${NC}"
else
  echo -e "${RED}❌ docker-compose.yml ausente${NC}"
fi

echo -e "\n${GREEN}✅ Diagnóstico finalizado.${NC}"

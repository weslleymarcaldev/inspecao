#!/bin/bash

# Variáveis de acesso
MYSQL_USER="root"
MYSQL_PASS="root" 
DB_NAME="idv"
DB_USER="weslley"
DB_PASS="kuo8jli79"

# Caminho do executável do MySQL
MYSQL_BIN="/c/xampp/mysql/bin/mysql.exe"

# Comandos SQL que serão executados
SQL_COMMANDS="
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
"

# Execução do script
echo "📦 Executando criação do banco de dados e permissões..."
"${MYSQL_BIN}" -u "${MYSQL_USER}" -p"${MYSQL_PASS}" -e "${SQL_COMMANDS}"

echo "✅ Banco '${DB_NAME}' criado com usuário '${DB_USER}' e permissões aplicadas."

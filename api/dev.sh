#!/usr/bin/env bash

# Caminho para o venv
VENV_DIR="venv"
ACTIVATE_SCRIPT="$VENV_DIR/Scripts/activate"

# Verifica se o venv está ativo
if [[ -z "$VIRTUAL_ENV" ]]; then
    if [[ -f "$ACTIVATE_SCRIPT" ]]; then
        echo "🟡 Ambiente virtual não estava ativo. Ativando..."
        source "$ACTIVATE_SCRIPT"
    else
        echo "🔴 Ambiente virtual não encontrado em '$VENV_DIR'."
        echo "💡 Dica: crie com 'python -m venv venv' e instale as dependências com 'pip install -r requirements.txt'"
        exit 1
    fi
else
    echo "🟢 Ambiente virtual já está ativo: $VIRTUAL_ENV"
fi

# Comandos disponíveis
case "$1" in
  run)
    echo "🚀 Iniciando o servidor..."
    uvicorn app.main:app --reload
    ;;
  lint)
    echo "🔍 Rodando flake8..."
    flake8 . --exclude=venv
    ;;
  format)
    echo "🎨 Formatando com black + isort..."
    black . && isort .
    ;;
  test)
    echo "🧪 Rodando testes com pytest..."
    pytest
    ;;
  *)
    echo "⚠️  Comando inválido. Use: ./dev.sh {run|lint|format|test}"
    ;;
esac

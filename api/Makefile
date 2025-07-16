# Makefile na pasta api/

# Ativar o venv e rodar o servidor Uvicorn
run:
	. venv/Scripts/activate && uvicorn app.main:app --reload

# Rodar lint (flake8)
lint:
	flake8 . --exclude=venv

# Formatar com Black e ordenar imports com isort
format:
	black . && isort .

# Executar testes (se tiver pytest configurado)
test:
	pytest

.PHONY: run lint format test

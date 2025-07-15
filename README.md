# ✅ Projeto Inspeção Veicular - Dockerizado

## 📁 Estrutura esperada:

```
/inspecao/
├── api/
│   └── .dockerignore
├── idv/
│   └── .dockerignore
├── front/
│   └── .dockerignore
├── docker-compose.yml
```

## 🛠️ Comandos úteis

```bash
# Parar e limpar tudo (inclusive volumes)
docker-compose down -v --remove-orphans

# Limpar cache de builds antigos
docker builder prune -af

# Subir os containers com rebuild
docker-compose up --build
```

---

Se ainda der erro, verifique se a pasta ./mysql está criada como diretório. Remova com:
```bash
rm -rf mysql
```
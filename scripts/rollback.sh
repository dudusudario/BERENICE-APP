#!/bin/bash

# Script de rollback para restaurar versão anterior

# Cores para o console
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]; then
  echo -e "${RED}Erro: É necessário especificar o diretório de backup${NC}"
  echo -e "Uso: $0 <diretório_backup>"
  echo -e "Exemplo: $0 20230615_120000"
  exit 1
fi

BACKUP_DIR="$BACKUP_PATH/$1"

if [ ! -d "$BACKUP_DIR" ]; then
  echo -e "${RED}Erro: Diretório de backup não encontrado: $BACKUP_DIR${NC}"
  echo -e "Backups disponíveis:"
  ls -lt $BACKUP_PATH | grep ^d | awk '{print $9}'
  exit 1
fi

echo -e "${YELLOW}Atenção: Este processo irá substituir a versão atual pela versão de backup.${NC}"
echo -e "Backup: $BACKUP_DIR"
read -p "Deseja continuar? (s/N): " CONFIRM

if [[ $CONFIRM != [sS] ]]; then
  echo -e "${BLUE}Operação cancelada pelo usuário.${NC}"
  exit 0
fi

# Criar backup da versão atual antes do rollback
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CURRENT_BACKUP="$BACKUP_PATH/${TIMESTAMP}_pre_rollback"
echo -e "${BLUE}Criando backup da versão atual em $CURRENT_BACKUP...${NC}"
mkdir -p $CURRENT_BACKUP
cp -r $PROD_TARGET_PATH/* $CURRENT_BACKUP/ || true

# Realizar o rollback
echo -e "${BLUE}Iniciando rollback para a versão $1...${NC}"
rm -rf $PROD_TARGET_PATH/*
cp -r $BACKUP_DIR/* $PROD_TARGET_PATH/

# Reiniciar a aplicação
echo -e "${BLUE}Reiniciando aplicação...${NC}"
cd $PROD_TARGET_PATH
pm2 restart prod-app || pm2 start npm --name "prod-app" -- start

echo -e "${GREEN}Rollback concluído com sucesso!${NC}"
echo -e "Versão anterior: $1"
echo -e "Backup da versão substituída: ${TIMESTAMP}_pre_rollback" 
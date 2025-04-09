#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}Verificando ambiente de desenvolvimento...${colors.reset}\n`);

// Verificar a versão do Node
try {
  const nodeVersion = process.version;
  const nvmrcPath = path.join(__dirname, '..', '.nvmrc');
  
  if (fs.existsSync(nvmrcPath)) {
    const expectedVersion = 'v' + fs.readFileSync(nvmrcPath, 'utf8').trim();
    
    if (nodeVersion === expectedVersion) {
      console.log(`${colors.green}✓ Node.js ${nodeVersion} (versão correta)${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Node.js ${nodeVersion} (esperado: ${expectedVersion})${colors.reset}`);
      console.log(`  ${colors.yellow}Considere usar nvm: "nvm use"${colors.reset}`);
    }
  } else {
    console.log(`${colors.yellow}? Node.js ${nodeVersion} (.nvmrc não encontrado)${colors.reset}`);
  }
} catch (error) {
  console.log(`${colors.red}✗ Erro ao verificar versão do Node: ${error.message}${colors.reset}`);
}

// Verificar Husky
try {
  const huskyDir = path.join(__dirname, '..', '.husky');
  if (fs.existsSync(huskyDir)) {
    console.log(`${colors.green}✓ Husky está configurado${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Husky não está configurado${colors.reset}`);
    console.log(`  ${colors.yellow}Execute: "npm run prepare"${colors.reset}`);
  }
} catch (error) {
  console.log(`${colors.red}✗ Erro ao verificar Husky: ${error.message}${colors.reset}`);
}

// Verificar dependências
try {
  console.log(`${colors.blue}Verificando dependências...${colors.reset}`);
  const outdated = execSync('npm outdated --depth=0', { stdio: 'pipe' }).toString();
  
  if (outdated.trim()) {
    console.log(`${colors.yellow}! Dependências desatualizadas detectadas:${colors.reset}`);
    console.log(outdated);
  } else {
    console.log(`${colors.green}✓ Todas as dependências estão atualizadas${colors.reset}`);
  }
} catch (error) {
  // npm outdated retorna código de erro quando encontra dependências desatualizadas
  console.log(`${colors.yellow}! Dependências desatualizadas detectadas${colors.reset}`);
}

console.log(`\n${colors.bold}${colors.blue}Verificação concluída!${colors.reset}`); 
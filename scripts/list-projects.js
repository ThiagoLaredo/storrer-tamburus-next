// scripts/list-projects.js
const fs = require('fs').promises;
const path = require('path');

async function listarProjetos() {
  try {
    const projetosPath = path.join(process.cwd(), 'public', 'images', 'projetos');
    const projetos = await fs.readdir(projetosPath);
    
    console.log('📁 Projetos disponíveis:');
    projetos.forEach((projeto, i) => {
      console.log(`${i + 1}. ${projeto}`);
    });
  } catch (error) {
    console.error('❌ Erro ao listar projetos:', error.message);
    console.log('Verifique se a pasta existe: public/images/projetos/');
  }
}

listarProjetos();
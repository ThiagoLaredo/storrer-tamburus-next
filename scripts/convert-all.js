// scripts/convert-all.js
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Função para normalizar nomes: remove acentos, converte para minúsculas, substitui espaços por hífens
function normalizarNome(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, '') // Remove caracteres especiais
    .replace(/-+/g, '-'); // Remove múltiplos hífens consecutivos
}

async function converterProjetoParaWebP(pastaProjeto) {
  try {
    const nomeProjetoOriginal = path.basename(pastaProjeto);
    const nomeProjetoNormalizado = normalizarNome(nomeProjetoOriginal);
    
    console.log(`\n📁 Processando: ${nomeProjetoOriginal}`);
    console.log(`📝 Nome normalizado: ${nomeProjetoNormalizado}`);
    console.log('='.repeat(50));
    
    // Lê todos os arquivos da pasta
    const arquivos = await fs.readdir(pastaProjeto);
    
    // Filtra apenas arquivos JPG/JPEG
    const imagens = arquivos.filter(arquivo =>
      /\.(jpg|jpeg)$/i.test(arquivo)
    ).sort(); // Ordena alfabeticamente para consistência

    if (imagens.length === 0) {
      console.log('❌ Nenhuma imagem JPG encontrada');
      return { 
        projeto: nomeProjetoOriginal, 
        convertidas: 0, 
        erro: 'Nenhuma imagem JPG' 
      };
    }

    console.log(`🖼️  Encontradas ${imagens.length} imagens JPG`);
    
    // Cria pasta para WebP se não existir
    const pastaWebP = path.join(pastaProjeto, 'webp');
    await fs.mkdir(pastaWebP, { recursive: true });
    
    let convertidas = 0;
    let totalEconomiaKB = 0;
    let totalOriginalKB = 0;
    
    // Primeiro, limpa arquivos WebP antigos na pasta
    try {
      const arquivosAntigos = await fs.readdir(pastaWebP);
      const arquivosWebPAntigos = arquivosAntigos.filter(arquivo =>
        /\.webp$/i.test(arquivo)
      );
      
      if (arquivosWebPAntigos.length > 0) {
        console.log(`🧹 Limpando ${arquivosWebPAntigos.length} arquivos WebP antigos...`);
        for (const arquivoAntigo of arquivosWebPAntigos) {
          await fs.unlink(path.join(pastaWebP, arquivoAntigo));
        }
      }
    } catch (error) {
      // Se a pasta estiver vazia ou não existir, continua
    }
    
    // Mapeamento de nomes originais para novos nomes (para referência)
    const mapeamentoNomes = [];
    
    for (let i = 0; i < imagens.length; i++) {
      const imagem = imagens[i];
      const caminhoEntrada = path.join(pastaProjeto, imagem);
      const numero = i + 1;
      const novoNome = `${nomeProjetoNormalizado}-${numero}.webp`;
      const caminhoSaida = path.join(pastaWebP, novoNome);
      
      mapeamentoNomes.push({
        original: imagem,
        novo: novoNome,
        numero: numero
      });
      
      try {
        console.log(`🔄 Convertendo: ${imagem} → ${novoNome}`);
        
        // Obtém metadados da imagem original
        const metadata = await sharp(caminhoEntrada).metadata();
        const tamanhoOriginalKB = metadata.size / 1024;
        totalOriginalKB += tamanhoOriginalKB;
        
        // Converte para WebP mantendo 2000px de largura
        await sharp(caminhoEntrada)
          .resize({
            width: 2000,
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ 
            quality: 80,
            effort: 4
          })
          .toFile(caminhoSaida);
        
        // Compara tamanhos
        const statsOriginal = await fs.stat(caminhoEntrada);
        const statsWebP = await fs.stat(caminhoSaida);
        const reducao = ((statsOriginal.size - statsWebP.size) / statsOriginal.size * 100).toFixed(1);
        const economiaKB = (statsOriginal.size - statsWebP.size) / 1024;
        totalEconomiaKB += economiaKB;
        
        console.log(`   ✅ ${(statsOriginal.size / 1024).toFixed(0)}KB → ${(statsWebP.size / 1024).toFixed(0)}KB (${reducao}% menor)`);
        
        convertidas++;
        
      } catch (error) {
        console.error(`❌ Erro em ${imagem}:`, error.message);
      }
    }
    
    // Salva um arquivo de referência com o mapeamento de nomes
    const arquivoMapeamento = path.join(pastaWebP, '_mapeamento-nomes.json');
    await fs.writeFile(
      arquivoMapeamento, 
      JSON.stringify(mapeamentoNomes, null, 2)
    );
    
    console.log(`\n📊 RESUMO DO PROJETO "${nomeProjetoOriginal}":`);
    console.log(`   Imagens convertidas: ${convertidas}/${imagens.length}`);
    console.log(`   Economia total: ${totalEconomiaKB.toFixed(1)}KB`);
    console.log(`   Nomes das imagens WebP:`);
    
    // Mostra os novos nomes
    for (const item of mapeamentoNomes) {
      console.log(`     ${item.numero}. ${item.novo}`);
    }
    
    console.log(`   📄 Mapeamento salvo em: ${arquivoMapeamento}`);
    
    return {
      projeto: nomeProjetoOriginal,
      projetoNormalizado: nomeProjetoNormalizado,
      convertidas,
      total: imagens.length,
      economiaKB: totalEconomiaKB,
      nomesWebP: mapeamentoNomes.map(item => item.novo)
    };
    
  } catch (error) {
    console.error(`❌ Erro no projeto ${pastaProjeto}:`, error.message);
    return { 
      projeto: path.basename(pastaProjeto), 
      erro: error.message 
    };
  }
}

async function converterTodosProjetos() {
  const projetosPath = path.join(process.cwd(), 'public', 'images', 'projetos');
  
  try {
    console.log('🚀 INICIANDO CONVERSÃO DE TODOS OS PROJETOS');
    console.log('='.repeat(60));
    console.log('📝 As imagens serão renomeadas no formato: nome-projeto-numero.webp');
    console.log('='.repeat(60));
    
    const projetos = await fs.readdir(projetosPath);
    const resultados = [];
    let totalConvertidas = 0;
    let totalImagens = 0;
    let totalEconomiaKB = 0;
    
    for (const projeto of projetos) {
      const projetoPath = path.join(projetosPath, projeto);
      const stats = await fs.stat(projetoPath);
      
      if (stats.isDirectory()) {
        const resultado = await converterProjetoParaWebP(projetoPath);
        resultados.push(resultado);
        
        if (resultado.convertidas) {
          totalConvertidas += resultado.convertidas;
          totalImagens += resultado.total || 0;
          totalEconomiaKB += resultado.economiaKB || 0;
        }
        
        // Pequena pausa entre projetos para não sobrecarregar
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Resumo final
    console.log('\n' + '='.repeat(60));
    console.log('🎉 CONVERSÃO CONCLUÍDA!');
    console.log('='.repeat(60));
    console.log(`📊 RESUMO GERAL:`);
    console.log(`   Projetos processados: ${resultados.length}`);
    console.log(`   Total de imagens convertidas: ${totalConvertidas}`);
    console.log(`   Economia total de espaço: ${totalEconomiaKB.toFixed(1)}KB (${(totalEconomiaKB / 1024).toFixed(2)}MB)`);
    console.log('\n📁 Projetos processados e nomes gerados:');
    
    resultados.forEach((r, i) => {
      if (r.erro) {
        console.log(`   ${i + 1}. ${r.projeto}: ❌ ${r.erro}`);
      } else {
        console.log(`   ${i + 1}. ${r.projeto}:`);
        console.log(`       Nome base: ${r.projetoNormalizado}-[numero].webp`);
        console.log(`       Quantidade: ${r.convertidas}/${r.total} imagens`);
        
        // Mostra os primeiros nomes como exemplo
        if (r.nomesWebP && r.nomesWebP.length > 0) {
          const primeirosNomes = r.nomesWebP.slice(0, 3);
          const nomesTexto = primeirosNomes.join(', ');
          const maisTexto = r.nomesWebP.length > 3 ? `... (+${r.nomesWebP.length - 3})` : '';
          console.log(`       Exemplos: ${nomesTexto}${maisTexto}`);
        }
      }
    });
    
    console.log('\n💡 As imagens WebP foram salvas em:');
    console.log('   public/images/projetos/[NOME]/webp/');
    console.log('\n📄 Cada pasta "webp" contém um arquivo "_mapeamento-nomes.json"');
    console.log('   com a correspondência entre os nomes originais e os novos.');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

// Executa a função
converterTodosProjetos();
import MainLayout from '@/layouts/MainLayout';
import styles from '@/styles/Sobre.module.css';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Sobre() {
  const containerRef = useRef(null);
  const tituloRef = useRef(null);
  const textoRef = useRef(null);
  const galeriaRef = useRef(null);
  const paragrafosRef = useRef([]);
  const [imagemAtual, setImagemAtual] = useState(0);

  // Array de imagens dos sócios - você pode adicionar mais
  const imagensSociais = [
    {
      src: "images/socios/fabio-storrer.webp",
      alt: "Fabio Storrer - Sócio fundador da Storrer Tamburus Arquitetura",
      legenda: "Fabio Storrer"
    },
    {
      src: "images/socios/veridiana-tamburus.webp", 
      alt: "Veridiana Tamburus - Sócia fundadora da Storrer Tamburus Arquitetura",
      legenda: "Veridiana Tamburus"
    }
  ];

  // Efeito para transição automática de imagens
  useEffect(() => {
    const interval = setInterval(() => {
      setImagemAtual((prev) => (prev + 1) % imagensSociais.length);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [imagensSociais.length]);

  // Efeito para animações GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.3
      });

      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      )
      .fromTo(tituloRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.1"
      )
      .fromTo(galeriaRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(textoRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(paragrafosRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.2
        },
        "-=0.3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <MainLayout 
      title="Sobre a Storrer Tamburus - Arquitetura e Design de Excelência em São Paulo"
      description="Conheça a trajetória da Storrer Tamburus Arquitetura. Fabio Storrer e Veridiana Tamburus unem expertise internacional e sensibilidade para criar projetos únicos que transformam espaços e vivências."
      keywords="arquitetura São Paulo, design de interiores, Storrer Tamburus, Fabio Storrer, Veridiana Tamburus, projeto arquitetônico, arquitetura comercial, arquitetura residencial, escritório de arquitetura"
      image="/sobre-og-image.jpg"
      url="https://storrertamburus.com.br/sobre"
      theme="light"
      hideFooter={true}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Sobre - Storrer Tamburus Arquitetura",
        "description": "Conheça a história e filosofia da Storrer Tamburus Arquitetura, escritório referência em projetos arquitetônicos inovadores em São Paulo.",
        "url": "https://storrertamburus.com.br/sobre",
        "publisher": {
          "@type": "Organization",
          "name": "Storrer Tamburus Arquitetura",
          "description": "Escritório de arquitetura e design especializado em projetos residenciais e comerciais de alto padrão",
          "url": "https://storrertamburus.com.br/",
          "logo": "https://storrertamburus.com.br/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenida Faria Lima",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "addressCountry": "BR"
          },
          "sameAs": [
            "https://www.instagram.com/storrertamburus",
            "https://www.facebook.com/storrertamburus",
            "https://br.pinterest.com/storrertamburus",
            "https://www.linkedin.com/company/storrertamburus"
          ]
        },
        "mainEntity": {
          "@type": "Organization",
          "name": "Storrer Tamburus Arquitetura",
          "description": "Escritório de arquitetura e design com foco em projetos residenciais e comerciais. Excelência e inovação em cada projeto.",
          "foundingDate": "2008",
          "founder": [
            {
              "@type": "Person",
              "name": "Fabio Storrer",
              "jobTitle": "Arquiteto e Sócio Fundador"
            },
            {
              "@type": "Person", 
              "name": "Veridiana Tamburus",
              "jobTitle": "Arquiteta e Sócia Fundadora"
            }
          ],
          "areaServed": "Brasil",
          "knowsAbout": [
            "Arquitetura Residencial",
            "Arquitetura Comercial", 
            "Design de Interiores",
            "Projetos Arquitetônicos",
            "Consultoria em Arquitetura",
            "Gestão de Obras",
            "Sustentabilidade"
          ]
        }
      }}
    >
      <div ref={containerRef} className={styles.sobreContainer}>
        <div className={styles.conteudoPrincipal}>
          {/* Galeria de Fotos com Transição Automática */}
          <div ref={galeriaRef} className={styles.galeria}>
            <div className={styles.galeriaContainer}>
              {imagensSociais.map((imagem, index) => (
                <div
                  key={index}
                  className={`${styles.fotoContainer} ${
                    index === imagemAtual ? styles.ativa : ''
                  }`}
                >
                  <img 
                    src={imagem.src}
                    alt={imagem.alt}
                    className={styles.foto}
                  />
                  <div className={styles.legenda}>
                    <span className={styles.textoLegenda}>{imagem.legenda}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicadores de slide */}
            <div className={styles.indicadores}>
              {imagensSociais.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicador} ${
                    index === imagemAtual ? styles.ativo : ''
                  }`}
                  onClick={() => setImagemAtual(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Conteúdo de Texto com Scroll */}
          <div className={styles.textoContent}>
            <h1 ref={tituloRef} className={styles.titulo}>
              Storrer Tamburus:<br />
              <span className={styles.tituloDestaque}>Arquitetura que Conecta</span>
            </h1>
            
            <div ref={textoRef} className={styles.textoContainer}>
              <div className={styles.texto}>
                <p ref={el => paragrafosRef.current[0] = el}>
                  De um encontro fortuito sob o céu de <strong>Fernando de Noronha</strong> nasceu uma conexão que atravessa o tempo e o espaço. 
                  Entre horizontes que evocam permanência, dois percursos se entrelaçaram: <strong>Fabio Storrer</strong>, vindo de Nova York, 
                  e <strong>Veridiana Tamburus</strong>, do coração de Ribeirão Preto. De universos distintos, 
                  trouxeram consigo um recomeço e uma paixão convergente — a <strong>arquitetura transformadora</strong>.
                </p>
                <p ref={el => paragrafosRef.current[1] = el}>
                  Em <strong>2008</strong>, São Paulo tornou-se o território inaugural dessa jornada pessoal e criativa. 
                  Desde então, a <strong>Avenida Faria Lima</strong> deixou de ser apenas um endereço: tornou-se campo de 
                  experimentação, onde ideias ganham corpo, onde sonhos se materializam em espaço, 
                  onde a arquitetura se converte em <strong>experiência sensorial e humana</strong>.
                </p>
                <p ref={el => paragrafosRef.current[2] = el}>
                  No <strong>Storrer Tamburus Arquitetura</strong>, projetamos narrativas habitáveis. 
                  Cada linha nasce do gesto de escuta, cada espaço é desenhado para revelar identidades e acolher histórias. 
                  Acreditamos que arquitetura é mais que técnica — é <strong>emoção estruturada</strong>, é <strong>estratégia espacial</strong>, é diálogo entre matéria e afeto.
                </p>
                
                <div ref={el => paragrafosRef.current[3] = el} className={styles.destaque}>
                  <h3>Nossa Abordagem</h3>
                  <ul>
                    <li><strong>Soluções sob medida</strong> que respeitam a singularidade de cada cliente</li>
                    <li><strong>Tradução da pluralidade</strong> dos modos de viver no habitar</li>
                    <li><strong>Expressão arquitetônica</strong> dos valores e essência das marcas em projetos corporativos</li>
                    <li><strong>Compromisso com sustentabilidade</strong>, funcionalidade e rigor orçamentário</li>
                  </ul>
                </div>

                <p ref={el => paragrafosRef.current[4] = el}>
                  Aliamos <strong>precisão técnica</strong> a uma visão multidisciplinar, conduzidos por uma escuta atenta e por um desejo constante de evolução.
                </p>

                <div ref={el => paragrafosRef.current[5] = el} className={styles.filosofia}>
                  <h3>Nossa Filosofia</h3>
                  <div className={styles.pilares}>
                    <span className={styles.pilar}>É percepção.</span>
                    <span className={styles.pilar}>É permanência.</span>
                    <span className={styles.pilar}>É existência.</span>
                  </div>
                </div>

                <div ref={el => paragrafosRef.current[6] = el} className={styles.manifesto}>
                  <p>Somos espaço de ideias e de transformações.</p>
                  <p>Somos território de encontro entre o humano e o construído.</p>
                  <p>Somos Arquitetura que acolhe, conecta e transforma.</p>
                  <p className={styles.assinatura}>Somos Storrer Tamburus Arquitetura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
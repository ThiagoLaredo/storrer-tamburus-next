import MainLayout from '@/layouts/MainLayout';
import styles from '@/styles/Sobre.module.css';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Sobre() {
  const containerRef = useRef(null);
  const tituloRef = useRef(null);
  const textoRef = useRef(null);
  const paragrafosRef = useRef([]);

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
      .fromTo(textoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
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
      title="Sobre | Storrer Tamburus - Arquitetura e Design"
      description="Conheça a Storrer Tamburus, escritório de arquitetura e design com foco em projetos residenciais e comerciais. Excelência e inovação em cada projeto."
      keywords="sobre Storrer Tamburus, história arquitetura, escritório arquitetura São Paulo, projetos arquitetônicos, design de interiores"
      image="/default-og-image.jpg"
      url="https://storrertamburus.com/sobre"
      theme="light"
      hideFooter={true}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Sobre - Storrer Tamburus",
        "description": "Conheça a Storrer Tamburus, escritório de arquitetura e design com foco em projetos residenciais e comerciais. Excelência e inovação em cada projeto.",
        "url": "https://storrertamburus.com/sobre",
        "publisher": {
          "@type": "Organization",
          "name": "Storrer Tamburus",
          "description": "Escritório de arquitetura e design especializado em projetos residenciais e comerciais",
          "url": "https://storrertamburus.com",
          "logo": "https://storrertamburus.com/logo.png",
          "sameAs": [
            "https://www.instagram.com/storrertamburus",
            "https://www.facebook.com/storrertamburus",
            "https://twitter.com/storrertamburus"
          ]
        },
        "mainEntity": {
          "@type": "Organization",
          "name": "Storrer Tamburus",
          "description": "Escritório de arquitetura e design com foco em projetos residenciais e comerciais. Excelência e inovação em cada projeto.",
          "foundingDate": "2015", // 🔥 ALTERE PARA O ANO REAL DE FUNDAÇÃO
          "areaServed": "Brasil",
          "knowsAbout": [
            "Arquitetura Residencial",
            "Arquitetura Comercial", 
            "Design de Interiores",
            "Projetos Arquitetônicos",
            "Consultoria em Arquitetura"
          ]
        }
      }}
    >
      <div ref={containerRef} className={styles.sobreContainer}>
        <div className={styles.sobreContent}>
          <h1 ref={tituloRef} className={styles.titulo}>Sobre</h1>
          <div ref={textoRef} className={styles.texto}>
            <p ref={el => paragrafosRef.current[0] = el}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna
              ultricies tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p ref={el => paragrafosRef.current[1] = el}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Filtros.module.css';

export default function Filtros({ tipos, filtroAtivo, onFiltroChange }) {
  const filtrosRef = useRef([]);

  // 🔥 ANIMAÇÃO DE ENTRADA MAIS RÁPIDA
  useEffect(() => {
    gsap.fromTo(
      filtrosRef.current.filter(Boolean), // 🔥 FILTRA ELEMENTOS NULOS
      { 
        y: -20, // 🔥 MENOS MOVIMENTO
        opacity: 0, 
        scale: 0.9 // 🔥 MENOS SCALE
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, // 🔥 DURAÇÃO REDUZIDA (era 0.6s)
        stagger: 0.06, // 🔥 STAGGER MAIS RÁPIDO (era 0.1s)
        delay: 0.3, // 🔥 DELAY REDUZIDO (era 0.5s)
        ease: 'back.out(1.4)' // 🔥 EASING MAIS SUAVE
      }
    );
  }, []);

  const handleFiltroClick = (slug, e) => {
    e.preventDefault();

    // 🔥 ANIMAÇÃO DE CLIQUE MAIS RÁPIDA
    const tl = gsap.timeline({
      onComplete: () => onFiltroChange(slug)
    });

    tl.to(e.target, { 
        scale: 0.92, // 🔥 MENOS COMPRESSÃO
        duration: 0.1, // 🔥 MAIS RÁPIDO (era 0.15s)
        ease: 'power2.in' 
      })
      .to(e.target, { 
        scale: 1, 
        duration: 0.4, // 🔥 MAIS RÁPIDO (era 0.6s)
        ease: 'elastic.out(1.2, 0.5)' // 🔥 ELASTIC MAIS SUAVE
      })
      .to(
        e.target,
        {
          keyframes: {
            '0%': { 
              boxShadow: '0 0 0 0 rgba(255, 193, 7, 0.6)', 
              borderRadius: '25px' 
            },
            '50%': { 
              boxShadow: '0 0 0 4px rgba(255, 193, 7, 0.3)', // 🔥 MENOS EXPANSÃO
              borderRadius: '25px' 
            },
            '100%': { 
              boxShadow: '0 0 0 6px rgba(255, 193, 7, 0)', // 🔥 MENOS EXPANSÃO
              borderRadius: '25px' 
            }
          },
          duration: 0.5 // 🔥 MAIS RÁPIDO (era 0.8s)
        },
        '-=0.3' // 🔥 OVERLAP MAIOR (era -0.4)
      );

    // Atualiza a URL sem recarregar a página
    const url = new URL(window.location);
    url.searchParams.set('filter', slug);
    window.history.pushState({}, '', url);
  };

  return (
    <nav className={styles.filtrosProjetos}>
      <ul className={styles.filtrosList} role="menu">
        {tipos.map((tipo, index) => (
          <li key={tipo.slug}>
            <button
              ref={el => (filtrosRef.current[index] = el)}
              className={`${styles.filtroBtn} ${filtroAtivo === tipo.slug ? styles.ativo : ''}`}
              onClick={(e) => handleFiltroClick(tipo.slug, e)}
              data-slug={tipo.slug}
            >
              {tipo.nome}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
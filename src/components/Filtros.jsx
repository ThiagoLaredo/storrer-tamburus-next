'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Filtros.module.css'; // ⚡ caminho correto

export default function Filtros({ tipos, filtroAtivo, onFiltroChange }) {
  const filtrosRef = useRef([]);

  // Animação de entrada dos filtros
  useEffect(() => {
    gsap.fromTo(
      filtrosRef.current,
      { y: -30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'back.out(1.7)' }
    );
  }, []);

  const handleFiltroClick = (slug, e) => {
    e.preventDefault();

    // animação de clique
    const tl = gsap.timeline({
      onComplete: () => onFiltroChange(slug) // atualiza o filtro após a animação
    });

    tl.to(e.target, { scale: 0.95, duration: 0.15, ease: 'power2.in' })
      .to(e.target, { scale: 1, duration: 0.6, ease: 'elastic.out(1.5, 0.5)' })
      .to(
        e.target,
        {
          keyframes: {
            '0%': { boxShadow: '0 0 0 0 rgba(255, 193, 7, 0.6)', borderRadius: '25px' },
            '50%': { boxShadow: '0 0 0 6px rgba(255, 193, 7, 0.3)', borderRadius: '25px' },
            '100%': { boxShadow: '0 0 0 10px rgba(255, 193, 7, 0)', borderRadius: '25px' }
          },
          duration: 0.8
        },
        '-=0.4'
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

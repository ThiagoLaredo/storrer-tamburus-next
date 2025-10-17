// components/Header.jsx
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.css';
import filtrosStyles from './Filtros.module.css'; // 🔥 Importa CSS dos filtros
import { gsap } from "gsap";

export default function Header({ hideNav = false, showFilters = false, tipos = [], filtroAtivo, onFiltroChange }) {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const instagramRef = useRef(null);
  const filtersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      // Animação do logo
      tl.from(logoRef.current, { opacity: 0, y: 30 });
      
      if (!hideNav && !showFilters) {
        // Animação do menu normal + Instagram
        gsap.set(instagramRef.current, { opacity: 0, y: 20 });
        
        tl.from(menuItemsRef.current, { 
          opacity: 0, 
          y: 20, 
          stagger: 0.15 
        }, "-=0.3")
        .to(instagramRef.current, { 
          opacity: 1, 
          y: 0 
        }, "-=0.6");
      } else if (showFilters) {
        // 🔥 Animação dos filtros
        tl.from(filtersRef.current, {
          opacity: 0,
          x: 20,
          stagger: 0.1,
          duration: 0.8
        }, "-=0.3");
      }
    }, headerRef);

    return () => ctx.revert();
  }, [hideNav, showFilters]);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.headerContainer}>
        {/* 🔥 LOGO COM LINK PARA HOME */}
        <Link href="/" className={styles.logoLink}>
          <div ref={logoRef} className={styles.logo}>
            Storrer Tamburus
          </div>
        </Link>

        {/* Container da direita - Menu OU Filtros */}
        <div className={styles.rightContainer}>
          {showFilters ? (
            // 🔥 MOSTRA FILTROS no canto direito (usando CSS separado)
            <nav className={filtrosStyles.filtrosProjetos}>
              <ul className={filtrosStyles.filtrosList}>
                {tipos.map((tipo, index) => (
                  <li key={tipo.slug}>
                    <button
                      ref={el => filtersRef.current[index] = el}
                      className={`${filtrosStyles.filtroBtn} ${filtroAtivo === tipo.slug ? filtrosStyles.ativo : ''}`}
                      onClick={() => onFiltroChange(tipo.slug)}
                      data-slug={tipo.slug}
                    >
                      {tipo.nome}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ) : !hideNav ? (
            // MOSTRA MENU NORMAL + Instagram
            <>
              <nav className={styles.nav}>
                <ul className={styles.menu}>
                  {["Projetos", "Sobre", "Contato"].map((item, i) => (
                    <li
                      key={item}
                      ref={(el) => (menuItemsRef.current[i] = el)}
                    >
                      <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <a
                ref={instagramRef}
                href="https://instagram.com/storrertamburus"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instagram}
              >
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  priority
                  unoptimized
                />
              </a>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
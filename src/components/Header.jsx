// 


import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router"; // 🔥 ADICIONE ESTE IMPORT
import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.css';
import filtrosStyles from './Filtros.module.css';
import { gsap } from "gsap";

export default function Header({ 
  hideNav = false, 
  showFilters = false, 
  tipos = [], 
  filtroAtivo, 
  onFiltroChange,
  theme = 'dark'
}) {
  const router = useRouter(); // 🔥 HOOK DO ROUTER
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const instagramRef = useRef(null);
  const filtersRef = useRef([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 DETECTA PÁGINAS ESPECIAIS (Contato e Sobre)
  const isContactPage = router.pathname === '/contato';
  const isAboutPage = router.pathname === '/sobre';
  const isSpecialPage = isContactPage || isAboutPage;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(logoRef.current, { opacity: 0, y: 30 });
      
      if (!hideNav && !showFilters) {
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

  // 🔥 Controla o scroll quando menu mobile abre/fecha
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      ref={headerRef} 
      className={`${styles.header} ${styles[theme]} ${
        isSpecialPage ? styles.specialPage : ''
      } ${
        isContactPage ? styles.contactPage : ''
      } ${
        isAboutPage ? styles.aboutPage : ''
      }`}
    >
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoLink}>
          <div ref={logoRef} className={styles.logo}>
            Storrer Tamburus
          </div>
        </Link>

        {/* 🔥 Botão do menu hamburguer para mobile */}
        <button 
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={styles.rightContainer}>
          {showFilters ? (
            <nav className={`${filtrosStyles.filtrosProjetos} ${filtrosStyles[theme]}`}>
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

      {/* 🔥 Menu Mobile Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuContent}>
          
          {/* Conteúdo principal - Filtros OU Menu Institucional */}
          <div className={styles.mobileMainContent}>
            {showFilters ? (
              // 🔥 Filtros - vertical e centralizado (para página de Projetos)
              <nav className={styles.mobileFilters}>
                <ul>
                  {tipos.map((tipo) => (
                    <li key={tipo.slug}>
                      <button
                        className={`${styles.mobileFilterBtn} ${filtroAtivo === tipo.slug ? styles.active : ''}`}
                        onClick={() => {
                          onFiltroChange(tipo.slug);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {tipo.nome}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : !hideNav ? (
              // 🔥 Menu Institucional - vertical e centralizado (para Home, Sobre, Contato)
              <nav className={styles.mobileMenuInstitutional}>
                <ul>
                  {["Projetos", "Sobre", "Contato"].map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/${item.toLowerCase()}`} 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* 🔥 Instagram no mobile */}
                <div className={styles.mobileInstagram}>
                  <a
                    href="https://instagram.com/storrertamburus"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      priority
                      unoptimized
                    />
                    <span>Siga-nos no Instagram</span>
                  </a>
                </div>
              </nav>
            ) : null}
          </div>

          {/* 🔥 Menu Institucional no bottom - horizontal (apenas quando showFilters é true) */}
          {showFilters && (
            <nav className={styles.mobileInstitutionalBottom}>
              <ul>
                {["Projetos", "Sobre", "Contato"].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
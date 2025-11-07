import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const instagramRef = useRef(null);
  const filtersRef = useRef([]);
  const hamburgerRef = useRef(null);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isContactPage = router.pathname === '/contato';
  const isAboutPage = router.pathname === '/sobre';
  const isSpecialPage = isContactPage || isAboutPage;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔥 TIMELINE MAIS RÁPIDA MAS MANTENDO A ANIMAÇÃO
      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power2.out",
          duration: 0.6
        }
      });

      // 1. Logo - animação rápida
      tl.from(logoRef.current, { 
        opacity: 0, 
        y: 20,
        duration: 0.5
      });
      
      // 2. Hamburguer - animação simultânea
      if (hamburgerRef.current) {
        tl.from(hamburgerRef.current, { 
          opacity: 0, 
          x: 15,
          duration: 0.5
        }, "-=0.3");
      }
      
      // 3. Menu desktop ou filtros
      if (!hideNav && !showFilters) {
        // Garante que o Instagram comece invisível
        if (instagramRef.current) {
          gsap.set(instagramRef.current, { opacity: 0, y: 10 });
        }
        
        // Menu items - animação rápida
        tl.from(menuItemsRef.current.filter(el => el !== null), { 
          opacity: 0, 
          y: 15,
          duration: 0.4,
          stagger: 0.08
        }, "-=0.2")
        
        // Instagram - animação rápida
        .to(instagramRef.current, { 
          opacity: 1, 
          y: 0,
          duration: 0.4
        }, "-=0.3");
        
      } else if (showFilters) {
        // Filtros - animação rápida
        tl.from(filtersRef.current.filter(el => el !== null), {
          opacity: 0,
          x: 15,
          duration: 0.4,
          stagger: 0.06
        }, "-=0.2");
      }

    }, headerRef);

    return () => ctx.revert();
  }, [hideNav, showFilters]); // 🔥 MANTIVE AS DEPENDÊNCIAS ORIGINAIS

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

        <button 
          ref={hamburgerRef}
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

      {/* Menu Mobile Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuContent}>
          
          <div className={styles.mobileMainContent}>
            {showFilters ? (
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
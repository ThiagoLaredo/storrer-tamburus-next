import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer({ theme = 'dark' }) {
  const footerRef = useRef(null);
  const menuItemsRef = useRef([]);
  const instagramRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔥 TIMELINE MAIS RÁPIDA
      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power2.out", // 🔥 EASING MAIS RÁPIDO
          duration: 0.6 // 🔥 DURAÇÃO REDUZIDA
        }, 
        delay: 0.8 // 🔥 DELAY REDUZIDO (era 1.5s)
      });

      // 🔥 SET MAIS SIMPLES
      gsap.set([...menuItemsRef.current.filter(Boolean), instagramRef.current], { 
        opacity: 0, 
        y: 15 // 🔥 MENOS MOVIMENTO
      });

      // 🔥 ANIMAÇÃO MAIS RÁPIDA
      tl.to(menuItemsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.08 // 🔥 STAGGER MAIS RÁPIDO
      })
      .to(instagramRef.current, {
        opacity: 1,
        y: 0
      }, "-=0.3"); // 🔥 OVERLAP MAIOR

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.footerContainer}>
        <nav className={styles.navFooter}>
          <ul className={styles.menuFooter}>
            {["Projetos", "Sobre", "Contato"].map((item, i) => (
              <li
                key={item}
                ref={(el) => (menuItemsRef.current[i] = el)}
              >
                <Link href={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>

          <a
            ref={instagramRef}
            href="https://instagram.com/storrertamburus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramFooter}
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
        </nav>
      </div>
    </footer>
  );
}
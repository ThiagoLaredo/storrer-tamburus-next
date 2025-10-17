// 


import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const footerRef = useRef(null);
  const menuItemsRef = useRef([]);
  const instagramRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline com delay para começar após o header (~1.5s)
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 }, delay: 1.5 });

      gsap.set([menuItemsRef.current, instagramRef.current], { opacity: 0, y: 20 });

      tl.to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.15
      })
      .to(instagramRef.current, {
        opacity: 1,
        y: 0
      }, "-=0.4");
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
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

import styles from './Footer.module.css';
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <nav className={styles.navFooter}>
          <ul className={styles.menuFooter}>
            <li>
              <Link href="">Projetos</Link>
            </li>
            <li>
              <Link href="">Sobre</Link>
            </li>
            <li>
              <Link href="">Contato</Link>
            </li>
          </ul>

          <a
            href="https://instagram.com/storrertamburus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramFooter}
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </a>
          </nav>
        </div>
      </footer>
    );
  }
  
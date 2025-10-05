import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>Storrer Tamburus</div>

        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>
              <Link href="/projetos">Projetos</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>

          <a
            href="https://instagram.com/suaempresa"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
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
    </header>
  );
}

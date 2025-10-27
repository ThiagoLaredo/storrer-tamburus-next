import Head from 'next/head';
import MainLayout from '@/layouts/MainLayout';
import styles from '@/styles/Sobre.module.css';

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre | Storrer Tamburus</title>
      </Head>
      <MainLayout 
        title="Sobre | Storrer Tamburus"
        hideNav={false}
        showFilters={false}
        hideFooter={true}
        theme="light"
      >
        <div className={styles.sobreContainer}>
          <div className={styles.sobreContent}>
            <h1 className={styles.titulo}>Storrer Tamburus</h1>
            <div className={styles.texto}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna
                ultricies tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
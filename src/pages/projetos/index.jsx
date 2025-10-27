

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';

export default function ProjetosIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/projetos/comercial/');
  }, [router]);

  return <Loader />;
}

// 🔥 NÃO exporte getStaticProps ou getStaticPaths aqui
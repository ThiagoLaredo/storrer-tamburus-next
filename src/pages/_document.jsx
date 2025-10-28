// pages/_document.js - se já existe
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR"> {/* 🔥 APENAS ADICIONE ESTE ATRIBUTO */}
      <Head>
        {/* Seu conteúdo existente */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
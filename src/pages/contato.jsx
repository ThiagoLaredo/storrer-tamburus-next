import Head from 'next/head';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styles from '@/styles/Contato.module.css';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Dados do formulário:', formData);
    // Limpar formulário após envio
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: ''
    });
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <>
      <Head>
        <title>Contato | Storrer Tamburus</title>
      </Head>
      <MainLayout 
        title="Contato | Storrer Tamburus"
        hideNav={false}
        showFilters={false}
        hideFooter={true}
        theme="light" // 🔥 TEMA CLARO
      >
        <div className={styles.contatoContainer}>
          <div className={styles.contatoContent}>
            {/* Informações de Contato - Lado Esquerdo (1/3) */}
            <div className={styles.contatoInfo}>
              <h2>Contato</h2>
              <div className={styles.contatoItem}>
                <h3>Telefone</h3>
                <p>(11) 99999-9999</p>
              </div>
              <div className={styles.contatoItem}>
                <h3>Email</h3>
                <p>contato@storrertamburus.com</p>
              </div>
            </div>

            {/* Formulário - Lado Direito (2/3) */}
            <form className={styles.contatoForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="nome">Nome</label>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="telefone">Telefone</label>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="assunto">Assunto</label>
              </div>

              <button type="submit" className={styles.submitButton}>
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
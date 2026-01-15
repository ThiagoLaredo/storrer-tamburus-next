import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styles from '@/styles/Contato.module.css';
import { gsap } from 'gsap';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', assunto: ''
  });

  // 🔥 REFS PARA ANIMAÇÃO (mantidas do seu código)
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const infoItemsRef = useRef([]);
  const formGroupsRef = useRef([]);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.3 });
      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        .fromTo(infoRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.2")
        .fromTo(infoItemsRef.current.filter(Boolean), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, "-=0.4")
        .fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.5")
        .fromTo(formGroupsRef.current.filter(Boolean), { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .fromTo(submitButtonRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    setFormData({ nome: '', email: '', telefone: '', assunto: '' });
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <MainLayout 
      title="Contato | Storrer Tamburus - Arquitetura e Design"
      description="Entre em contato com a Storrer Tamburus. Telefone (11) 99999-9999, email contato@storrertamburus.com. Solicite orçamento para seu projeto de arquitetura."
      keywords="contato Storrer Tamburus, orçamento arquitetura, projeto arquitetônico, arquiteto São Paulo, design de interiores"
      theme="light"
      hideFooter={true}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Página de Contato - Storrer Tamburus",
        "description": "Entre em contato com a Storrer Tamburus para orçamentos e informações sobre projetos de arquitetura.",
        "url": "https://storrertamburus.com.br/contato",
        "mainEntity": {
          "@type": "Organization",
          "name": "Storrer Tamburus",
          "email": "contato@storrertamburus.com",
          "telephone": "+55-11-99999-9999"
        }
      }}
    >
      <div ref={containerRef} className={styles.contatoContainer}>
        <div className={styles.contatoContent}>
          <div ref={infoRef} className={styles.contatoInfo}>
            <h2>Contato</h2>
            <div ref={el => infoItemsRef.current[0] = el} className={styles.contatoItem}>
              <h3>Telefone</h3>
              <p>(11) 99999-9999</p>
            </div>
            <div ref={el => infoItemsRef.current[1] = el} className={styles.contatoItem}>
              <h3>E-mail</h3>
              <p>contato@storrertamburus.com</p>
            </div>
          </div>

          <form ref={formRef} className={styles.contatoForm} onSubmit={handleSubmit}>
            <div ref={el => formGroupsRef.current[0] = el} className={styles.formGroup}>
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder=" " required />
              <label htmlFor="nome">Nome</label>
            </div>
            <div ref={el => formGroupsRef.current[1] = el} className={styles.formGroup}>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required />
              <label htmlFor="email">Email</label>
            </div>
            <div ref={el => formGroupsRef.current[2] = el} className={styles.formGroup}>
              <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder=" " required />
              <label htmlFor="telefone">Telefone</label>
            </div>
            <div ref={el => formGroupsRef.current[3] = el} className={styles.formGroup}>
              <input type="text" id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} placeholder=" " required />
              <label htmlFor="assunto">Assunto</label>
            </div>
            <button ref={submitButtonRef} type="submit" className={styles.submitButton}>
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
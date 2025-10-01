import MainLayout from "../layouts/MainLayout";

export default function Contato() {
  return (
    <MainLayout>
      <section className="p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contato</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Nome" className="border p-2 rounded" />
          <input type="email" placeholder="E-mail" className="border p-2 rounded" />
          <textarea placeholder="Mensagem" className="border p-2 rounded" rows={5} />
          <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
            Enviar
          </button>
        </form>
      </section>
    </MainLayout>
  );
}

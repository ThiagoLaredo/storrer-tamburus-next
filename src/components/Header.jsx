import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl font-bold">Storrer Tamburus</h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/projetos">Projetos</Link>
        <Link href="/contato">Contato</Link>
      </nav>
    </header>
  );
}

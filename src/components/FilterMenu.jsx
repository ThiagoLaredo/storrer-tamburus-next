export default function FilterMenu({ setFilter }) {
    return (
      <div className="flex justify-center gap-4 my-4">
        {["todos", "residenciais", "comercial", "corporativo"].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
  
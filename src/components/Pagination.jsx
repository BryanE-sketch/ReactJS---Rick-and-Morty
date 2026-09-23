function Pagination({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="bg-gray-800 px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700"
      >
        Anterior
      </button>

      <span className="text-gray-300">
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="bg-gray-800 px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
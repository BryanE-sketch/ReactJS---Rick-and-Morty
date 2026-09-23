function SearchBar({ busqueda, onBusquedaChange, estado, onEstadoChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Buscar personaje por nombre..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md flex-1 outline-none focus:ring-2 focus:ring-green-500"
      />

      <select
        value={estado}
        onChange={(e) => onEstadoChange(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Todos los estados</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
    </div>
  );
}

export default SearchBar;
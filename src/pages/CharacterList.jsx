import { useState, useEffect } from 'react';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';

function CharacterList() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [intento, setIntento] = useState(0);

  const busquedaConRetraso = useDebounce(busqueda, 500);

  useEffect(() => {
    setPagina(1);
  }, [busquedaConRetraso, estado]);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarPersonajes() {
      try {
        setCargando(true);
        setError(null);
        const datos = await getCharacters({
          page: pagina,
          name: busquedaConRetraso,
          status: estado,
          signal: controlador.signal,
        });
        setPersonajes(datos.results);
        const paginasDisponibles = datos.info?.pages || 1;
        setTotalPaginas(Math.min(paginasDisponibles, 10));
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setPersonajes([]);
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarPersonajes();

    return () => controlador.abort();
  }, [busquedaConRetraso, estado, pagina, intento]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Personajes</h1>

      <SearchBar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        estado={estado}
        onEstadoChange={setEstado}
      />

      {cargando && <p>Cargando personajes...</p>}

      {error && (
        <div className="text-red-500">
          <p>Error: {error}</p>
          <button
            onClick={() => setIntento((n) => n + 1)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && personajes.length === 0 && (
        <p className="text-gray-400">No se encontraron personajes con esos criterios.</p>
      )}

      {!cargando && !error && personajes.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {personajes.map((personaje) => (
              <CharacterCard key={personaje.id} personaje={personaje} />
            ))}
          </div>

          <Pagination
            paginaActual={pagina}
            totalPaginas={totalPaginas}
            onCambiarPagina={setPagina}
          />
        </>
      )}
    </div>
  );
}

export default CharacterList;
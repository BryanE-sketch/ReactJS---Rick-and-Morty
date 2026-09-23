import { useState, useEffect } from 'react';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';

function CharacterList() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState('');
  const busquedaConRetraso = useDebounce(busqueda, 500);

  useEffect(() => {
    async function cargarPersonajes() {
      try {
        setCargando(true);
        setError(null);
        const datos = await getCharacters({
          name: busquedaConRetraso,
          status: estado,
        });
        setPersonajes(datos.results);
      } catch (err) {
        setError(err.message);
        setPersonajes([]);
      } finally {
        setCargando(false);
      }
    }

    cargarPersonajes();
  }, [busquedaConRetraso, estado]);

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
      {error && <p className="text-red-500">Error: {error}</p>}

      {!cargando && !error && personajes.length === 0 && (
        <p className="text-gray-400">No se encontraron personajes con esos criterios.</p>
      )}

      {!cargando && !error && personajes.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {personajes.map((personaje) => (
            <CharacterCard key={personaje.id} personaje={personaje} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
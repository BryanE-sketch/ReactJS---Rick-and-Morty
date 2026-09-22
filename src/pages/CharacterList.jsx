import { useState, useEffect } from 'react';
import { getCharacters } from '../services/api';

function CharacterList() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarPersonajes() {
      try {
        setCargando(true);
        setError(null);
        const datos = await getCharacters();
        setPersonajes(datos.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarPersonajes();
  }, []);

  if (cargando) return <p className="p-6">Cargando personajes...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Personajes</h1>
      <ul>
        {personajes.map((personaje) => (
          <li key={personaje.id}>{personaje.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
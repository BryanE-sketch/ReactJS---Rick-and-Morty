import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById, getEpisodesByUrls } from '../services/api';

const colorPorEstado = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

function CharacterDetail() {
  const { id } = useParams();

  const [personaje, setPersonaje] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDetalle() {
      try {
        setCargando(true);
        setError(null);

        const datosPersonaje = await getCharacterById(id);
        setPersonaje(datosPersonaje);

        const datosEpisodios = await getEpisodesByUrls(datosPersonaje.episode);
        setEpisodios(datosEpisodios);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();
  }, [id]);

  if (cargando) return <p className="p-6">Cargando personaje...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!personaje) return null;

  const colorEstado = colorPorEstado[personaje.status] || colorPorEstado.unknown;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-green-400 hover:underline">
        ← Volver al listado
      </Link>

      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <img
          src={personaje.image}
          alt={personaje.name}
          className="w-full sm:w-64 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{personaje.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <span className={`w-3 h-3 rounded-full ${colorEstado}`}></span>
            <span>
              {personaje.status} - {personaje.species}
            </span>
          </div>

          <div className="mt-4 space-y-1 text-gray-300">
            <p>
              <span className="font-bold text-white">Género:</span> {personaje.gender}
            </p>
            <p>
              <span className="font-bold text-white">Origen:</span>{' '}
              {personaje.origin.name}
            </p>
            <p>
              <span className="font-bold text-white">Última ubicación:</span>{' '}
              {personaje.location.name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">
          Episodios en los que aparece ({episodios.length})
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {episodios.map((episodio) => (
            <li key={episodio.id} className="bg-gray-800 p-3 rounded-md">
              <p className="font-bold">{episodio.name}</p>
              <p className="text-sm text-gray-400">
                {episodio.episode} - {episodio.air_date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
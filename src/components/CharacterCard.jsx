import { Link } from 'react-router-dom';

const colorPorEstado = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

function CharacterCard({ personaje }) {
  const colorEstado = colorPorEstado[personaje.status] || colorPorEstado.unknown;

  return (
    <Link
      to={`/personaje/${personaje.id}`}
      className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform block"
    >
      <img
        src={personaje.image}
        alt={personaje.name}
        className="w-full aspect-square object-cover"
      />
      <div className="p-3">
        <h2 className="font-bold truncate">{personaje.name}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
          <span className={`w-2 h-2 rounded-full ${colorEstado}`}></span>
          <span>
            {personaje.status} - {personaje.species}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
import { useFavorites } from '../context/FavoritesContext';
import CharacterCard from '../components/CharacterCard';

function Favorites() {
  const { favoritos } = useFavorites();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="text-gray-400">Aún no has marcado ningún personaje como favorito.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoritos.map((personaje) => (
            <CharacterCard key={personaje.id} personaje={personaje} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
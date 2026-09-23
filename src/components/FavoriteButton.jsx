function FavoriteButton({ favorito, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
        favorito
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      } ${className}`}
    >
      {favorito ? 'Remover de favoritos' : 'Añadir a favoritos'}
    </button>
  );
}

export default FavoriteButton;
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const CLAVE_STORAGE = 'favoritos';

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem(CLAVE_STORAGE);
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(favoritos));
  }, [favoritos]);

  function esFavorito(id) {
    return favoritos.some((personaje) => personaje.id === id);
  }

  function toggleFavorito(personaje) {
    setFavoritos((actuales) => {
      if (actuales.some((p) => p.id === personaje.id)) {
        return actuales.filter((p) => p.id !== personaje.id);
      }
      return [...actuales, personaje];
    });
  }

  return (
    <FavoritesContext.Provider value={{ favoritos, esFavorito, toggleFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const contexto = useContext(FavoritesContext);
  if (!contexto) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return contexto;
}
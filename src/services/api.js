const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters({ page = 1, name = '', status = '' } = {}) {
  const params = new URLSearchParams({ page });
  if (name) params.append('name', name);
  if (status) params.append('status', status);

  const respuesta = await fetch(`${BASE_URL}/character?${params.toString()}`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los personajes.');
  }

  return respuesta.json();
}

export async function getCharacterById(id) {
  const respuesta = await fetch(`${BASE_URL}/character/${id}`);

  if (!respuesta.ok) {
    throw new Error('No se pudo obtener el personaje.');
  }

  return respuesta.json();
}

export async function getEpisodesByUrls(urls) {
  if (!urls || urls.length === 0) {
    return [];
  }

  const ids = urls.map((url) => url.split('/').pop()).join(',');
  const respuesta = await fetch(`${BASE_URL}/episode/${ids}`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los episodios.');
  }

  const datos = await respuesta.json();
  return Array.isArray(datos) ? datos : [datos];
}
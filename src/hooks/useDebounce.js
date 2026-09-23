import { useState, useEffect } from 'react';

function useDebounce(valor, delay) {
  const [valorConRetraso, setValorConRetraso] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorConRetraso(valor);
    }, delay);

    return () => clearTimeout(temporizador);
  }, [valor, delay]);

  return valorConRetraso;
}

export default useDebounce;
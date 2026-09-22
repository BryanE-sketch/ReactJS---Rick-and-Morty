import { useParams } from 'react-router-dom';

function CharacterDetail() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Detalle del personaje #{id}</h1>
    </div>
  );
}

export default CharacterDetail;
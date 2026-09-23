function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="p-10 text-center">
      <p className="text-red-500 mb-3">Error: {mensaje}</p>
      {onReintentar && (
        <button
          onClick={onReintentar}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
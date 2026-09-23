function LoadingSpinner({ mensaje = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10">
      <div className="w-10 h-10 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin"></div>
      <p className="text-gray-400">{mensaje}</p>
    </div>
  );
}

export default LoadingSpinner;
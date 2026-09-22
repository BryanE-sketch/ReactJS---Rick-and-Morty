import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex gap-6">
      <Link to="/" className="font-bold hover:text-green-400">
        Rick and Morty Explorer
      </Link>
      <Link to="/favoritos" className="hover:text-green-400">
        Favoritos
      </Link>
    </nav>
  );
}

export default Navbar;
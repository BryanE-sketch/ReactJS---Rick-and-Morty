import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/personaje/:id" element={<CharacterDetail />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
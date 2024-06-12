import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import { SearchProvider } from '@/context/SearchContext';

export default function App() {
  return (
    <SearchProvider>
      <Navbar />
      <Home />
    </SearchProvider>
  );
}
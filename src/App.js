import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import FileUpload from './components/FileUpload';
import { GlobalProvider } from './components/context/GlobalProvider';
import MovieSearch from './components/MovieSearch';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Header />
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/search" element={<MovieSearch />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;

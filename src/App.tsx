import Navbar from './components/Nav/Nav';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from './pages/LandingPage';
import Articles from './pages/Articles';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/articles" element={<ProtectedRoute/>}>
          <Route path="/articles" element={<Articles/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

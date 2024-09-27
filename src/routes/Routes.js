import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Principal from '../pages/Principal';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão para redirecionar para /login */}
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

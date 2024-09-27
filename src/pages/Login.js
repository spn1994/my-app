import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa a função correta
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css' 

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Corrigi a variável para 'navigate'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha); // Atualizado para modular
      navigate('/principal'); // Usando navigate corretamente
    } catch (error) {
      setError('Usuário não encontrado ou senha incorreta.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/cadastro'); // Redireciona para a tela de cadastro
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegisterRedirect}>Não tem cadastro? Cadastre-se aqui</button>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState(''); // Estado para gerenciar a mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Criação do usuário com e-mail e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const { user } = userCredential;

      // Salvar informações adicionais no Firestore
      const userDocRef = doc(firestore, 'usuarios', user.uid);
      await setDoc(userDocRef, {
        nome,
        sobrenome,
        dataNascimento,
        email,
        uid: user.uid
      });

      // Redireciona para a página principal após o cadastro
      navigate('/principal');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // Verifica o código do erro e atualiza a mensagem de erro
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErro('Este e-mail já está em uso. Tente um e-mail diferente.');
          break;
        case 'auth/invalid-email':
          setErro('E-mail inválido. Por favor, insira um e-mail válido.');
          break;
        case 'auth/weak-password':
          setErro('A senha deve ter pelo menos 6 caracteres.');
          break;
        default:
          setErro(`Erro ao cadastrar: ${error.message}`);
          break;
      }
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
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
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Sobrenome" 
          value={sobrenome} 
          onChange={e => setSobrenome(e.target.value)} 
          required 
        />
        <label htmlFor="dataNascimento">Data de Nascimento:</label>
        <input 
          type="date" 
          placeholder="Data de Nascimento" 
          value={dataNascimento} 
          onChange={e => setDataNascimento(e.target.value)} 
          required 
        />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <p>
        Já tem cadastro? 
        <button onClick={() => navigate('/login')}>Clique aqui para login</button>
      </p>
    </div>
  );
}

export default Cadastro;

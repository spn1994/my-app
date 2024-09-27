import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'; 
import { firestore } from '../firebaseConfig';
import { signOut } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/Principal.css';  

function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, 'usuarios', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('Documento não encontrado');
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div>
      <h2>Bem-vindo</h2>
      {userData ? (
        <div>
          <p>Nome: {userData.nome}</p>
          <p>Sobrenome: {userData.sobrenome}</p>
          <p>Data de Nascimento: {userData.dataNascimento}</p>
          <button onClick={handleLogout}>Sair</button> 
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Principal;

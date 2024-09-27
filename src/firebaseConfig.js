import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXSZEcY1TERFJLHLSQS2k3GC0lg6qQFJc",
    authDomain: "react-app-17501.firebaseapp.com",
    projectId: "react-app-17501",
    storageBucket: "react-app-17501.appspot.com",
    messagingSenderId: "667134493529",
    appId: "1:667134493529:web:c80d7d6010f1aa53cc4248"
};

// Inicializar o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializando os serviços de autenticação e Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Exportando os serviços para uso em outros arquivos
export { auth, firestore };

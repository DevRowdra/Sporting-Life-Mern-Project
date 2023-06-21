import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../../firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const [photo, setPhoto] = useState('');
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');

    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token');

    return signOut(auth);
  };
  const loginWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser?.email) {
        axios
          .post('https://assignment-server-site-gold.vercel.app/jwt', {
            email: currentUser?.email,
          })
          .then((data) => {
            console.log(data.data.token);

            localStorage.setItem('access-token', data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    photo,
    setPhoto,
    updateUserProfile,
    loginWithGoogle,
    logOut,
    logIn,
    setTheme,
    theme,
    handleToggle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

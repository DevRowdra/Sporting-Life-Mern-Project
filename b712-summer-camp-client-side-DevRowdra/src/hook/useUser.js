import axios from 'axios';
import { useEffect, useState } from 'react';

export const userData = (user) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`https://assignment-server-site-gold.vercel.app/user/${user?.email}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);
  return users;
};

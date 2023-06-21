import { useQuery } from 'react-query';

import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user?.email);
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    // problem
    queryKey: ['isAdmin', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://assignment-server-site-gold.vercel.app/user/admin/${user?.email}`
      );
      return res.data.admin;
      console.log(res.data);
    },
  });
  // console.log(res)
  return [isAdmin, isAdminLoading];
};
export default useAdmin;

import { useQuery } from 'react-query';

import { useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useStudent = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user?.email);
  const { data: isStudent, isLoading: isStudentLoading } = useQuery({
    // problem
    queryKey: ['isStudent', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://assignment-server-site-gold.vercel.app/user/student/${user?.email}`
      );
      console.log(res.data);
      return res.data.student;
    },
  });
  // console.log(res)
  return [isStudent, isStudentLoading];
};
export default useStudent;

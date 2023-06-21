// useInstructor
import { useQuery } from 'react-query';

import { useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user?.email);
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    // problem
    queryKey: ['isInstructor', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://assignment-server-site-gold.vercel.app/user/instructor/${user?.email}`
      );
      return res.data.instructor;
      console.log(res.data);
    },
  });
  // console.log(res)
  return [isInstructor, isInstructorLoading];
};
export default useInstructor;

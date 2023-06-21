import { createBrowserRouter } from 'react-router-dom';
import Main from '../Pages/Main/Main';
import Login from '../Shared/Login/Login';
import SingUp from '../Shared/SingUp/SingUp';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Component/Home/Home';
import InstructorsPage from '../Pages/InstructorsPage/InstructorsPage';
import ClassesPage from '../Pages/ClassesPage/ClassesPage';
import DashboardPage from '../Pages/Dashboard/DashboardPage';
import PrivateRoute from '../AuthProvider/PrivateRoute/PrivateRoute';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses';
import AddAClass from '../Pages/Dashboard/Instructors/AddAClass';
import MyClasses from '../Pages/Dashboard/Instructors/MyClasses';
import AddFeedBack from '../Pages/Dashboard/Admin/AddFeedBack';
import AdminDashboardHome from '../Pages/Dashboard/AdminDashboardHome';
import MySelectedCl from '../Pages/Dashboard/Student/MySelectedCl';
import MyEnrolled from '../Pages/Dashboard/Student/MyEnrolled';
import Payment from '../Pages/Dashboard/Student/Payment';
import StudentPrivateRoute from '../AuthProvider/PrivateRoute/StudentPrivateRoute';
import AdminPrivateRoute from '../AuthProvider/PrivateRoute/AdminPrivateRoute';
import InstructorPrivateRoute from '../AuthProvider/PrivateRoute/InstructorPrivateRoute';
import PaymentHistory from '../Pages/Dashboard/Student/PaymentHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/singup',
        element: <SingUp></SingUp>,
      },
      {
        path: '/classes',
        element: (
          <>
            <ClassesPage></ClassesPage>
          </>
        ),
      },
      {
        path: '/instructors',
        element: <InstructorsPage></InstructorsPage>,
      },
    ],
  },
  {
    path: '/dashboard',

    element: <DashboardPage></DashboardPage>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <AdminDashboardHome></AdminDashboardHome>,
      },
      {
        path: '/dashboard/manageuser',
        element: (
          <AdminPrivateRoute>
            <ManageUsers></ManageUsers>
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/dashboard/manageclasses',
        element: (
          <AdminPrivateRoute>
            <ManageClasses></ManageClasses>
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/dashboard/addaclass',
        element: (
          <InstructorPrivateRoute>
            <AddAClass></AddAClass>
          </InstructorPrivateRoute>
        ),
      },
      {
        path: '/dashboard/myclass',
        element: (
          <InstructorPrivateRoute>
            <MyClasses></MyClasses>
          </InstructorPrivateRoute>
        ),
      },
      {
        path: '/dashboard/addfeedback/:id',
        element: <AddFeedBack></AddFeedBack>,
        loader: ({ params }) =>
          fetch(
            `https://assignment-server-site-gold.vercel.app/class/${params.id}`
          ),
      },
      {
        path: '/dashboard/myselectedclass',
        element: (
          <StudentPrivateRoute>
            <MySelectedCl></MySelectedCl>
          </StudentPrivateRoute>
        ),
      },
      {
        path: '/dashboard/paymenthistory',
        element: (
          <StudentPrivateRoute>
            {' '}
            <PaymentHistory></PaymentHistory>{' '}
          </StudentPrivateRoute>
        ),
      },
      {
        path: '/dashboard/myenrolledclass',
        element: (
          <StudentPrivateRoute>
            <MyEnrolled></MyEnrolled>
          </StudentPrivateRoute>
        ),
      },
      ,
      {
        path: '/dashboard/studentpay/:id',
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://assignment-server-site-gold.vercel.app/paymentone/${params.id}`
          ),
      },
    ],
  },
]);
export default router;

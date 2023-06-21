
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const Main = () => {
    const{user,theme}=useContext(AuthContext)
    return (
        <div className={theme === 'dark' ? 'dark' : ''} >
        <div  className={`${theme === 'dark' ? 'text-white' : 'text-black'} overflow-hidden container mx-auto`}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
        </div>
    );
};

export default Main;
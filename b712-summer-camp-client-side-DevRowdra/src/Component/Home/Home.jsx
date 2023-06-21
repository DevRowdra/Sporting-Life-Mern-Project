import React, { useContext } from 'react';
import Slider from '../Slider/Slider';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import OurWork from '../OurWork/OurWork';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Home = () => {
    const{theme}=useContext(AuthContext)
    return (

        <div >
            <div>
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <OurWork></OurWork>

            </div>
        </div>
    );
};

export default Home;
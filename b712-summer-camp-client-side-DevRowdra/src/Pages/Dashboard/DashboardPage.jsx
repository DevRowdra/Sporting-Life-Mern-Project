import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from './DashboardNav/DashboardNav';

const DashboardPage = () => {
    return (
        <div>
            <DashboardNav></DashboardNav>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardPage;
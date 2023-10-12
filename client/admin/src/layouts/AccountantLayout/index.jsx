import React from 'react';
import SideNav2 from '../../components/SideNav/index2';
import Header from '../../components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';

const AccountantLayout = () => {
    return (
        <>
            <div className='flex sticky top-0 left-0'>
                <SideNav2 />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountantLayout;

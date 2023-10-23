import React from 'react';
import SideNav1 from '../../components/SideNav/index1';
import Header from '../../components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import ViewPurchaseRequisitionSenior from './ViewPurchaseRequisition';

const SeniorLayout = () => {
    return (
        <>
            <div className='flex sticky top-0 left-0'>
                <SideNav1 />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll'>
                        <Outlet />
                        <Routes>
                        <Route path='view-requisition' element={<ViewPurchaseRequisitionSenior />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeniorLayout;

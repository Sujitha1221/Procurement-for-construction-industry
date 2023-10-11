import React from 'react';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import ViewPurchaseRequisition from './ViewPurchaseRequisition';

const PurchaseRequisitionLayout = () => {
    return (
        <>
            <div className='flex sticky top-0 left-0'>
                <SideNav />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll pt-20'>
                        <Outlet />
                        <Routes>
                            <Route>
                                <Route path='view-requisition' element={<ViewPurchaseRequisition />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseRequisitionLayout;

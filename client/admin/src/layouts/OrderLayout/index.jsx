import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';
import ViewOrder from './ViewOrder';
import AddOrder from './AddOrder';

const DeliveryDriverLayout = () => {
    return (
        <>
            <div className='flex sticky top-0 left-0'>
                <SideNav />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll h-full pt-20 bg-neutral-100'>
                        <Outlet />
                        <Routes>
                            <Route>
                                <Route path='view-order' element={<ViewOrder />} />
                                <Route path='add-order' element={<AddOrder />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeliveryDriverLayout;

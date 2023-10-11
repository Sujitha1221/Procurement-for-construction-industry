import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faChartSimple, faDriversLicense, faTruck, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

const SideNav = () => {

    const [activePage, setActivePage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation().pathname;

    useEffect(() => {
        setActivePage(location);
    }, [location])

    const handleMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    const adminNavigation = [
        {
            name: "Dashboard",
            icon: faChartSimple,
            link: "/"
        },

        {
            name: "User Management",
            icon: faUsers,
            link: "/users"
        },

        {
            name: 'Product Management',
            icon: faCartShopping,
            link: '/products'
        }, 

        {
            name: 'Purchase Requisition',
            icon: faTruck,
            link: '/purchaseRequisition/view-requisition'
        },

        {
            name: 'Order',
            icon: faUsers,
            link: '/order/view-order'
        }
    ]

    return (
        <>
            <div className={`h-screen sticky top-0 left-0 bg-gradient-to-t from-white to-white w-fit ${isOpen ? 'absolute md:fixed' : ''}`}>
                <div className='px-[20px] h-[64px] uppercase text-white font-bold text-xl w-full flex justify-center items-center gap-[20px]'>
                    <div className={`md:flex text-center ${isOpen ? 'block' : 'hidden'}`}>
                        Admin Panel
                    </div>
                    <div className='text-2xl flex md:hidden hover:text-cyan-900'>
                        <button onClick={() => {handleMenu()}}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </div>
                <div className='grid' style={{marginTop:100}}>
                    {adminNavigation && adminNavigation.length ? adminNavigation.map((item) => (
                        <Link key={item.link} to={item.link}>
                            <div className={`px-[20px] py-[10px] w-full flex items-center gap-[10px] border border-transparent hover:bg-yellow-300 ${item.link == activePage ? 'bg-yellow-300 border border-r-yellow-500 border-4' : ''}`}>
                                <div className='text-black w-[24px]'>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <div className={`text-black md:flex ${isOpen ? 'flex' : 'hidden'}`}>
                                    {item.name}
                                </div>
                            </div>
                        </Link>
                    )):(
                        <></>
                    )}
                </div>
                <div className="flex justify-center" style={{marginTop:50}}>
                    <button className="w-[200px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold  py-2 px-4 rounded-lg">
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}

export default SideNav;

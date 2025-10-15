import { Bars3CenterLeftIcon, ArrowRightOnRectangleIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import useAsideStore from '../store/asidestore';
import { useAuth } from '../context/AuthContext';
import { LOGIN, PROFILE } from '../routes';

export default function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false);
  const { setOpenaside } = useAsideStore();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
      navigate(LOGIN);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      ADMIN: { bg: "bg-red-100", text: "text-red-800", label: "Admin" },
      PROFESSOR: { bg: "bg-blue-100", text: "text-blue-800", label: "Professeur" },
      STAFF: { bg: "bg-green-100", text: "text-green-800", label: "Personnel" },
    };
    const badge = badges[role] || badges.STAFF;
    return (
      <span className={`${badge.bg} ${badge.text} text-xs px-2 py-1 rounded-full font-medium`}>
        {badge.label}
      </span>
    );
  };

    return (
        <React.Fragment>
            <div className="sticky z-10 top-0 h-16 border-b bg-white flex shadow-sm">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container w-full">
                    <div className='flex items-center gap-2'>
                        <button onClick={setOpenaside} className="w-12 h-16 border-r lg:hidden">
                            <Bars3CenterLeftIcon className='size-6' />
                        </button>
                    </div>
                    
                    <div className='flex items-center gap-4'>
                        {user && (
                            <div className='relative'>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className='flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition'
                                >
                                    <UserCircleIcon className='size-8 text-indigo-500' />
                                    <div className='hidden md:block text-left'>
                                        <div className='text-sm font-semibold text-gray-800'>{user.name}</div>
                                        <div className='text-xs text-gray-500'>{user.email}</div>
                                    </div>
                                    {getRoleBadge(user.role)}
                                    <ChevronDownIcon className='size-4 text-gray-500' />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                                        <div className='px-4 py-2 border-b border-gray-200'>
                                            <div className='text-sm font-semibold text-gray-800'>{user.name}</div>
                                            <div className='text-xs text-gray-500'>{user.email}</div>
                                        </div>
                                        <Link
                                            to={PROFILE}
                                            onClick={() => setShowDropdown(false)}
                                            className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition'
                                        >
                                            <UserCircleIcon className='size-5' />
                                            Mon Profil
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setShowDropdown(false);
                                                handleLogout();
                                            }}
                                            className='flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full text-left'
                                        >
                                            <ArrowRightOnRectangleIcon className='size-5' />
                                            Déconnexion
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

NavBar.propTypes = {
    setOpenaside: PropTypes.func.isRequired,
}

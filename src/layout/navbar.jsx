import { Bars3CenterLeftIcon } from '@heroicons/react/16/solid'
import React from 'react'
import PropTypes from 'prop-types';
import useAsideStore from '../store/asidestore';

export default function NavBar() {
    
  const { setOpenaside } = useAsideStore();

    return (
        <React.Fragment>
            <div className="sticky z-10 top-0 h-16 border-b bg-white flex">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                    <div className='flex items-center gap-2'>
                        <button onClick={setOpenaside} className="w-12 h-16 border-r lg:hidden">
                            <Bars3CenterLeftIcon className='size-6' />
                        </button>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

NavBar.propTypes = {
    setOpenaside: PropTypes.func.isRequired,
}

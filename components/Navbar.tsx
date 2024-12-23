import { useContext } from 'react';

import Logo from './icons/Logo';
import { AppContext } from '@/context/AppContext';

const Navbar = () => {
  const { updateAppModal } = useContext(AppContext);

  return (
    <nav className='flex justify-between bg-white shadow-lg items-center h-10 py-10 px-6  sticky top-0 z-10 xl:z-0'>
      <div className='cursor-pointer' title='Logo'>
        <Logo />
      </div>
      <h1 className='text-3xl text-primary'>Zoznam úloh</h1>
      <button
        className='p-1 px-4 bg-primary text-white rounded'
        title='Pridať úlohu'
        onClick={() => updateAppModal('addTask')}
      >
        Pridať úlohu
      </button>
    </nav>
  );
};
export default Navbar;

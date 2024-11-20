const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-10 py-10 px-6 bg-white sticky top-0 z-10 xl:z-0'>
      <div>logo</div>
      <h1 className='text-3xl'>Zoznam úloh</h1>
      <button
        className='p-1 px-4 bg-violet-600 rounded-sm text-white'
        title='Pridať úlohu'
      >
        Pridať úlohu
      </button>
    </nav>
  );
};
export default Navbar;

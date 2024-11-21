import { useContext } from 'react';
import PaginationBtn from './PaginationBtn';
import { AppContext } from '@/app/context/AppContext';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Pagination = () => {
  const router = useRouter();
  const {
    pagination: { currentPage, setCurrentPage, totalPages },
  } = useContext(AppContext);
  const queryClient = useQueryClient();

  if (totalPages === 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePagination = (page: number) => {
    router.push(`/?page=${page}`);
    setCurrentPage({ currentPage: page });

    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  return (
    <div className='h-12 flex justify-center items-center flex-wrap gap-x-3'>
      {pageNumbers.map((page) => {
        return (
          <PaginationBtn
            key={page}
            pageNum={page}
            className={
              page === currentPage ? 'text-white bg-primary' : 'text-primary'
            }
            onClick={() => handlePagination(page)}
          />
        );
      })}
    </div>
  );
};
export default Pagination;

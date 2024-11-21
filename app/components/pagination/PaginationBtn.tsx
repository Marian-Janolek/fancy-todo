interface IPaginationBtn {
  pageNum: number;
  onClick: () => void;
  className: string;
}

const PaginationBtn = ({ pageNum, className, onClick }: IPaginationBtn) => {
  return (
    <button
      className={`border-2 border-primary rounded h-8 w-8 font-bold 
     text-center text-xl hover:bg-primary hover:text-white transition-all duration-300 ${className}`}
      onClick={onClick}
      title={`Strana ${pageNum}`}
    >
      {pageNum}
    </button>
  );
};

//
export default PaginationBtn;

import { DOTS, usePagination } from "@/hooks";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface IPaginationProps {
  onPageChange: (arg: number) => void;
  dataCount: number;
  currentPage: number;
  dataSize: number;
  siblingCount: number;
}

function Pagination({ onPageChange, dataCount, siblingCount, currentPage, dataSize }: IPaginationProps) {
  const paginationRange = usePagination({
    dataCount,
    currentPage,
    siblingCount,
    dataSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex justify-start items-center ">
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className={`
          cursor-pointer w-[40px] h-[40px] border flex justify-center
          items-center bg-white rounded mr-6 disabled:opacity-30 disabled:cursor-not-allowed
        `}
      >
        <RiArrowLeftSLine className={`text-2xl`} />
      </button>
      {paginationRange?.map((page, index) => {
        if (page === DOTS) {
          return (
            <span key="index" className={`mr-6`}>
              &#8230;
            </span>
          );
        }

        return (
          <span
            key={index}
            className={`
                cursor-pointer w-[40px] h-[36px] flex justify-center items-center  rounded mr-6
                ${currentPage == page ? `bg-grey-900 text-white` : `bg-transparent`}
              `}
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        );
      })}
      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className={`
          cursor-pointer w-[40px] h-[40px] border flex justify-center items-center bg-white rounded
          disabled:opacity-30 disabled:cursor-not-allowed
        `}
      >
        <RiArrowRightSLine className={`text-2xl`} />
      </button>
    </div>
  );
}

export default Pagination;

import React from "react"

const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {
    
    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className="">
            <ul className="pagination mr-auto ml-auto">
                <li className={"page-item" +(currentPage === 1 && " disabled")}>
                    <button 
                        className="page-link"
                        onClick={() => onPageChanged(currentPage - 1)}
                    >&laquo;</button>
                </li>
                {pages.map(page => (
                    <li 
                        key={page} 
                        className={"page-item" + (currentPage === page && " active") }
                    >
                        <button 
                            className="page-link"
                            onClick={() => onPageChanged(page)}
                        >
                        {page}
                        </button>
                    </li>
                ))}
                <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                    <button 
                        className="page-link"
                        onClick={() => onPageChanged(currentPage + 1)}
                    >&raquo;</button>
                </li>
            </ul>
        </div>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;

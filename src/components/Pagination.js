import React from 'react'

export const Pagination = ({setPages , totalPage , page}) => {
  return (
    <div className='Pagination'>
        { 
            <button disabled={page == 1} onClick={() => setPages(page - 1)} >
                Prev
            </button>
        }
        {
            [...Array(totalPage)].map((_,index) => (
             <button
             key={index}
             onClick={() => setPages(index + 1)}
             className={page === index + 1 ? "active" : ""}
             >
              {index + 1}
             </button>
            ))
        }
        {
             <button disabled={page == totalPage} onClick={ () => setPages(page + 1)} >
                Next
            </button>
        }
    </div>
  )
}

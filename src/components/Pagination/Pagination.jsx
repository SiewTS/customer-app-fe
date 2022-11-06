import React from 'react'
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import {Input} from '@chakra-ui/react'
import "./Pagination.css"
import { useCalculatePage } from "../../hooks/useCalculatePage"


const Pagination = ({totalAmount,amountPerPage,nextPage,prevPage,currentPage,paginate}) => {

    const totalPage = useCalculatePage({totalAmount: totalAmount , amountPerPage: amountPerPage})

    const handlePrevPage = () => {
      prevPage()
    }

    const handleNextPage = () => {
      nextPage();
    }

    const handlePaginate = (event) => {
      const pageNumber = event.target.value
      paginate(Number(pageNumber),totalPage);
    }

  return (
    <div className='pagination-container'>
        <span className='mr-10'>Page : </span>
        <Input value={currentPage} type="text" className='pagination-input mr-10' onChange={handlePaginate}/>
        <span className='mr-10'>/ {totalPage}</span>
        <ArrowBackIcon className='mr-10 btn' onClick={handlePrevPage}/>
        <ArrowForwardIcon className='btn' onClick={handleNextPage}/>
    </div>
  )
}

export default Pagination
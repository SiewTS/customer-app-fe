import React, { useEffect, useState, useMemo } from "react"
import Layout from "../../components/Layout/Layout"
import Table from "../../components/Table/Table"
import CustomModal from "../../components/Modal/Modal"
import { Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react"
import { fetchCustomers, deleteCustomer } from "../../api"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import Pagination from "../../components/Pagination/Pagination"

const CustomersPage = () => {
    const initialStatValue = {
        totalOverdue: 0,
        totalIncome: 0,
    }
    const navigate = useNavigate()
    const ROW_PER_PAGE = 10
    
    const [customersList, setCustomersList] = useState([])
    const [statValue, setStatValue] = useState(initialStatValue)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [customerToDelete, setCustomerToDelete] = useState()
    const [currentPage,setCurrentPage] = useState(1)

    const indexOfLastCustomer = currentPage * ROW_PER_PAGE
    const indexOfFirstCustomer = indexOfLastCustomer - ROW_PER_PAGE
    const currentCustomers = customersList.length >=1 && customersList.slice(indexOfFirstCustomer, indexOfLastCustomer)

    useEffect(() => {
        handleFetchCustomers()
    }, [])

    useMemo(() => {
        if (customersList) {
            let totalEarning = 0
            let totalCollection = 0

            customersList.map(customer => {
                totalEarning += parseFloat(customer.amountOverdue)
                totalCollection += parseFloat(customer.amountPaid)
            })

            setStatValue({
                totalOverdue: totalEarning.toFixed(2),
                totalIncome: totalCollection.toFixed(2),
            })
        }
    }, [customersList])

    const handleFetchCustomers = async () => {
        const response = await fetchCustomers()
        const data = response.data.map(dataObj => {
            return {
                ...dataObj,
                amountOverdue: parseFloat(dataObj.amountOverdue).toFixed(2),
                amountPaid: parseFloat(dataObj.amountPaid).toFixed(2),
                age:
                    moment(new Date()).format("YYYY") -
                    moment(dataObj.age).format("YYYY"),
            }
        })
        setCustomersList(data)
    }

    const handleEditCustomer = customer => {
        const custId = customer._id
        navigate(`/customer/${custId}/edit`, { replace: true })
    }

    const handleViewCustomer = customer => {
        const custId = customer._id
        navigate(`/customer/${custId}/view`, { replace: true })
    }

    const handleDeleteCustomer = async () => {
        const response = await deleteCustomer(customerToDelete)
        if (!response) return
        setIsModalOpen(false)
        handleFetchCustomers()
    }

    const handleDeleteConfirmation = customer => {
        const custId = customer._id
        setIsModalOpen(true)
        setCustomerToDelete(custId)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handlePrevPage = () => {
        if(currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if(currentPage >= 1 && currentPage < customersList.length / ROW_PER_PAGE )
            setCurrentPage(currentPage + 1);
    };

    const handlePaginate = (pageNum) => {
        setCurrentPage(pageNum)
    }

    return (
        <div>
            <Layout title="Customers" haveRegisterBtn={true}>
                <div className="mb-10 flex">
                    <div className="mr-10 stat-box sales-box">
                        <Stat>
                            <StatLabel>Total Sales</StatLabel>
                            <StatNumber>RM {statValue.totalOverdue}</StatNumber>
                        </Stat>
                    </div>
                    <div className="mr-10 stat-box earning-box">
                        <Stat>
                            <StatLabel>Total Earnings</StatLabel>
                            <StatNumber>RM {statValue.totalIncome}</StatNumber>
                        </Stat>
                    </div>
                    <div className="mr-10 stat-box pending-box">
                        <Stat>
                            <StatLabel>Funds Pending</StatLabel>
                            <StatNumber>RM {statValue.totalOverdue - statValue.totalIncome}</StatNumber>
                        </Stat>
                    </div>
                </div>
                <Table
                    customersList={currentCustomers}
                    handleEditCustomer={handleEditCustomer}
                    handleDeleteCustomer={handleDeleteConfirmation}
                    handleViewCustomer={handleViewCustomer}
                />
                <Pagination
                    totalAmount={customersList.length}
                    amountPerPage={ROW_PER_PAGE}
                    currentPage={currentPage}
                    nextPage={handleNextPage}
                    prevPage={handlePrevPage}
                    paginate={handlePaginate}
                />
            </Layout>
            <CustomModal
                title="Confirmation"
                body={`Are you sure to delete customer ${customerToDelete} ?`}
                handleCloseModal={handleCloseModal}
                handleDeleteCustomer={handleDeleteCustomer}
                isModalOpen={isModalOpen}
            />
        </div>
    )
}

export default CustomersPage

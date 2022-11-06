import React from "react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
} from "@chakra-ui/react"
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import "./Table.css"

const TableLayout = ({
    customersList,
    handleEditCustomer,
    handleDeleteCustomer,
    handleViewCustomer,
}) => {
    const header = [
        "FirstName",
        "LastName",
        "Age",
        "Overdue (RM)",
        "Paid (RM)",
        "Actions",
    ]

    const handleEdit = customer => {
        handleEditCustomer(customer)
    }

    const handleDelete = customer => {
        handleDeleteCustomer(customer)
    }

    const handleView = customer => {
        handleViewCustomer(customer)
    }

    return (
        <div className="table-container">
            <TableContainer>
                <Table variant="simple" size="md">
                {customersList.length < 1 && <TableCaption>No data to display</TableCaption>}
                    <Thead>
                        <Tr>
                            {header.map(h => {
                                return <Th>{h}</Th>
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {customersList.length >= 1 ? (
                            customersList.map(customer => {
                                return (
                                    <Tr className="table-row" key={customer._id}>
                                        <Td>{customer.firstName}</Td>
                                        <Td>{customer.lastName}</Td>
                                        <Td>{customer.age}</Td>
                                        <Td>{customer.amountOverdue}</Td>
                                        <Td>{customer.amountPaid}</Td>
                                        <Td>
                                            <span
                                                className="m-10 grey btn"
                                                onClick={() =>
                                                    handleView(customer)
                                                }
                                            >
                                                <ViewIcon />
                                            </span>
                                            <span
                                                className="m-10 blue btn"
                                                onClick={() =>
                                                    handleEdit(customer)
                                                }
                                            >
                                                <EditIcon />
                                            </span>
                                            <span
                                                className="m-10 red btn"
                                                onClick={() =>
                                                    handleDelete(customer)
                                                }
                                            >
                                                <DeleteIcon />
                                            </span>
                                        </Td>
                                    </Tr>
                                )
                            })
                        ) : (
                            <>
                                <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                                <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                                <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                                <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                            </>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableLayout

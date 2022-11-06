import React from "react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react"

const Form = ({ data, errorObj, handleChange, isEdit = true }) => {

    return (
        <>
            <FormControl>
                <div className="m-10">
                    <FormLabel>First Name</FormLabel>
                    <Input
                        isDisabled={!isEdit}
                        isInvalid={errorObj.firstName ?? false}
                        errorBorderColor="red.300"
                        name="firstName"
                        value={data.firstName}
                        type="text"
                        onChange={handleChange}
                    />
                </div>

                <div className="m-10">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        isDisabled={!isEdit}
                        isInvalid={errorObj.lastName ?? false}
                        errorBorderColor="red.300"
                        name="lastName"
                        value={data.lastName}
                        type="text"
                        onChange={handleChange}
                    />
                </div>

                <div className="m-10">
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                        isDisabled={!isEdit}
                        isInvalid={errorObj.age ?? false}
                        errorBorderColor="red.300"
                        name="age"
                        value={data.age}
                        type="date"
                        min="1950-12-31"
                        max="2004-12-31"
                        onChange={handleChange}
                    />
                </div>

                <div className="m-10">
                    <FormLabel>Amount Owed</FormLabel>
                    <Input
                        isDisabled={!isEdit}
                        // isInvalid={errorObj.amountOverdue ?? false}
                        errorBorderColor="red.300"
                        name="amountOverdue"
                        value={data.amountOverdue}
                        type="text"
                        onChange={handleChange}
                    />
                </div>

                <div className="m-10">
                    <FormLabel>Amount Paid</FormLabel>
                    <Input
                        isDisabled={!isEdit}
                        // isInvalid={errorObj.amountPaid ?? false}
                        errorBorderColor="red.300"
                        name="amountPaid"
                        value={data.amountPaid}
                        type="text"
                        onChange={handleChange}
                    />
                </div>
            </FormControl>
        </>
    )
}

export default Form

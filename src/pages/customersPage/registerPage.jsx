import React, { useState } from "react"
import Layout from "../../components/Layout/Layout"
import { Button } from "@chakra-ui/react"
import { registerCustomer } from "../../api"
import { useNavigate } from "react-router-dom"
import Form from "../../components/Form/Form"
import registerSchema from "../../schemas/register.validation"
import moment from "moment"

const RegisterPage = () => {
    const navigate = useNavigate()
    const initialData = {
        firstName: "",
        lastName: "",
        age: "",
    }
    const initialErrorObj = {}

    const [data, setData] = useState(initialData)
    const [errorObj, setErrorObj] = useState(initialErrorObj)
    const [submissionState, setSubmissionState] = useState("default")

    const handleChange = event => {
        setErrorObj(initialErrorObj)
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleCancel = () => {
        navigate("/", { replace: true })
    }

    const handleRegisterCustomer = async () => {
        try {
            const value = await registerSchema.validateAsync(data)
            console.log({...value,age:moment(value.age).format()})
            if (value) {
                setSubmissionState("loading")
                const response = await registerCustomer({...value,age:moment(value.age).format()})
                if (!response.data) {
                    setSubmissionState("default")
                    navigate("/", { replace: true })
                }
                setSubmissionState("default")
                navigate("/", { replace: true })
            }
        } catch (error) {
            const { message, details } = error
            if (details) {
                console.log(details[0].context.key)
                setErrorObj({
                    ...errorObj,
                    [details[0].context.key]: true,
                })
            }
        }
    }

    return (
        <div>
            <Layout title="Registration Form">
                <Form
                    data={data}
                    errorObj={errorObj}
                    handleChange={handleChange}
                />

                <div className="m-10">
                    <Button
                        className="mr-10"
                        isLoading={submissionState !== "loading" ? false : true}
                        onClick={handleRegisterCustomer}
                        colorScheme="green"
                    >
                        Register
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </Layout>
        </div>
    )
}

export default RegisterPage

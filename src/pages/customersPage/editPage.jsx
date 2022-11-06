import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import Form from "../../components/Form/Form"
import { Button } from "@chakra-ui/react"
import {fetchSingleCustomer, updateCustomer} from '../../api/index'
import moment from 'moment'
import registerSchema from '../../schemas/register.validation'
import {omit} from 'lodash'

const EditPage = () => {

    const initialErrorObj = {}
    const initialData = {
        firstName: "",
        lastName: "",
        age: "",
    }

    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;
    
    useEffect(() => {
        if(id !== null){
            fetchSingleUser()
        }
    }, [])

    const [data, setData] = useState(initialData)
    const [errorObj, setErrorObj] = useState(initialErrorObj)
    const [submissionState, setSubmissionState] = useState("default")

    const fetchSingleUser = async () => {
        const response = await fetchSingleCustomer(id)
        const data = response.data[0]
        const formattedData = {
            ...data,
            age: moment(new Date(data.age)).format('yyyy-MM-DD')
        }
        setData(formattedData)
    }

    const handleSaveCustomer = async () => {
        try {
            let dataWithoutId = data;
            if(data._id){
                dataWithoutId = omit(data,['_id','updatedAt','__v','createdAt'])
            }
            const value = await registerSchema.validateAsync(dataWithoutId)
            if (value) {
                setSubmissionState("loading")
                const newValue = {...value,age:moment(value.age).format()}
                const response = await updateCustomer(newValue,id)
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
                setErrorObj({
                    ...errorObj,
                    [details[0].context.key]: true,
                })
            }
        }
    }

    const handleChange = event => {
        setErrorObj(initialErrorObj)
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleCancel = () => {
        navigate("/", { replace: true })
    }

    return (
        <div>
            <Layout title="Customer Details">
                <Form
                    isEdit
                    data={data}
                    errorObj={errorObj}
                    handleChange={handleChange}
                />

                <div className="m-10">
                    <Button
                        className="mr-10"
                        isLoading={submissionState !== "loading" ? false : true}
                        onClick={handleSaveCustomer}
                        colorScheme="green"
                    >
                        Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </Layout>
        </div>
    )
}

export default EditPage

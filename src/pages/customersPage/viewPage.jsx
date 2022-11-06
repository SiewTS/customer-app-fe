import React, {useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import Form from '../../components/Form/Form'
import { Button } from '@chakra-ui/react'
import { fetchSingleCustomer } from '../../api'
import moment from 'moment'

const ViewPage = () => {

    const initialErrorObj = {}
    const initialData = {
        firstName: "",
        lastName: "",
        age: "",
    }
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const [data, setData] = useState(initialData)
    const [errorObj, setErrorObj] = useState(initialErrorObj)
    const [submissionState, setSubmissionState] = useState("default")

    
    useEffect(() => {
        if(id !== null){
            fetchSingleUser()
        }
    }, [])
    
    const fetchSingleUser = async () => {
        const response = await fetchSingleCustomer(id)
        const data = response.data[0]
        const formattedData = {
            ...data,
            age: moment(new Date(data.age)).format('yyyy-MM-DD')
        }
        setData(formattedData)
    }

    const handleEditCustomer = () => {
        navigate(`/customer/${id}/edit`, { replace: true })
    }

    const handleCancel = () => {
        navigate("/", { replace: true })
    }

  return (
    <div>
        <Layout title="Customer Details">
                <Form
                    isEdit={false}
                    data={data}
                    errorObj={errorObj}
                />

                <div className="m-10">
                    <Button
                        className="mr-10"
                        isLoading={submissionState !== "loading" ? false : true}
                        onClick={handleEditCustomer}
                        colorScheme="green"
                    >
                        Edit
                    </Button>
                    <Button onClick={handleCancel}>Close</Button>
                </div>
            </Layout>
    </div>
  )
}

export default ViewPage
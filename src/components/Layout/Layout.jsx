import React from "react"
import { Heading } from "@chakra-ui/react"
import "./Layout.css"
import { Button } from "@chakra-ui/react"
import Navbar from "../Navbar/Navbar"
import { useNavigate } from "react-router-dom"

const Layout = props => {
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate("/register")
    }

    return (
        <div className="layout-container">
            <Navbar />

            <div className="content">
                <div className="flex-container">
                    <Heading>{props.title}</Heading>
                    {props.haveRegisterBtn && (
                        <Button colorScheme="green" onClick={handleRegister}>
                            Add
                        </Button>
                    )}
                </div>

                <div className="child-container">{props.children}</div>
            </div>
        </div>
    )
}

export default Layout

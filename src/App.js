import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import CustomersPage from "./pages/customersPage/customersPage"
import RegisterPage from './pages/customersPage/registerPage'
import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import EditPage from "./pages/customersPage/editPage"
import ViewPage from "./pages/customersPage/viewPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <CustomersPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/customer/:id/view",
        element: <ViewPage />,
    },
    {
        path: "/customer/:id/edit",
        element: <EditPage />,
    },
])

const App = () => {
    return (
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    )
}

export default App

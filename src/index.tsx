import React, {Suspense} from 'react'
import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {About} from './pages/About'
import {Shop} from "./pages/Shop";


const container = createRoot(document.getElementById('root'))

const NotFound = () => <div>Not Found</div>

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFound />,
        children:[
            {
                path:'/about',
                element:<Suspense fallback='Loading...'><About/></Suspense>,
            },
            {
                path:'/shop',
                element:<Suspense fallback='Loading...'><Shop/></Suspense>,
            }
        ]
    },
]);

container.render( <RouterProvider router={router} />)
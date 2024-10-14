import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import {
    SignIn,
    SignUp,
    Admin,
    Products,
    Category,
} from '@modules'


const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="admin-layout" element={<Admin/>}>
                    <Route index element={<Products/>}/>
                    <Route path="category" element={<Category/>}/>
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Router;

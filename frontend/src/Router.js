import { createBrowserRouter } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import PageNotFound from "./Containers/PageNotFound";
import Profile from "./Containers/Profile";
import { AuthorizeUser } from "./Middleware/Middleware";
import Checkout from "./Components/checkout/Checkout";
import Shop from "./Containers/Shop";
import {Cart} from "./Containers/Cart"
import Order from "./Containers/Order";


const router = createBrowserRouter([
    {path:'/',element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'*',element:<PageNotFound/>},
    {path:'/profile',element:<AuthorizeUser><Profile/></AuthorizeUser>},
    {path:'/checkout',element:<AuthorizeUser><Checkout/></AuthorizeUser>},
    {path:'/shop',element:<Shop/>},
    {path:'/cart',element:<Cart/>},
    {path:'/order',element:<Order/>},

])


export default router;
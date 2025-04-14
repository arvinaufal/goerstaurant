import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/admin/LoginPage";
import RegisterPage from "../pages/admin/RegisterPage";
import VerifyPage from "../pages/admin/VerifyPage";
import DashboardPage from "../pages/admin/DashboardPage";
import RestaurantPage from "../pages/admin/RestaurantPage";
import Home from "../pages/public/HomePage";
import HomePage from "../pages/public/HomePage";
import ExplorePage from "../pages/public/ExplorePage";
import WhatsNewPage from "../pages/public/WhatsNewPage";

// const RootLayout = () => {
//     return (
//       <>
//         <SideBar />
//         <Outlet />
//       </>
//     );
//   };
const router = createBrowserRouter([
    {
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (!isLogin || isLogin === '') {
                throw redirect("/login");
            }

            return null;
        },
        path: "/admin",
        children: [
            {
                path: "",
                element: <DashboardPage />,
            },
            {
                path: "restaurant",
                element: <RestaurantPage />,
            }
        ],
    },
    {
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (isLogin) {
                throw redirect("/admin");
            }

            return null;
        },
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/verify',
        element: <VerifyPage />
    },
    {
        path: "/",
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "explore",
                element: <ExplorePage />,
            },
            {
                path: "whats-new",
                element: <WhatsNewPage />,
            },
        ],
    }
]);

export default router;
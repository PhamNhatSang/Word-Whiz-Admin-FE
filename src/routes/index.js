import LoginPage from "../pages/LoginPage";
import UserManagementPage from "../pages/UserManagementPage";
import PostManagementPage from "../pages/PostManagementPage";
import DefaultLayout from "../layout/DefaultLayout";
import ProtectedRoute from "./ProtectedRoute";
export const publicRoutes = [
    { path: '/', element: LoginPage },
    { path: '/user-management', element: UserManagementPage, layout: DefaultLayout, auth: ProtectedRoute },
    { path: '/post-management', element: PostManagementPage, layout: DefaultLayout, auth: ProtectedRoute },



];
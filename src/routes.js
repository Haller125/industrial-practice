import MainPage from "./pages/MainPage";
import UploadFiles from "./pages/UploadFiles";

export const publicRoutes = [
    {
        path: '/',
        Component: UploadFiles
    },
    {
        path: '/main',
        Component: MainPage
    }
]
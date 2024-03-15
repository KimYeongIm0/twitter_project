import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
    children,
}:{
    children:React.ReactNode;
}) {
    const user = auth.currentUser;
    if(user === null) return <Navigate to="/login" />

    return children
    //자식페이지로 보내준다 ex:Home
} 
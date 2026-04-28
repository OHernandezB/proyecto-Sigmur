import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, session } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(session.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

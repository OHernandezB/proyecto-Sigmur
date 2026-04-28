import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CiudadanoPage } from "../pages/CiudadanoPage";
import { CiudadanoLayout } from "../layouts/CiudadanoLayout";
import { ReportesPage } from "../pages/ReportesPage";
import { PerfilPage } from "../pages/PerfilPage";
import { LoginPage } from "../pages/LoginPage";
import { AdminPage } from "../pages/AdminPage";
import { AdminRepPage } from "../pages/AdminRepPage";
import { AdminConfPage } from "../pages/AdminConfPage";
import { OperarioPage } from "../pages/OperarioPage";
import { ProtectedRoute } from "./ProtectedRoute";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ciudadano" element={<ProtectedRoute allowedRoles={["ciudadano"]}><CiudadanoLayout><CiudadanoPage /></CiudadanoLayout></ProtectedRoute>} />
                <Route path="/reportes" element={<ProtectedRoute allowedRoles={["ciudadano"]}><CiudadanoLayout><ReportesPage /></CiudadanoLayout></ProtectedRoute>} />
                <Route path="/perfil" element={<ProtectedRoute allowedRoles={["ciudadano"]}><CiudadanoLayout><PerfilPage /></CiudadanoLayout></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPage /></ProtectedRoute>} />
                <Route path="/admin/reportes" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRepPage /></ProtectedRoute>} />
                <Route path="/admin/config" element={<ProtectedRoute allowedRoles={["admin"]}><AdminConfPage /></ProtectedRoute>} />
                <Route path="/operario" element={<ProtectedRoute allowedRoles={["operario"]}><OperarioPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CiudadanoPage } from "../pages/CiudadanoPage";
import { CiudadanoLayout } from "../layouts/CiudadanoLayout";
import { ReportesPage } from "../pages/ReportesPage";
import { PerfilPage } from "../pages/PerfilPage";
import { LoginPage } from "../pages/LoginPage";
import { AdminPage } from "../pages/AdminPage";
import { AdminRepPage } from "../pages/AdminRepPage";
import { AdminConfPage } from "../pages/AdminConfPage";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ciudadano" element={<CiudadanoLayout><CiudadanoPage /></CiudadanoLayout>} />
                <Route path="/reportes" element={<CiudadanoLayout><ReportesPage /></CiudadanoLayout>} />
                <Route path="/perfil" element={<CiudadanoLayout><PerfilPage /></CiudadanoLayout>} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/reportes" element={<AdminRepPage />} />
                <Route path="/admin/config" element={<AdminConfPage />} />
                <Route path="/operario" element={<h1>Operario</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
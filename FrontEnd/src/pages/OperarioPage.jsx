import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReportesContext } from "../context/ReportesContext";
import { useAuth } from "../context/AuthContext";

export function OperarioPage() {
    const { reportes } = useContext(ReportesContext);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const pendientes = reportes.filter((reporte) => reporte.estado === "pendiente");

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Panel Operario</h1>
                            <p className="text-slate-500 mt-2">Gestiona incidencias pendientes asignadas a terreno.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="text-sm font-bold text-slate-500 hover:text-rose-600"
                        >
                            Cerrar sesion
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {pendientes.length === 0 && (
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 text-slate-500">
                            No hay reportes pendientes por ahora.
                        </div>
                    )}

                    {pendientes.map((reporte, index) => (
                        <div key={`${reporte.titulo}-${index}`} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">{reporte.categoria}</p>
                            <h2 className="text-lg font-bold text-slate-800 mt-1">{reporte.titulo}</h2>
                            <p className="text-sm text-slate-500 mt-2">{reporte.descripcion || "Sin descripcion adicional."}</p>
                            <p className="text-xs text-slate-400 mt-3">Fecha: {reporte.fecha}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useContext } from "react";
import { ReportesContext } from "../context/ReportesContext";

export function PerfilPage() {

    const { reportes } = useContext(ReportesContext);

    return (
        <div className="p-4 space-y-4">

            {/* HEADER */}
            <div className="bg-white rounded-xl p-4 shadow">

                <h2 className="text-lg font-bold">Perfil de Usuario</h2>

                <p className="text-sm text-gray-500">
                    Información del ciudadano
                </p>

            </div>

            {/* DATOS */}
            <div className="bg-white rounded-xl p-4 shadow space-y-2">

                <p><strong>Nombre:</strong> Juan Pérez</p>
                <p><strong>RUT:</strong> 12.345.678-9</p>
                <p><strong>Email:</strong> usuario@correo.cl</p>

            </div>

            {/* ESTADÍSTICAS */}
            <div className="bg-white rounded-xl p-4 shadow">

                <h3 className="font-bold mb-2">Actividad</h3>

                <p className="text-sm">
                    Reportes realizados: <strong>{reportes.length}</strong>
                </p>

            </div>

        </div>
    );
}
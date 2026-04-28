import { useContext } from "react";
import { ReportesContext } from "../context/ReportesContext";

export function ReportesPage() {

    const { reportes } = useContext(ReportesContext);

    return (
        <div className="p-4 space-y-4">

            <h1 className="text-xl font-bold">Mis Reportes</h1>

            {reportes.length === 0 && (
                <p className="text-gray-500">No tienes reportes aún</p>
            )}

            {reportes.map((rep, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow space-y-2">

                    {/* 🔥 TITULO */}
                    <h2 className="font-bold text-lg">
                        {rep.titulo || "Sin título"}
                    </h2>

                    {/* 🔥 CATEGORIA */}
                    <p className="text-sm text-blue-600 capitalize">
                        {rep.categoria}
                    </p>

                    {/* 🔥 DESCRIPCION */}
                    {rep.descripcion && (
                        <p className="text-sm text-gray-700">
                            {rep.descripcion}
                        </p>
                    )}

                    {/* 🔥 FECHA */}
                    <p className="text-xs text-gray-500">
                        {rep.fecha}
                    </p>

                    {/* 🔥 IMAGEN */}
                    {rep.imagen && (
                        <img
                            src={rep.imagen}
                            className="w-full h-40 object-cover rounded"
                        />
                    )}

                </div>
            ))}

        </div>
    );
}
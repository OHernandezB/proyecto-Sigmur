import { useContext } from "react";
import { ReportesContext } from "../context/ReportesContext";
import { CheckCircle2, Clock3, FileText } from "lucide-react";

export function ReportesPage() {

    const { reportes } = useContext(ReportesContext);

    return (
        <div className="p-4 md:p-8 space-y-6">
            <section className="bg-white rounded-3xl border border-slate-100 p-5 md:p-7 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Mis Reportes</h1>
                <p className="text-sm md:text-base text-slate-500 mt-2">Revisa el estado y detalle de tus incidencias registradas.</p>
            </section>

            {reportes.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                        <FileText size={22} />
                    </div>
                    <p className="text-slate-700 font-semibold">No tienes reportes aún.</p>
                    <p className="text-sm text-slate-500 mt-1">Cuando crees uno, aparecera aqui.</p>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
                {reportes.map((rep, index) => (
                    <article key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h2 className="font-bold text-lg text-slate-800">{rep.titulo || "Sin título"}</h2>
                                <p className="text-sm text-indigo-600 font-semibold capitalize mt-1">{rep.categoria}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                                rep.estado === "resuelto" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                                {rep.estado === "resuelto" ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                                {rep.estado}
                            </span>
                        </div>

                        {rep.descripcion && <p className="text-sm text-slate-600">{rep.descripcion}</p>}

                        <p className="text-xs text-slate-400">{rep.fecha}</p>

                        {rep.imagen && (
                            <img
                                src={rep.imagen}
                                className="w-full h-44 object-cover rounded-xl border border-slate-100"
                            />
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}
import { useContext } from "react";
import { ReportesContext } from "../context/ReportesContext";
import { AdminLayout } from "../layouts/AdminLayout";
import { 
    Activity, 
    AlertCircle, 
    Trash2, 
    Shield, 
    Lightbulb, 
    CheckCircle2, 
    Clock,
    MoreHorizontal,
    ListTodo
} from "lucide-react";

export function AdminPage() {
    const { reportes, setReportes } = useContext(ReportesContext);

    const total = reportes.length;
    const baches = reportes.filter(r => r.categoria === "bache").length;
    const basura = reportes.filter(r => r.categoria === "basura").length;
    const luminaria = reportes.filter(r => r.categoria === "luminaria").length;
    const seguridad = reportes.filter(r => r.categoria === "seguridad").length;

    const handleResolver = (index) => {
        const nuevos = [...reportes];
        nuevos[index].estado = "resuelto";
        setReportes(nuevos);
    };

    const stats = [
        { label: "Total Reportes", value: total, icon: <Activity size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Baches", value: baches, icon: <AlertCircle size={20} />, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Basura", value: basura, icon: <Trash2 size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Seguridad", value: seguridad, icon: <Shield size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    ];

    return (
        <AdminLayout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 font-medium">Resumen general de incidencias reportadas.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                        Exportar Datos
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h2 className="font-bold text-slate-800">Lista de Reportes Recientes</h2>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left bg-slate-50/30">
                                <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Categoría</th>
                                <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Título</th>
                                <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Fecha</th>
                                <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Estado</th>
                                <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Acción</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {reportes.map((rep, index) => (
                                <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${
                                                rep.categoria === 'bache' ? 'bg-rose-500' : 
                                                rep.categoria === 'basura' ? 'bg-emerald-500' : 
                                                rep.categoria === 'luminaria' ? 'bg-amber-500' : 'bg-indigo-500'
                                            }`}></span>
                                            <span className="font-bold text-slate-700 capitalize">{rep.categoria}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-600">{rep.titulo}</td>
                                    <td className="px-6 py-4 text-slate-400 font-medium">{rep.fecha}</td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            rep.estado === "pendiente"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-emerald-100 text-emerald-700"
                                            }`}>
                                            {rep.estado === "pendiente" ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                                            {rep.estado}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        {rep.estado === "pendiente" ? (
                                            <button
                                                onClick={() => handleResolver(index)}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Marcar como Resuelto
                                            </button>
                                        ) : (
                                            <span className="text-slate-300 font-bold text-xs italic">Completado</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {reportes.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="inline-flex w-16 h-16 bg-slate-50 text-slate-300 rounded-full items-center justify-center mb-4">
                            <ListTodo size={32} />
                        </div>
                        <p className="text-slate-400 font-bold">No hay reportes registrados aún.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
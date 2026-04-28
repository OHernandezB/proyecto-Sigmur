import { useContext } from "react";
import { ReportesContext } from "../context/ReportesContext";
import { Mail, UserRound, IdCard, BarChart3 } from "lucide-react";

export function PerfilPage() {

    const { reportes } = useContext(ReportesContext);

    return (
        <div className="p-4 md:p-8 space-y-6">
            <section className="bg-white rounded-3xl border border-slate-100 p-6 md:p-7 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <UserRound size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">Perfil de Usuario</h2>
                        <p className="text-sm text-slate-500">Información del ciudadano registrado.</p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
                <article className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800">Datos personales</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <UserRound size={16} className="text-slate-400" />
                            <p className="text-sm text-slate-700"><span className="font-semibold">Nombre:</span> Juan Perez</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <IdCard size={16} className="text-slate-400" />
                            <p className="text-sm text-slate-700"><span className="font-semibold">RUT:</span> 12.345.678-9</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-slate-400" />
                            <p className="text-sm text-slate-700"><span className="font-semibold">Email:</span> usuario@correo.cl</p>
                        </div>
                    </div>
                </article>

                <article className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <BarChart3 size={18} className="text-indigo-600" />
                        <h3 className="font-bold text-slate-800">Actividad</h3>
                    </div>
                    <p className="text-sm text-slate-600">Reportes realizados</p>
                    <p className="text-4xl font-black text-slate-800 tracking-tight mt-1">{reportes.length}</p>
                </article>
            </section>
        </div>
    );
}
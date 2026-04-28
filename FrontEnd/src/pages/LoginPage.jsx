import { useNavigate } from "react-router-dom";
import { User, Hammer, Monitor, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function LoginPage() {
    const navigate = useNavigate();

    const roles = [
        {
            id: "ciudadano",
            title: "Ciudadano",
            description: "Reporta incidencias y ayuda a mejorar tu comuna.",
            icon: <User className="text-indigo-600" size={24} />,
            color: "bg-indigo-50",
            hover: "hover:border-indigo-600 hover:shadow-indigo-100",
            path: "/ciudadano"
        },
        {
            id: "operario",
            title: "Operario",
            description: "Gestiona y resuelve los reportes asignados.",
            icon: <Hammer className="text-emerald-600" size={24} />,
            color: "bg-emerald-50",
            hover: "hover:border-emerald-600 hover:shadow-emerald-100",
            path: "/operario"
        },
        {
            id: "admin",
            title: "Administrador",
            description: "Panel de control central y estadísticas municipales.",
            icon: <Monitor className="text-slate-600" size={24} />,
            color: "bg-slate-50",
            hover: "hover:border-slate-600 hover:shadow-slate-100",
            path: "/admin"
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/30 rounded-full blur-[120px]" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg px-6 z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl shadow-slate-200/50 mb-6 border border-slate-100">
                        <ShieldCheck className="text-indigo-600" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                        SIG<span className="text-indigo-600">MUR</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">
                        Sistema Inteligente de Gestión Municipal y Reporte Urbano
                    </p>
                </div>

                <div className="grid gap-4">
                    {roles.map((role, index) => (
                        <motion.button
                            key={role.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(role.path)}
                            className={`group w-full bg-white p-5 rounded-[24px] border-2 border-transparent shadow-sm flex items-center gap-5 text-left transition-all duration-300 ${role.hover} hover:scale-[1.02] active:scale-95`}
                        >
                            <div className={`w-14 h-14 ${role.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                {role.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-800">{role.title}</h3>
                                <p className="text-sm text-slate-500 leading-tight">{role.description}</p>
                            </div>
                            <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:text-slate-600 group-hover:bg-white transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
                        Municipalidad de Tu Comuna &copy; 2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
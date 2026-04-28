import { useState, useContext, useEffect, useRef } from "react";
import { ReportesContext } from "../context/ReportesContext";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { 
    AlertCircle, 
    Trash2, 
    Lightbulb, 
    Shield, 
    MapPin, 
    Plus, 
    X, 
    Camera, 
    Send,
    Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🎨 CATEGORÍAS CON ESTILOS MODERNOS
const categoriasConfig = {
    bache: {
        icon: <AlertCircle size={18} className="text-white" />,
        color: "bg-rose-500",
        label: "Bache",
        description: "Hoyos o grietas en el pavimento"
    },
    basura: {
        icon: <Trash2 size={18} className="text-white" />,
        color: "bg-emerald-500",
        label: "Basura",
        description: "Acumulación de residuos"
    },
    luminaria: {
        icon: <Lightbulb size={18} className="text-white" />,
        color: "bg-amber-500",
        label: "Luminaria",
        description: "Poste de luz apagado o dañado"
    },
    seguridad: {
        icon: <Shield size={18} className="text-white" />,
        color: "bg-indigo-500",
        label: "Seguridad",
        description: "Actividad sospechosa o peligro"
    }
};

// Re-inject HTML for markers with Lucide (simplified version for Leaflet compat)
const createMarkerHtml = (categoria) => {
    const config = categoriasConfig[categoria] || categoriasConfig.bache; // Fallback to bache
    return `
        <div class="w-9 h-9 ${config.color} rounded-full flex items-center justify-center border-2 border-white shadow-lg ring-2 ring-black/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide text-white">${categoria === 'basura' ? '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>' : categoria === 'luminaria' ? '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>' : categoria === 'seguridad' ? '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'}</svg>
        </div>
    `;
};

export function CiudadanoPage() {
    const { reportes, setReportes } = useContext(ReportesContext);
    const [openModal, setOpenModal] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState(null);
    const [posicion, setPosicion] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
    const fileRef = useRef();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUbicacionUsuario([pos.coords.latitude, pos.coords.longitude]);
            }, (err) => console.log("Error geo:", err));
        }
    }, []);

    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(URL.createObjectURL(file));
        }
    };

    function MapClickHandler() {
        useMapEvents({
            click(e) {
                setPosicion(e.latlng);
                setOpenModal(true);
            }
        });
        return null;
    }

    const handleEnviar = () => {
        if (!categoria || !posicion || !titulo) {
            setMensaje("⚠️ Completa los campos obligatorios");
            setTimeout(() => setMensaje(""), 2000);
            return;
        }

        const nuevoReporte = {
            categoria,
            titulo,
            descripcion,
            imagen,
            posicion,
            fecha: new Date().toLocaleString(),
            estado: "pendiente"
        };

        setReportes([nuevoReporte, ...reportes]);
        setOpenModal(false);
        setCategoria("");
        setImagen(null);
        setPosicion(null);
        setTitulo("");
        setDescripcion("");
        if (fileRef.current) fileRef.current.value = "";
        setMensaje("✅ Reporte enviado correctamente");
        setTimeout(() => setMensaje(""), 2500);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden font-sans">
            <div className="flex-1 relative">
                {/* 🔔 MENSAJES DE ESTADO */}
                <AnimatePresence>
                    {mensaje && (
                        <motion.div 
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="absolute top-20 left-1/2 -translate-x-1/2 z-[2000] bg-white border border-slate-200 px-6 py-3 rounded-full shadow-xl flex items-center gap-3"
                        >
                            <span className="text-sm font-medium text-slate-700">{mensaje}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 🏷️ HEADER FLOATING */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[1000]">
                    <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-2xl shadow-slate-200/50 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent tracking-tight">SIGMUR</h1>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Sistema de Gestión Municipal</p>
                        </div>
                        <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                            <MapPin size={20} />
                        </div>
                    </div>
                </div>

                <MapContainer
                    center={[-33.51, -70.76]}
                    zoom={13}
                    className="h-full w-full z-0"
                    zoomControl={false}
                >
                    {/* 🗺️ TILES PROFESIONALES (Voyager con más contraste) */}
                    <TileLayer 
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    <MapClickHandler />

                    {/* 📍 UBICACIÓN USUARIO */}
                    {ubicacionUsuario && (
                        <Marker 
                            position={ubicacionUsuario} 
                            icon={L.divIcon({
                                html: `<div class="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>`,
                                className: "",
                                iconSize: [24, 24],
                                iconAnchor: [12, 12]
                            })}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1 font-medium">Estas aquí</div>
                            </Popup>
                        </Marker>
                    )}

                    {/* 📍 REPORTES */}
                    {reportes.map((rep, index) => (
                        <Marker
                            key={index}
                            position={rep.posicion}
                            icon={L.divIcon({
                                html: createMarkerHtml(rep.categoria),
                                className: "",
                                iconSize: [36, 36],
                                iconAnchor: [18, 18],
                            })}
                        >
                            <Popup className="rounded-xl overflow-hidden p-0 border-none">
                                <div className="w-48">
                                    {rep.imagen && (
                                        <img src={rep.imagen} className="w-full h-24 object-cover" />
                                    )}
                                    <div className="p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-2 h-2 rounded-full ${(categoriasConfig[rep.categoria] || categoriasConfig.bache).color}`}></span>
                                            <span className="text-[10px] uppercase font-bold text-slate-400">{(categoriasConfig[rep.categoria] || categoriasConfig.bache).label}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1">{rep.titulo}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-2">{rep.descripcion}</p>
                                        <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center">
                                            <span className="text-[9px] text-slate-400 font-medium">{rep.fecha.split(',')[0]}</span>
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${rep.estado === 'pendiente' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {rep.estado.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* ➕ BOTÓN FLOTANTE RÁPIDO */}
                <button 
                    onClick={() => {
                        setPosicion({ lat: -33.51, lng: -70.76 }); // Fallback position
                        setOpenModal(true);
                    }}
                    className="absolute bottom-8 right-8 z-[1000] w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-200 flex items-center justify-center hover:bg-indigo-700 transition-all hover:scale-110 active:scale-90"
                >
                    <Plus size={32} />
                </button>

                {/* 📱 BOTTOM SHEET MODAL */}
                <AnimatePresence>
                    {openModal && (
                        <div className="absolute inset-0 z-[2000] flex items-end justify-center px-4 sm:px-0 overflow-hidden">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setOpenModal(false)}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            />
                            
                            <motion.div 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative bg-white w-full max-w-md rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                <div className="p-6 overflow-y-auto">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Nuevo Reporte</h2>
                                            <p className="text-sm text-slate-500 font-medium">¿Qué está pasando en tu comunidad?</p>
                                        </div>
                                        <button onClick={() => setOpenModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* CATEGORÍAS */}
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Categoría</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {Object.entries(categoriasConfig).map(([id, cfg]) => (
                                                    <button
                                                        key={id}
                                                        type="button"
                                                        onClick={() => setCategoria(id)}
                                                        className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                                                            categoria === id 
                                                            ? `border-indigo-600 ${cfg.color.replace('bg-', 'bg-')}/10 ring-4 ring-indigo-50` 
                                                            : "border-slate-100 bg-slate-50 hover:border-slate-200"
                                                        }`}
                                                    >
                                                        <div className={`w-10 h-10 ${cfg.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                                            {cfg.icon}
                                                        </div>
                                                        <span className={`text-xs font-bold ${categoria === id ? "text-indigo-600" : "text-slate-600"}`}>{cfg.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* INPUTS */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Título</label>
                                                <input
                                                    value={titulo}
                                                    onChange={(e) => setTitulo(e.target.value)}
                                                    type="text"
                                                    placeholder="Ej: Bache profundo en calle Principal"
                                                    className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:outline-none focus:border-indigo-600 transition-colors font-medium text-slate-700 placeholder:text-slate-300"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Descripción</label>
                                                <textarea
                                                    value={descripcion}
                                                    onChange={(e) => setDescripcion(e.target.value)}
                                                    placeholder="Describe el problema con más detalle..."
                                                    rows={3}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:outline-none focus:border-indigo-600 transition-colors font-medium text-slate-700 resize-none placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        {/* FOTO */}
                                        <div className="flex items-center gap-4">
                                            <button 
                                                type="button"
                                                onClick={() => fileRef.current?.click()}
                                                className="flex-1 flex items-center justify-center gap-3 p-4 bg-slate-100 text-slate-600 rounded-2xl border-2 border-dashed border-slate-300 hover:bg-slate-200 transition-colors"
                                            >
                                                <Camera size={20} />
                                                <span className="text-sm font-bold">Adjuntar Foto</span>
                                            </button>
                                            <input ref={fileRef} type="file" accept="image/*" onChange={handleImagen} className="hidden" />
                                        </div>

                                        {imagen && (
                                            <div className="relative group rounded-3xl overflow-hidden border-4 border-slate-100">
                                                <img src={imagen} className="w-full h-48 object-cover" />
                                                <button
                                                    onClick={() => {
                                                        setImagen(null);
                                                        if (fileRef.current) fileRef.current.value = "";
                                                    }}
                                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-lg text-slate-800 p-2 rounded-xl"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                                    <button
                                        onClick={handleEnviar}
                                        disabled={!categoria || !titulo}
                                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all shadow-xl ${
                                            !categoria || !titulo
                                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:scale-[1.02] active:scale-95"
                                        }`}
                                    >
                                        <Send size={20} />
                                        Enviar Reporte
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

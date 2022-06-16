export function formatearCantidad(cantidad) {
    return cantidad.toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN',
    });
}

export function generarId() {
    const fecha = Date.now().toString(36).substring(2);
    const random = Math.random().toString(36).substring(2);
    return fecha + random;
}

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
};

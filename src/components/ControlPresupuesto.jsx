import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { formatearCantidad } from '../helpers';

const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
}) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        );
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) *
            100
        ).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);
        setTimeout(() => {
            setPorcentaje(Number(nuevoPorcentaje));
        }, 1000);
    }, [gastos]);

    const handleResetApp = () => {
        Swal.fire({
            title: '¿Deseas reiniciar el presupuesto y gastos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3B82F6',
            cancelButtonColor: '#C61466',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                setGastos([]);
                setPresupuesto(0);
                setIsValidPresupuesto(false);
                Swal.fire(
                    'Reiniciado',
                    'Tu presupuesto y gastos se han reiniciado correctamente',
                    'success'
                );
            }
        });
    };

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas animate__animated animate__fadeIn'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button
                    type='button'
                    className='reset-app'
                    onClick={handleResetApp}
                >
                    ResetearApp
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    );
};

export default ControlPresupuesto;

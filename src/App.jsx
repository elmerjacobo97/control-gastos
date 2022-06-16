import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos')
            ? JSON.parse(localStorage.getItem('gastos'))
            : []
    );
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            // console.log('Gasto Editar tiene algo')
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    // Almacenar presupuesto en localStorage
    useEffect(() => {
        localStorage.setItem('presupuesto', String(presupuesto ?? 0));
    }, [presupuesto]);

    // Almacenar gastos en localStorage
    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if (filtro) {
            // Filtrando gastos por categoría
            const gastosFiltrados = gastos.filter(
                (gasto) => gasto.category === filtro
            );
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro]);

    useEffect(() => {
        const presupuestoLS = localStorage.getItem('presupuesto') ?? 0;
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    function guardarGasto(gasto) {
        if (gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );
            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            // Nuevo gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }
        // Cerra la animación y modal
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosActualizados);
    };

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>
                    <div className='nuevo-gasto'>
                        <img
                            src={IconoNuevoGasto}
                            alt='icono nuevo gasto'
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;

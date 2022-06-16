const Mensaje = ({ children, tipo }) => {
    return (
        <div className={`alerta ${tipo} animate__animated animate__bounceIn`}>
            {children}
        </div>
    );
};

export default Mensaje;

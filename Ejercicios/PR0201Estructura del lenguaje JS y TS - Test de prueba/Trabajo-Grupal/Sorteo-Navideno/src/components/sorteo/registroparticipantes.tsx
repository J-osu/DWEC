import { useState } from 'react';
import Boton from '../../UI/Boton';
import '../../assets/css/registroparticipantesestilos.css'; 
interface DatosParticipanteForm {
    nombre: string;
    email: string;
}

interface FormularioProps {
    onAgregarParticipante: (data: DatosParticipanteForm) => void;
}

const FormularioParticipante: React.FC<FormularioProps> = ({ onAgregarParticipante }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (nombre.trim() === '' || email.trim() === '') {
            alert('Ingresa tu nombre y el email.');
            return;
        }

        onAgregarParticipante({ nombre, email });

        setNombre('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit} className="form-participante-container">
            <h3>Agregar Nuevo Participante</h3>
            
            <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                    id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="form-input"/>
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
            </div>
            
            <Boton type="submit">Agregar Participante</Boton>
        </form>
    );
};

export default FormularioParticipante;
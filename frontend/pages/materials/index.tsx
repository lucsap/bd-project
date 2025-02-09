import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Modal } from '../../components/Modal/modal';
import Materials from '../../components/Materials/materials';
import { convertBufferToBase64 } from '../../utils/convertBufferToBase64';

interface materialProps {
    id: number,
    nome: string,
    editora: string,
    numero_serie: number,
    categoria: string,
    estado_conservacao: string,
    localizacao_fisica: string,
    imagem: string
}

export default function Materiais(): materialProps {
    const [materiais, setMateriais] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState([]);

    const materialRequest = async () => {
        const token = localStorage.getItem('@token');
        const response = await fetch('http://localhost:3001/materiais', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        

        setMateriais(data);
    };
    
    useEffect(() => {
        materialRequest();
    }, []); 
    
    const openModal = (material: any) => {
        setSelectedMaterial(material);
    };

    const closeModal = () => {
        setSelectedMaterial([]);
    };

    return (
            <div className={styles.container}>
              <strong>Materiais disponíveis!</strong>
                <ul className={styles.listContainer}>
                    {materiais.map((material: any) => (
                        <li key={material.id}>
                            <Materials
                                onClick={() => openModal(material)} // Passa o material específico ao abrir o modal
                                name={material.nome}
                                description={material.description}
                                category={material.categoria}
                                image={convertBufferToBase64(material.imagem)}
                            />
                            {selectedMaterial && selectedMaterial.id === material.id && ( // Renderiza o modal apenas se o material estiver selecionado
                                <Modal
                                    isOpen={true}
                                    onClose={closeModal}
                                    titulo={selectedMaterial.nome}
                                    categoria={selectedMaterial.categoria}
                                    estado_conservacao={selectedMaterial.estado_conservacao}
                                    localizacao_fisica={selectedMaterial.localizacao_fisica}
                                    image={convertBufferToBase64(selectedMaterial.imagem)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
    );
};

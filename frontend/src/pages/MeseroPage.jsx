import { useEffect, useState } from 'react';
import HeaderMesero from '../components/HeaderMesero';
import { useNavigate } from 'react-router-dom';
import MapaMesas from './MapaMesas'; // Importa el nuevo componente

export default function MeseroPage() {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('Cargando...');

  const mesasNormales = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    estado: i === 11 ? 'ocupada' : 'disponible',
  }));

  const mesasExtras = [
    { id: 'Domicilio', estado: 'disponible' },
    { id: 'Pickup', estado: 'disponible' },
  ];

  const handleClickMesa = (mesaId) => {
    navigate('/orden', { state: { mesaId } });
  };

  useEffect(() => {
    const pin = sessionStorage.getItem('pin');
    if (!pin) {
      navigate('/');
      return;
    }

    fetch(`http://localhost:3000/api/usuario/${pin}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setNombreUsuario(data.name || 'Mesero desconocido');
      })
      .catch(() => setNombreUsuario('Mesero desconocido'));
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HeaderMesero nombre={nombreUsuario} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Usamos el componente MapaMesas */}
        <MapaMesas mesasNormales={mesasNormales} mesasExtras={mesasExtras} onClickMesa={handleClickMesa} />
      </div>
    </div>
  );
}

import React from 'react';
import { Sky, ContactShadows, Stars } from '@react-three/drei';
import { Room } from './Room';
import { Table, Chair, Bed, Lamp, Rug } from './Furniture';

interface SceneProps {
  isNight: boolean;
  furniture: Array<{
    type: string;
    position: [number, number, number];
    rotation?: [number, number, number];
  }>;
}

export const Scene: React.FC<SceneProps> = ({ isNight, furniture }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={isNight ? 0.05 : 0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={isNight ? 0.1 : 1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Atmosphere */}
      {isNight ? (
        <>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <color attach="background" args={['#050505']} />
        </>
      ) : (
        <>
          <Sky sunPosition={[10, 10, 5]} />
          <color attach="background" args={['#87CEEB']} />
        </>
      )}

      {/* Room Structure */}
      <Room />

      {/* Furniture */}
      {furniture.map((item, index) => {
        const props = { position: item.position, rotation: item.rotation };
        switch (item.type) {
          case 'table':
            return <Table key={index} {...props} />;
          case 'chair':
            return <Chair key={index} {...props} />;
          case 'bed':
            return <Bed key={index} {...props} />;
          case 'lamp':
            return <Lamp key={index} {...props} isOn={isNight} />;
          case 'rug':
            return <Rug key={index} {...props} />;
          default:
            return null;
        }
      })}

      {/* Helper for realism */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4.5}
      />
    </>
  );
};

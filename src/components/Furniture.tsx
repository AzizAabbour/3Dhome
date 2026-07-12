import React from 'react';

interface FurnitureProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export const Table: React.FC<FurnitureProps> = ({ position, rotation = [0, 0, 0], color = '#8B4513' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Table top */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Legs */}
      {[[-0.9, 0.35, -0.5], [0.9, 0.35, -0.5], [-0.9, 0.35, 0.5], [0.9, 0.35, 0.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.7]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

export const Chair: React.FC<FurnitureProps> = ({ position, rotation = [0, 0, 0], color = '#A0522D' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.8, -0.21]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.7, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Legs */}
      {[[-0.2, 0.22, -0.2], [0.2, 0.22, -0.2], [-0.2, 0.22, 0.2], [0.2, 0.22, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.45]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

export const Bed: React.FC<FurnitureProps> = ({ position, rotation = [0, 0, 0], color = '#4682B4' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.4, 3]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.2, 2.9]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Pillow */}
      <mesh position={[0, 0.56, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.1, 0.5]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>
      {/* Blanket */}
      <mesh position={[0, 0.46, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[1.92, 0.22, 2.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export const Lamp: React.FC<FurnitureProps & { isOn?: boolean }> = ({ position, rotation = [0, 0, 0], isOn = true }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.5]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.4, 0.4, 32, 1, true]} />
        <meshStandardMaterial color="#FFFDE7" side={2} />
      </mesh>
      {/* Bulb light */}
      {isOn && (
        <pointLight
          position={[0, 1.5, 0]}
          intensity={5}
          distance={10}
          color="#FFD700"
          castShadow
        />
      )}
    </group>
  );
};

export const Rug: React.FC<FurnitureProps> = ({ position, rotation = [0, 0, 0], color = '#BC8F8F' }) => {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={[3, 0.01, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

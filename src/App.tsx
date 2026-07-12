import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Sun, Moon, Plus, Trash2, Camera } from 'lucide-react';
import { Scene } from './components/Scene';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INITIAL_FURNITURE = [
  { type: 'bed', position: [-3, 0, -3] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
  { type: 'table', position: [2, 0, -2] as [number, number, number], rotation: [0, Math.PI / 4, 0] as [number, number, number] },
  { type: 'chair', position: [1.2, 0, -1.5] as [number, number, number], rotation: [0, Math.PI / 1.5, 0] as [number, number, number] },
  { type: 'lamp', position: [4, 0, -4] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
  { type: 'rug', position: [0, 0.01, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
];

function App() {
  const [isNight, setIsNight] = useState(false);
  const [furniture, setFurniture] = useState(INITIAL_FURNITURE);

  const addFurniture = (type: string) => {
    const randomPos: [number, number, number] = [
      (Math.random() - 0.5) * 8,
      0,
      (Math.random() - 0.5) * 8
    ];
    const randomRot: [number, number, number] = [0, Math.random() * Math.PI * 2, 0];
    setFurniture([...furniture, { type, position: randomPos, rotation: randomRot }]);
  };

  const clearRoom = () => {
    setFurniture([]);
  };

  const resetRoom = () => {
    setFurniture(INITIAL_FURNITURE);
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 text-white overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
        <Scene isNight={isNight} furniture={furniture} />
        <OrbitControls 
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight drop-shadow-md">
          3D Room Designer
        </h1>
        <p className="text-slate-300 max-w-xs drop-shadow-sm">
          Design your perfect space. Toggle between day and night, and place furniture items.
        </p>
      </div>

      <div className="absolute top-6 right-6 flex gap-2">
        <button
          onClick={() => setIsNight(!isNight)}
          className={cn(
            "p-3 rounded-full transition-all duration-300 shadow-lg",
            isNight ? "bg-indigo-600 text-white" : "bg-yellow-400 text-slate-900"
          )}
          title={isNight ? "Switch to Day" : "Switch to Night"}
        >
          {isNight ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex gap-2 border border-white/20 shadow-2xl">
          {[
            { id: 'table', label: 'Table' },
            { id: 'chair', label: 'Chair' },
            { id: 'bed', label: 'Bed' },
            { id: 'lamp', label: 'Lamp' },
            { id: 'rug', label: 'Rug' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => addFurniture(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/5"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetRoom}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 transition-colors shadow-lg"
          >
            <Camera size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Reset Scene</span>
          </button>
          <button
            onClick={clearRoom}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition-colors shadow-lg"
          >
            <Trash2 size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Clear Room</span>
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 right-8 text-right text-xs text-slate-400 pointer-events-none">
        Left Click: Rotate<br />
        Scroll: Zoom
      </div>
    </div>
  );
}

export default App;

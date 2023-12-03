// Display.tsx

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";
import ModelComponent from "./ModelComponent";

interface DisplayProps {
  mode: "2D" | "3D";
  cord_x: number;
  cord_y: number;
  cord_z: number;
}

const Display: React.FC<DisplayProps> = ({ mode, cord_x, cord_y, cord_z }) => {
  const fileUrl = "/chair.glb"; 
  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas className="h-2xl w-2xl">
        <ambientLight intensity={3} />
        {mode === "2D" ? (
          <>
            <OrbitControls
              enableDamping
              dampingFactor={0.25}
              rotateSpeed={0.4}
              enableRotate={false} // Disable rotation
              enablePan={true} // Enable panning
              zoomSpeed={0.5} // Adjust zoom speed
            />
            <OrthographicCamera
              makeDefault
              zoom={1}
              left={-20}
              right={20}
              top={20}
              bottom={-20}
              position={[0, 0, 20]}
            />
            <ModelComponent
              fileUrl={fileUrl}
              mode={mode}
              cord_x={cord_x}
              cord_y={cord_y}
              cord_z={cord_z}
            />
          </>
        ) : (
          <>
            <OrbitControls
              enableDamping
              dampingFactor={0.25}
              rotateSpeed={0.4}
              enableRotate={true}
            />
            <PerspectiveCamera
              makeDefault
              position={[0, 15, 30]}
              fov={75}
              aspect={1.77}
            />
            <ModelComponent
              fileUrl={fileUrl}
              mode={mode}
              cord_x={cord_x}
              cord_y={cord_y}
              cord_z={cord_z}
            />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default Display;

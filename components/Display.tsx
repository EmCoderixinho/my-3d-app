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
}

const Display: React.FC<DisplayProps> = ({ mode }) => {
  const fileUrl = "/chess.glb";
  const whichMode = mode;

  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas className="h-2xl w-2xl">
        <ambientLight intensity={2} />
        {mode === "2D" ? (
          <>
            <OrthographicCamera
              makeDefault
              zoom={1}
              left={-30}
              right={20}
              top={20}
              bottom={-35}
              position={[0, 0, 10]}
            />
            <ModelComponent fileUrl={fileUrl} whichMode={whichMode}/>
          </>
        ) : (
          <>
            <OrbitControls enableDamping dampingFactor={0.25} rotateSpeed={0.4} />
            <PerspectiveCamera
              makeDefault
              position={[0, 15, 30]}
              fov={75}
              aspect={1.77}
            />
            <ModelComponent fileUrl={fileUrl} whichMode={whichMode}/>
          </>
        )}
      </Canvas>
    </div>
  );
};

export default Display;

// ModelComponent.tsx

import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

interface ModelComponentProps {
  fileUrl: string;
  whichMode: string;
}

const ModelComponent: React.FC<ModelComponentProps> = ({ fileUrl, whichMode }) => {
  console.log("Rendering ModelComponent:", fileUrl);
  const mesh = useRef<Mesh>(null!);

  const gltf = useLoader(GLTFLoader, fileUrl);

  if(whichMode === '2D'){

    return (
        <mesh position={[0, 0, 0]} ref={mesh} rotation={[Math.PI / 2, 0, 0]} >{gltf.scene && <primitive object={gltf.scene} />}</mesh>
      );
  }

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>{gltf.scene && <primitive object={gltf.scene} />}</mesh>
  );
};

export default ModelComponent;

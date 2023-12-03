// ModelComponent.tsx

import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

interface ModelComponentProps {
  fileUrl: string;
  mode: string;
  cord_x: number;
  cord_y: number;
  cord_z: number;
}

const ModelComponent: React.FC<ModelComponentProps> = (props: ModelComponentProps) => {
  //console.log("Rendering ModelComponent:", fileUrl);
  const mesh = useRef<Mesh>(null!);

  const gltf = useLoader(GLTFLoader, props.fileUrl);

  if(props.mode === '2D'){

    return (
        <mesh position={[props.cord_x, props.cord_y, props.cord_z]} ref={mesh} rotation={[0, 0, 0]} >{gltf.scene && <primitive object={gltf.scene} />}</mesh>
      );
  }

  return (
    <mesh position={[props.cord_x, props.cord_y, props.cord_z]} ref={mesh}>{gltf.scene && <primitive object={gltf.scene} />}</mesh>
  );
};

export default ModelComponent;

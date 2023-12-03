// ModelComponent.tsx

import React, { useRef, useMemo, useEffect } from "react";
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

const ModelComponent: React.FC<ModelComponentProps> = (
  props: ModelComponentProps
) => {
  console.log("Rendering ModelComponent:", props.fileUrl);

  const mesh = useRef<Mesh>(null);

  // Use useMemo to ensure the loader is triggered only once
  const gltf = useMemo(() => {
    return useLoader(GLTFLoader, props.fileUrl);
  }, [props.fileUrl]);

  useEffect(() => {
    console.log("GLTF Loaded:", gltf);
  }, [gltf]);

  if (!gltf || !gltf.scene) {
    console.error("GLTF not available");
    return null;
  }

  if (props.mode === "2D") {
    return (
      <mesh
        position={[props.cord_x, props.cord_y, props.cord_z]}
        ref={mesh}
        rotation={[0, 0, 0]}
      >
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

  return (
    <mesh position={[props.cord_x, props.cord_y, props.cord_z]} ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default ModelComponent;

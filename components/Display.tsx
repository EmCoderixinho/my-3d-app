// Display.tsx

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";
import ModelComponent from "./ModelComponent";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";

const Display = () => {
  const { user } = useAuthContext();
  const [isLoading, setisLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const [cord_x, setCord_x] = useState(0);
  const [cord_y, setCord_y] = useState(0);
  const [cord_z, setCord_z] = useState(0);
  const [mode, setMode] = useState("");

  const { documents, error } = useCollection("users", ["id", "==", user.uid]);

  useEffect(() => {
    if (documents && documents[0]) {
      setFileUrl(documents[0].attachedFile);
      setCord_x(documents[0].cord_x);
      setCord_y(documents[0].cord_y);
      setCord_z(documents[0].cord_z);
      setMode(documents[0].mode);

      setisLoading(false);
    } else setisLoading(true);

    //console.log(fileUrl);
  }, [documents]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen" role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG paths for loading spinner */}
        </svg>
        <span className="sr-only">Loading Page...</span>
      </div>
    );

  return (
    !isLoading && (
      <div className="flex justify-center items-center h-screen">
        <Canvas className="h-2xl w-2xl">
          <ambientLight intensity={2} />
          <OrbitControls
            enableDamping
            dampingFactor={0.25}
            rotateSpeed={0.4}
            enableRotate={mode === "2D" ? false : true} // Disable rotation
            zoomSpeed={0.5} // Adjust zoom speed
          />
          {mode === "2D" ? (
            <>
              <OrthographicCamera
                makeDefault
                zoom={1}
                left={-10}
                right={10}
                top={10}
                bottom={-10}
                position={[0, 0, 10]}
              />
            </>
          ) : (
            <>
              <PerspectiveCamera
                makeDefault
                position={[0, 15, 30]}
                fov={75}
                aspect={1.77}
              />
            </>
          )}
          <ModelComponent
            fileUrl={fileUrl}
            mode={mode}
            cord_x={cord_x}
            cord_y={cord_y}
            cord_z={cord_z}
          />
        </Canvas>
      </div>
    )
  );
};

export default Display;

// components/Sidebar.js
import React, { useState, CSSProperties, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection";

const Sidebar = () => {
  const { user } = useAuthContext();
  const [isLoading, setisLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const [cord_x, setCord_x] = useState(0);
  const [cord_y, setCord_y] = useState(0);
  const [cord_z, setCord_z] = useState(0);
  const [mode, setMode] = useState("");

  const { documents, error } = useCollection("users", ["id", "==", user.uid]);

  const { setDocument, response } = useFirestore("users");


  //change it to the starting documents values

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

  useEffect(() => {
    if (!isLoading) {
      let Coordinates = {
        cord_x,
        cord_y,
        cord_z,
        id: user.uid,
        attachedFile: fileUrl,
        mode,
      };

      setDocument(Coordinates);
    }
  }, [cord_x, cord_y, cord_z, mode]);

  const sidebarStyle: CSSProperties = {
    width: "250px",
    transition: "width 0.5s ease",
    overflow: "hidden",
  };

  if (isLoading) return <></>;

  return (
    <div className="bg-gray-800 text-white h-screen p-4">
      <div style={sidebarStyle}>
        <p className="text-lg font-bold mt-4 mb-4">Sidebar</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="max-w-md w-fullrounded-lg shadow-md"
        >
          {/* Coordinates section*/}
          <div className="mb-6">
            {/* Cord_x input */}
            <label
              htmlFor="cord_x"
              className="block text-gray-200 text-sm font-bold mb-2"
            >
              Coordinate x:
            </label>
            <input
              required
              type="number"
              id="cord_x"
              name="cord_x"
              value={cord_x}
              onChange={(e) => {
                setCord_x(parseInt(e.target.value, 10));
              }}
              placeholder="Change Coordinate X"
              className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-700 text-gray-200"
            />
          </div>

          <div className="mb-6">
            {/* Cord_x input */}
            <label
              htmlFor="cord_y"
              className="block text-gray-200 text-sm font-bold mb-2"
            >
              Coordinate y:
            </label>
            <input
              required
              type="number"
              id="cord_y"
              name="cord_y"
              value={cord_y}
              onChange={(e) => {
                setCord_y(parseInt(e.target.value, 10));
              }}
              placeholder="Change Coordinate Y"
              className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-700 text-gray-200"
            />
          </div>

          <div className="mb-6">
            {/* Cord_x input */}
            <label
              htmlFor="cord_z"
              className="block text-gray-200 text-sm font-bold mb-2"
            >
              Coordinate z:
            </label>
            <input
              required
              type="number"
              id="cord_z"
              name="cord_z"
              value={cord_z}
              onChange={(e) => {
                setCord_z(parseInt(e.target.value, 10));
              }}
              placeholder="Change Coordinate Z"
              className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-700 text-gray-200"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className={`mb-1 mr-1 w-full flex justify-center items-center ${
                mode === "2D"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 hover:bg-blue-500 text-white"
              } focus:outline-none focus:shadow-outline-blue py-2 px-4 rounded-md`}
              onClick={() => setMode("2D")}
              disabled={mode === "2D"}
            >
              2D
            </button>
            <button
              type="button"
              className={`mb-1 w-full flex justify-center items-center ${
                mode === "3D"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 hover:bg-blue-500 text-white"
              } focus:outline-none focus:shadow-outline-blue py-2 px-4 rounded-md`}
              onClick={() => setMode("3D")}
              disabled={mode === "3D"}
            >
              3D
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;

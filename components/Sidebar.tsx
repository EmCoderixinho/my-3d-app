// components/Sidebar.js
import React, { useState, CSSProperties, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection";

const Sidebar = () => {
  const { user } = useAuthContext();

  const { documents, error } = useCollection("users", [
    "uid",
    "==",
    user.uid,
  ]);

  //change it to the starting documents values

  useEffect(()=>{

    //console.log(documents);
    
  }, [documents])
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [cord_x, setCord_x] = useState(0);
  const [cord_y, setCord_y] = useState(0);
  const [cord_z, setCord_z] = useState(0);

  const { setDocument, response } = useFirestore("users");

  const sidebarStyle: CSSProperties = {
    width: isSidebarOpen ? "auto" : "0",
    transition: "width 0.5s ease",
    overflow: "hidden",
  };

  const handleSubmit = () => {
    let Coordinates = {
      cord_x,
      cord_y,
      cord_z,
      uid: user.uid,
    };

    setDocument(Coordinates);
  };

  return (
    <div className="bg-gray-800 text-white h-screen p-4">
      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="sr-only">Open Sidebar</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div style={sidebarStyle}>
        <p className="text-lg font-bold mt-4 mb-4">Sidebar</p>
        <form
          onSubmit={handleSubmit}
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

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            {/* Render different button content based on form submission status */}
            {!response.isPending && (
              <button
                type="submit"
                className="flex justify-center items-center bg-gray-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
              >
                Change Coordinates
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  id="send"
                  fill="#fff"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                </svg>
              </button>
            )}
            {response.isPending && (
              <button
                disabled
                className="flex justify-center items-center bg-gray-600 hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
              >
                {/* Loading animation for submission in progress */}
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            )}
          </div>
          {/* Display error message if form submission fails */}
          {response.error && <p>{response.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Sidebar;

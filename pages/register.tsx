// Import necessary modules and components
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignup } from "../hooks/useSignup";

// Define the Login component
export default function register() {
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const [cord_x, setCord_x] = useState(0);
  const [cord_y, setCord_y] = useState(0);
  const [cord_z, setCord_z] = useState(0);

  // Custom hook for user authentication
  const { signup, isPending, error } = useSignup();
  const router = useRouter();
  const { user } = useAuthContext();

  // Handle file selection in the file input
  const handleFileChange = (e) => {
    setAttachedFile(null);

    let selected = e.target.files[0];

    //console.log(selected);

    if (!selected) return;

    if (!selected.name.includes(".glb")) {
      setFileError("Please select a 3D model in glb format");
      return;
    }

    setFileError("");
    setAttachedFile(selected);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call signup function from useSignup hook
    signup({ email, password, attachedFile, cord_x, cord_y, cord_z });
  };

  // Redirect to home page if user is already authenticated
  if (user) router.push("/");

  // Render the login form
  return (
    <main className="mx-auto flex w-full items-center justify-center bg-gray-900 text-white mt-16">
      <form
        className="flex w-[30rem] flex-col space-y-10"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="text-center text-4xl font-medium">Register</div>

        {/* Email Input */}
        <div className="w-full transform border-b-2 border-indigo-500">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Password Input */}
        <div className="w-full transform border-b-2 border-indigo-500">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="w-full transform border-b-2 border-indigo-500">
          <label htmlFor="cord_x">Coordinate x:</label>
          <input
            id="cord_x"
            type="number"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            onChange={(e) => setCord_x(parseInt(e.target.value, 10))}
            value={cord_x}
          />
        </div>

        <div className="w-full transform border-b-2 border-indigo-500">
          <label htmlFor="cord_y">Coordinate y:</label>
          <input
            id="cord_y"
            type="number"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            onChange={(e) => setCord_y(parseInt(e.target.value, 10))}
            value={cord_y}
          />
        </div>

        <div className="w-full transform border-b-2 border-indigo-500">
          <label htmlFor="cord_z">Coordinate z:</label>
          <input
            id="cord_z"
            type="number"
            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            onChange={(e) => setCord_z(parseInt(e.target.value, 10))}
            value={cord_z}
          />
        </div>

        {/* File Attachment Section */}
        <div className="mb-6">
          {/* File input */}
          <label
            htmlFor="fileAttachment"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Attach File:
          </label>
          <div className="relative border-2 rounded-md px-4 py-3 bg-gray-700 flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
            <input
              type="file"
              id="fileAttachment"
              name="fileAttachment"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="flex items-center">
              {!attachedFile && (
                // File not chosen
                <>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-300">
                    Choose a file
                  </span>
                </>
              )}

              {attachedFile && (
                // File chosen
                <>
                  <span className="ml-2 text-sm text-gray-300">
                    Chosen file: {attachedFile.name}
                  </span>
                </>
              )}
            </div>
          </div>
          {/* File error message */}
          {fileError !== "" && (
            <p className="ml-2 text-sm text-red-600 mt-2">{fileError}</p>
          )}
        </div>

        {/* Submit Button */}
        {!isPending && (
          <button className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
            REGISTER
          </button>
        )}

        {/* Loading Button */}
        {isPending && (
          <button
            disabled
            type="button"
            className="transform rounded-sm bg-indigo-600 py-2 font-bold hover:bg-indigo-500 "
          >
            {/* Loading Spinner */}
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Loading Spinner Paths */}
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

        {/* Display error message if there is an error */}
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}

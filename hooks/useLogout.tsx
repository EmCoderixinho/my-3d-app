import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false); // Flag to track if the user leaves the page
  const [error, setError] = useState(null); // Flag to track if there is an error
  const [isPending, setIsPending] = useState(false); // Flag to track if we are fetching data from the database
  const { dispatch } = useAuthContext(); // Function to update the auth context

  // Logout function that signs the user out
  const logout = async () => {
    setError(null); // Reset error state
    setIsPending(false); // Set pending to false

    try {
      // Attempt to sign out using Firebase
      signOut(auth)
        .then(() => {
          dispatch({ type: "LOGOUT" }); // If sign-out is successful, update the user context
        })
        .catch((error) => {
          throw new Error('Could not sign out'); // Throw an error if sign-out fails
        });

      if (!isCancelled) {
        setError(null); // Reset error state
        setIsPending(false); // Set pending to false
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message); // Set error state if an error occurs during sign-out
        setIsPending(false); // Set pending to false
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true); // Cleanup effect to set isCancelled to true when the component unmounts
  }, []);

  return { logout, error, isPending }; // Return the functions and states for external use
};
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false); // Flag to track if the user leaves the page
  const [error, setError] = useState(null); // Flag to track if there is an error
  const [isPending, setIsPending] = useState(false); // Flag to track if we are fetching data from the database
  const { dispatch } = useAuthContext(); // Function to update the auth context

  // Login function that logs the user in with the provided email and password
  const login = async (email, password) => {
    setError(null); // Reset error state
    setIsPending(true); // Set pending to true as we are fetching data

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        // Try to sign in with email and password using Firebase
        (userCredential) => {
          if (!isCancelled) {
            if (userCredential.user) {
              // If sign-in is successful, update the user context and set pending to false
              dispatch({ type: "LOGIN", payload: userCredential.user });
              setIsPending(false);
              setError(null);
            } else throw new Error("Could not log in");
          }
        }
      );
    } catch (err) {
      if (!isCancelled) {
        if (err.code === "auth/internal-error") {
          // If login credentials are invalid, set an error message for the user
          setError("Invalid login credentials");
        } else {
          setError(err.message); // Set other errors to be displayed
        }
        setIsPending(false); // Set pending to false after handling the error
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true); // Cleanup effect to set isCancelled to true when the component unmounts
  }, []);

  return { login, isPending, error }; // Return the functions and states for external use
};
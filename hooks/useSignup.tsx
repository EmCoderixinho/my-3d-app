import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null); // Flag to track if there is an error
  const [isPending, setIsPending] = useState(false); // Flag to track if we are fetching data from the database
  const { dispatch } = useAuthContext(); // Function to update the auth context
  const [isCancelled, setIsCancelled] = useState(false); // Flag to track if the user leaves the page
  const router = useRouter(); // Next.js router for page navigation

  // Signup function that creates a new user and adds user data to Firestore
  const signup = async (user) => {
    setError(null); // Reset error state
    setIsPending(true); // Set pending to true

    try {
      // Create a new user using Firebase authentication
      await createUserWithEmailAndPassword(auth, user.email, user.password).then(
        (userCredential) => {
          dispatch({ type: "LOGIN", payload: userCredential.user }); // Update user context with the newly created user

          const db = getFirestore();

          // Add user data to Firestore under the "users" collection
          setDoc(doc(db, "users", userCredential.user.uid), {
            id: userCredential.user.uid,
            //add attached file and x_y_z
          });

          if (!isCancelled) {
            setError(null); // Reset error state
            setIsPending(false); // Set pending to false
            router.push("/"); // Navigate to the home page
          }
        }
      );
    } catch (err) {
      console.error("Error during signup:", err);

      if (!isCancelled) {
        setError(err.message); // Set error state if an error occurs during signup
        setIsPending(false); // Set pending to false
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true); // Cleanup effect to set isCancelled to true when the component unmounts
  }, []);

  return { error, isPending, signup }; // Return the functions and states for external use
};
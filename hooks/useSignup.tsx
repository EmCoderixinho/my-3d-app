import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db, storage } from "../firebase/config";

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
      await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      ).then(async (userCredential) => {
        dispatch({ type: "LOGIN", payload: userCredential.user }); // Update user context with the newly created user

        // upload attached file to storage
        const uploadPath = `items/${userCredential.user.uid}/${user.attachedFile.name}`;
        const storageRef = ref(storage, uploadPath);

        const uploadTask = uploadBytesResumable(storageRef, user.attachedFile);

        // Wait for the upload to complete
        await uploadTask;

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        console.log(downloadURL);

        // Add user data to Firestore under the "users" collection
        setDoc(doc(db, "users", userCredential.user.uid), {
          id: userCredential.user.uid,
          cord_x: user.cord_x,
          cord_y: user.cord_y,
          cord_z: user.cord_z,
          attachedFile: downloadURL,
          mode: "3D",
          //add attached file and x_y_z
        });

        if (!isCancelled) {
          setError(null); // Reset error state
          setIsPending(false); // Set pending to false
          router.push("/"); // Navigate to the home page
        }
      });
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

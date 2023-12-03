import { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

// Custom hook for fetching data from a Firestore collection based on a query
export const useCollection = (coll, _query) => {
  
  // State to store documents and error
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // Ref for storing the query
  const query1 = useRef(_query).current;

  useEffect(() => {
    let q;

    // Check if the query is provided and has necessary parameters
    if (query1.length > 0 && query1[2]) {
      // Construct the Firestore query
      q = query(collection(db, coll), where(query1[0], query1[1], query1[2]));
    } else {
      // If the query is not provided or incomplete, return
      return;
    }

    // Set up a snapshot listener for real-time updates
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        let results = [];

        // Extract data from each document in the snapshot
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state with the fetched documents
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsub();
  }, [coll, query1]);

  // Return the fetched documents and error
  return { documents, error };
};
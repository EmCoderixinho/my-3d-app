import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Custom hook to access the authentication context
export const useAuthContext = () => {
    // Get the authentication context using useContext
    const context = useContext(AuthContext);

    // If the context is not available, throw an error
    if (!context) {
        throw Error('Context must be inside AuthContext');
    }

    // Return the authentication context
    return context;
}
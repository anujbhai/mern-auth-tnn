import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(result));

      // update the auth context
      dispatch({type: "LOGIN", payload: result});

      setIsLoading(false);
    }
  };

  return {signup, isLoading, error};
};


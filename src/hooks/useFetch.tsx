import { useState } from "react";

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response: Record<any, any>) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);
  
        return res.json();
      })
      .then((data) => {
        if (data?.access_token) {
          localStorage.setItem("access_token", data.access_token);
          window.location.reload();
        }
  
        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return { loading, error, handleGoogle };
};




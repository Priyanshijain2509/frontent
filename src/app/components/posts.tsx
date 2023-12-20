"use client";

import { useState, useEffect } from "react";

export default function Posts() {
  const [res, setRes] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setRes(result.message);
      } catch (error) {
        setErr(error);
      }
    };

    fetchData(); // Call fetchData here
  }, []);



  return (
    <main>
      <div>Name: {res}</div>
    </main>
  );
}

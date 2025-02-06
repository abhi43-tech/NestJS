import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem('jwtToken', token);  
      window.location.href = "http://localhost:3001";
    }
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = "http://localhost:3000/user/google/login";
  };

  return (
    <div className="App">
        <button onClick={handleLoginRedirect}>Login with Google</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import API_URL from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("API_URL:", API_URL);
    console.log("Enviando a:", `${API_URL}/login`);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("RESPUESTA:", data);

      if (res.ok) {
        setMensaje("Login correcto");
      } else {
        setMensaje(data.error || "Error en login");
      }
    } catch (error) {
      console.error("ERROR FETCH:", error);
      setMensaje("No se pudo conectar al servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Clave" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Ingresar</button>
      <p>{mensaje}</p>
    </form>
  );
}

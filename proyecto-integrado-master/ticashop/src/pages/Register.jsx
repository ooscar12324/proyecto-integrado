import { useState } from "react";
import API_URL from "../api";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) setMsg("Usuario registrado");
    else setMsg(data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" type="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" type="password" placeholder="Clave" onChange={handleChange} />

      <button type="submit">Crear cuenta</button>

      <p>{msg}</p>
    </form>
  );
}

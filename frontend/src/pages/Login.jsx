import { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
  };

  return (
    <div>
      <input
        placeholder="Enter email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

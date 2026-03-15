import { useState } from "react";
import API from "../api";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try{
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard")
  }catch(err){
      console.log(err.response?.data || err.message)
    }
}

  return (
    <div>
      <input
        placeholder="Enter email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br/> <br/>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br/> <br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

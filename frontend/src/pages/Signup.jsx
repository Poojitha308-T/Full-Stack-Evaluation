import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./../api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/signup", form);

      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="container">
      <input
        placeholder="Enter name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br /> <br />
      <input
        placeholder="Enter email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br /> <br />
      <input
        placeholder="Enter Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br /> <br />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}

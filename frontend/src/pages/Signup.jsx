import { useState } from "react";
import API from './../api';

export default function Signup(){
    const [ form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handlesubmit = async() => {
        const res = await API.post("/auth/signup", form);
        localStorage.setItem("token", res.data.token);
    };


    return(
        <div>
            <input placeholder = "Enter name" onChange={(e)=>setForm({...form,name:e.target.value})}/>

            <input placeholder="Enter email" onChange={(e) => setForm({...form, email: e.target.value})}/>

            <input placeholder="Enter Password" onChange={(e)=>setForm({...form, password: e.target.value})}/>

            <button onClick={handlesubmit}>Signup</button>
        </div>
    );
};
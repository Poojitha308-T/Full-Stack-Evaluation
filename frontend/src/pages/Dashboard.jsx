import { useEffect, useState } from "react";
import API from './../api';

export default function Dashboard(){
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        API.get("/account/balance").then(res=>setBalance(res.data.balance))
    },[]);

    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Balance: {balance}</h2>
        </div>
    )
};


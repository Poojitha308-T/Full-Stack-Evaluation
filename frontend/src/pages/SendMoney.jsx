import { useEffect, useState } from "react";
import API from "./../api";

export default function SendMoney() {
  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    API.get("/account/users").then((res) => setUsers(res.data));
  }, []);

  const handlesend = async () => {
    await API.post("/account/transfer", { receiverId: receiver, amount });
    alert("Transaction successful");
  };

  return (
    <div>
      <select onChange={(e) => setReceiver(e.target.value)}>
        <option>Select user</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handlesend}>Send</button>
    </div>
  );
}

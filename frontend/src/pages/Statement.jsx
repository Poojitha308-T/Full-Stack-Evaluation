import { useEffect, useState } from "react";
import API from "./../api";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("/account/statement").then((res) => setTransactions(res.data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => (
          <tr
            key={t.id}
            style={{ color: t.type === "credit" ? "green" : "red" }}
          >
            <td>{new Date(t.created_at).toLocaleDateString()}</td>
            <td>{t.type}</td>
            <td>{t.amount}</td>
            <td>{t.sender_id}</td>
            <td>{t.receiver_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const supabase = require("@supabase/supabase-js");

exports.getBalance = async (req, res) => {
  const { data } = await supabase
    .from("users")
    .select("balance")
    .eq("id", req.user.id)
    .single();

  res.json(data);
};

exports.getUsers = async (req, res) => {
  const { data } = await supabase.from("users").select("id, name, email");

  res.json(data);
};

exports.transfer = async (req, res) => {
  const { receiverId, amount } = req.body;

  const senderId = req.user.id;

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single();

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient Balance" });
  }

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("id", receiverId)
    .single();

  await supabase
    .from("users")
    .update({ balance: sender.balance - amount })
    .eq("id", senderId);

  await supabase
    .from("users")
    .update({ balance: receiver.balance + amount })
    .eq("id", receiverId);

  await supabase.from("transactions").insert([
    {
      sender_id: senderId,
      receiver_id: receiverId,
      amount,
      type: "debit",
    },
    {
      sender_id: senderId,
      receiver_id: receiverId,
      amount,
      type: "credit",
    },
  ]);

  res.json({ message: "Transfer successful" });
};

exports.getStatement = async (req, res) => {
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${req.user.id}, receiver_id.eq.${req.user.id}`)
    .order("created_at", { ascending: false });

  res.json(data);
};

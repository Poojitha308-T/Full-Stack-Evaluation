const supabase = require("../config/supabaseClient");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashed, balance: 10000 }])
      .select()
      .single();

    if (error) return res.status(400).json(error);

    const token = generateToken(data);

    res.json({ user: data, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!data) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, data.password);

    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(data);

    res.json({ user: data, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

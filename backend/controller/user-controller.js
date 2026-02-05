import User from "../model/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required","success":false });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "User already exists","success":false });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully","success":true });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required","success":false });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found","success":false });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password","success":false });
  }
  const token = jwt.sign({ id: user._id,name:user.name,email:user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token,"userId":user._id,"success":true });
}

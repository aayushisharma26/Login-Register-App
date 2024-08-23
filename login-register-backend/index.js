import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Checking for existing user with email:", email); 
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User found:", existingUser); 
      res.send({ message: "User already registered" });
    } else {
      console.log("No user found, creating new user"); 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); 

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.send({ message: "Successfully Registered, Please login now." });
    }
  } catch (error) {
    console.error("Error during registration:", error); 
    res.status(500).send({ error: "An error occurred" });
  }
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Attempting to login user with email:", email); 
    const user = await User.findOne({ email: email });

    if (user) {
      console.log("User found:", user); 
      const isMatch = await bcrypt.compare(password, user.password); 
      if (isMatch) {
        res.status(200).send({ message: "Login Successful", user: user });
      } else {
        res.status(400).send({ message: "Password didn't match" });
      }
    } else {
      console.log("No user found with email:", email);
      res.status(404).send({ message: "User not registered" });
    }
  } catch (err) {
    console.error("Error during login:", err); 
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`BE started at port ${PORT}`);
});

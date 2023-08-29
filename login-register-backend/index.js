import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/my", {
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


//login
app.post("/login", (req, res)=> {
  const { email, password} = req.body
  User.findOne({ email: email}, (err, user) => {
      if(user){
          if(password === user.password ) {
              res.send({message: "Login Successfull", user: user})
          } else {
              res.send({ message: "Password didn't match"})
          }
      } else {
          res.send({message: "User not registered"})
      }
  })
}) 







app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();
      res.send({ message: "Successfully Registered, Please login now." });
    }
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
});

app.listen(9003, () => {
  console.log("BE started at port 9003");
});

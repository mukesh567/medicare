import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "60d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    //Check if user exits
    if (user) {
      return res.status(400).json({ message: "User already exits!" });
    }

    //Hash the password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, saltRound);

    //Update password with hash password
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hash_password,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hash_password,
        photo,
        gender,
        role,
      });
    }

    //Save into DB (You can use create or save)
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!,Try again" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;

    //Find out from both the models
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    //Not found
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    //User found then compare the password which is stored during register
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //If password not match
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials!" });
    }

    //Password match then
    //Generate token
    const token = generateToken(user);

    //Without these items ...rest in rest
    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Login Successfully",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to login!" });
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Retailer = require("../models/retailerModel");
const Client = require("../models/clientModel");
const { signupSchema, loginSchema } = require("../validation.js");

// Secret key for JWT
const secretKey =
  "8722763f8df13ed5941a7e8d291642a1cab30d4d821f6b77e59fbbef01038bd9";

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
  return accessToken;
};
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ userId: user._id }, refreshSecretKey, {
    expiresIn: "7d", 
  });
  return refreshToken;
};

// Function to create a default Client document for a User
const createDefaultClient = async (userId) => {
  try {
    const defaultClientData = {
      orderHistory: [],
      wishList: [],
      cart: {
        bookIDs: [],
        totalPrice: 0,
      },
      userID: userId, // Link the Client document to the User
    };

    const client = new Client(defaultClientData);
    await client.save();
  } catch (error) {
    console.error("Error creating default Client:", error);
  }
};

// Function to create a default Retailer document for a User
const createDefaultRetailer = async (userId) => {
  try {
    const defaultRetailerData = {
      listedBooks: [],
      salesHistory: [],
      userID: userId, // Link the Retailer document to the User
    };

    const retailer = new Retailer(defaultRetailerData);
    await retailer.save();
  } catch (error) {
    console.error("Error creating default Retailer:", error);
  }
};
exports.signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, email,password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Signup successful", token });

    if (role === "Client") {
      await createDefaultClient(user._id);
    }
    if (role === "Retailer") {
      await createDefaultRetailer(user._id);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const role = user.role;
    const userId = user._id;
    // Generate a JWT token
    const accessToken = generateAccessToken(user);

    res
      .status(200)
      .json({
        message: "Login successful",
        accessToken,
        username,
        role,
        userId,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

};

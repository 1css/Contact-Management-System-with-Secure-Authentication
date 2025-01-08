const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/login");

const User = require("../models/User");
const auth=require("../middlewares/auth")
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "please enter the all fields" });

  // name validation
  if (name.length > 25) {
    return res.status(400).json({ error: "the name is too long" });
  }
  //email validation
  const emailReg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!emailReg.test(email)) {
    return res
      .status(400)
      .json({ error: "please enter teh valid email address" });
  }

  // pwd validtion
  if (password < 6) {
    return res
      .status(400)
      .json({ error: "the password should be atleast 6 character long" });
  }
  try {
    const doesUSerAlreadyexist = await User.findOne({ email });

    if (doesUSerAlreadyexist)
      return res
        .status(400)
        .json({ error: "you give an email addree is already exist" });

    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: hashpassword });

    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body,"body");
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "please mention a correct email or password" });
  }

  //email validation
  const emailReg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!emailReg.test(email)) {
    return res
      .status(400)
      .json({ error: "please enter teh valid email address" });
  }

  try {
    const doesUSerExist = await User.findOne({ email });

    if (!doesUSerExist) {
      return res.status(400).json({ error: "invlaid email or password!" });
    }

    const doespassowrdMatch = await bcrypt.compare(
      password,
      doesUSerExist.password
    );

    if (!doespassowrdMatch) {
      return res.status(400).json({ error: "invalid email or password!" });
    }

    const payload = { _id: doesUSerExist._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    const user={...doesUSerExist._doc,password:undefined}
    return res.status(400).json({ token,user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me",auth, async(req,res)=>{
   return res.status(200).json({...req.user._doc});
});

module.exports = router;

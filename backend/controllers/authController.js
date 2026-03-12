const User = require("../models/User");

exports.register = async (req,res)=>{
try{

const {name,email,password,role} = req.body;

// find last user
const lastUser = await User.findOne().sort({userId:-1});

let newId = "001";

if(lastUser){
const num = parseInt(lastUser.userId) + 1;
newId = String(num).padStart(3,"0");
}

const user = new User({
userId:newId,
name,
email,
password,
role
});

await user.save();

res.json(user);

}catch(err){
res.status(500).json({error:err.message});
}
};
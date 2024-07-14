let mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:{ type : String}, // String is shorthand for {type: String}
  email: {type : String ,
     require : true},
  password: {type: String , require : true , uniqure : true},
  
},{timestamps : true});

let user =  mongoose.model('user' , UserSchema)

module.exports = user;
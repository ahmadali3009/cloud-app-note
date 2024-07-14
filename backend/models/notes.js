let mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title: String, // String is shorthand for {type: String}
  description: {type : String ,
     require : true},
  tag: {type: String , require : true , uniqure : true},

  
});

let note =  mongoose.model('note' , NoteSchema)

module.exports = note;
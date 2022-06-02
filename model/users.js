const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')
// const Booking=require('../model/booking')


const UserSchema  = new mongoose.Schema({

firstname:{
    type:String,
    require:true,
    trim:true
},
lastname:{
    type:String,
    require:true,
    trim:true
},
username:{
    type:String,
    require:true,
    trim:true
},
email:{
    type:String,
    require:true,
    trim:true,
    lowercase:true,
},
password:{
    type:String,
    require:true,
    trim:true,
},
number:{
    type:String,
    require:true
},
address:{
    type:String,
    require:true
}
})

// UserSchema.virtual('booking', {
//     ref: 'Booking',
//     localField: '_id',
//     foreignField: 'owner'
// })


const User = mongoose.model('User', UserSchema);

module.exports = User
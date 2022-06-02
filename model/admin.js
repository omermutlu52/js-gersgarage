const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')

const AdminSchema  = new mongoose.Schema({
username:{
    type:String,
    require:true,
    trim:true
},
password:{
    type:String,
    require:true,
    trim:true,
}
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin
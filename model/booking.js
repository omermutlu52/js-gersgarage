const mongoose= require('mongoose')

const UserSchema  = new mongoose.Schema({

    vehicle_make:{
        type:String,
        require:true,
        trim:true
    },
    vehicle_type:{
        type:String,
        require:true,
        trim:true
    },
    vehicle_name:{
        type:String,
        require:true,
        trim:true
    },
    vehicle_model:{
        type:String,
        require:true,
        trim:true,
    },
    vehicle_lesNumber:{
        type:String,
        require:true,
        trim:true,
    },
    vehicle_engineType:{
        type:String,
        require:true
    },
    vehicle_bookingType:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true,
        trim:true
    },
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    
    email:{
        type:String,
        require:true,
        trim:true
    },
    number:{
        type:String,
        require:true,
        trim:true
    },
    username:{
        type:String,
        require:true
    },
    spare_part:{
    type:String,
    require:true,
    trim:true
    },
    staff:{
        type:String,
        require:true,
        trim:true
    },
    spare_price:{
        type:String,
        require:true,
        trim:true
    }
    
})

const Booking = mongoose.model('Booking', UserSchema);

module.exports = Booking
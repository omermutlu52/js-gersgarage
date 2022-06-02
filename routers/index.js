const express = require('express');
const router = express.Router();
const User = require('../model/users')
const Booking=require('../model/booking')
const Admin=require('../model/admin')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', (req,res)=>{res.render('welcome',{
    user:req.user
})})
router.get('/about', (req,res)=>{res.render('about',{
    user:req.user
})})
router.get('/contact', (req,res)=>{res.render('contact',{
    user:req.user
})})
router.get('/register', (req,res)=>{res.render('register'),{
    user:req.user
}})

router.get('/admin-reg', (req,res)=>{res.render('admin-reg'),{
  user:req.user
}})
router.get('/login', (req,res)=>{res.render('login',{
    user:req.user

})})
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
Booking.find({username:req.user.username},function(err,data){
  res.render('dashboard', {
    user: req.user,
    booking:data
  })
})
);

router.get('/booking', ensureAuthenticated,(req, res) =>
  res.render('booking', {
    user: req.user
  })
);


//Register Page

router.post('/register', (req, res) => {
    const { firstname,lastname,username, email, password, confirmPassword,number,address } = req.body;
    let errors = [];
  
  
    if (password != confirmPassword) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        number,
        address
      },console.log(req.body));
    } else {
      User.findOne({ username: username }).then(user => {
        if (user) {
          errors.push({ msg: 'username already exists' });
          res.render('register', {
        errors,
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        number,
        address
          },console.log(req.body));
        } else {
          const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password,
            confirmPassword,
            number,
            address
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

  router.post('/booking', (req, res) => {
    const { vehicle_make,vehicle_type,vehicle_name,vehicle_model,vehicle_lesNumber,vehicle_engineType,vehicle_bookingType,date,description,fname,lname,user,number,email,username } = req.body;
    let errors = [];
    let price=0;
    Booking.find({date:date}).then((data)=>{
     let book=0;
     data.forEach(function (res){
        if(vehicle_bookingType == 'Major Repair'){
         book+=2;
        }else{
          book+=1 
        }
     })
      
    if(vehicle_bookingType == 'Major Repair'){
     price=200;
    }

    if(vehicle_bookingType == 'Annual Service'){
      price=75;
    }

     if(vehicle_bookingType == 'Major Service'){
      price=150;
    }

     if(vehicle_bookingType == "Repair / Fault"){
      price=100;
    }
 
     if(book>10){
        req.flash(
          'error_msg',
          'We are fully booked chosen date please choose another day'
        );
    res.redirect('/booking');
     }else{
      const newBooking = new Booking({
        vehicle_make,
        vehicle_type,
        vehicle_name,
        vehicle_model,
        vehicle_lesNumber,
        vehicle_engineType,
        vehicle_bookingType,
        date,
        description,
        fname,
        lname,
        number,
        email,
        username,
        price
      });
  
     
        newBooking.save().then(user=>{
          req.flash(
            'success_msg',
            'Your booking has been made'
          );
      res.redirect('/dashboard');
        }).catch((err)=>{
        console.log(err)
        })
     }
    
    }).catch((e)=>{
      console.log(e)
    })        
      });


  // Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
  
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
  

  router.post('/admin-reg', (req, res) => {
    const {username, password, confirmPassword } = req.body;
    let errors = [];
  
  
    if (password != confirmPassword) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (errors.length > 0) {
      res.render('admin-reg', {
        username,
        password,
        confirmPassword,
      },console.log(req.body));
    } else {
      Admin.findOne({ username: username }).then(user => {
        if (user) {
          errors.push({ msg: 'username already exists' });
          res.render('register', {
        errors,
        username,
        password,
        confirmPassword,
          },console.log(req.body));
        } else {
          const newAdmin = new Admin({
            username,
          
            password,
            confirmPassword,
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin
                .save()
                .then(user => {
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

module.exports=router;
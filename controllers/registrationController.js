import registerModel from "../models/RegistrationModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import {JSDOM} from 'jsdom'
import ejs from 'ejs'

// const html = '<!DOCTYPE html><html><body><div id="myDiv" class="alert"></div></body></html>';
const dom = new JSDOM(`<div> ${ejs.render('login')} </div>`);
// const dom = new JSDOM(`<div> ${ejs.render('register')} </div>`);
const window = dom.window;
const document = window.document;


class RegistrationController {
  static getRegisterDocs = (req, res) => {
    res.render("register");
  };

  static getLoginDocs = (req, res) => {
    res.render("login");
          
  };




  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation} = req.body;
    console.log(req.body)
    const user = await registerModel.findOne({ email: email });
    if (user) {
      // res.status(400).json({ message: 'All fields are required!!!' });
      // alert("Email already exists")
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new registerModel({
              name: name,
              email: email,
              password: hashPassword,
            });
            const result = await doc.save();
            console.log(result)
            const save_user = await registerModel.findOne({ email: email });

            // Generate JWT Token
            const token = jwt.sign(
              { userID: save_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

              // Redirect to login page
              res.redirect('/login');
            
          } catch (error) {
           res.send({ status: "failed", message: "Unable to  Register" });
          }
        } else {
          res.send({
            status: "failed",
            message: "password and password confirmation does not matched",
          });
        }
      } else {   
        // res.send({ status: "failed", message: "All fields are required" });
      }
    }
    // res.redirect('/login');

  };



  static userLogin = async (req,res) => {
    try {
        const {email, password} = req.body
        if (email && password) {
            const user = await registerModel.findOne({email: email})
            if (user != null ) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ( (user.email === email) && isMatch) {

                    //Generte JWT Token
                    // const token = jwt.sign({userID:user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                     res.redirect('/');
                    // res.send({"status": "Success", "message": "Login Successfull...", }) 
                } else {
                    res.send({"status": "failed", "message": "Email or Password not Matched" }) 
                }
            } else {
                res.send({"status": "failed", "message": "You are not a Registered User" })             
            }
        } else {
            res.send({"status": "failed", "message": "All Fields are Required" })
        }
       
    } catch (error) {
        console.log(error)
        res.send({"status": "failed", "message": "Unable to Login " }) 
    }
}
}

export default RegistrationController;

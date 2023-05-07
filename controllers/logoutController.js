import registerModel from "../models/RegistrationModel.js";
import feedbackModel from "../models/FeedbackModel.js";

class LogoutController {
    static getLogoutDocs = (req,res)=>{
        res.render('dashboard');
    }

    static deleteDocsById = async (req,res)=>{
        try {
            // console.log(req.params.id)
            const result = await registerModel.findByIdAndDelete(req.params.id)
            console.log(result)
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    static getFeedbackDocs = (req,res)=>{
        res.render('feedback')
    }

    static postFeedbackDocs = async (req,res)=>{
        try {
            const {userFeedback} = req.body
            console.log(req.body)
            const docs = new feedbackModel({
                userFeedback
            })
            const result = await docs.save()
            console.log(result)
            res.redirect('/feedback')
        } catch (error) {
         console.log(error)   
        }
    }
}

export default LogoutController
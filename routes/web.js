import BookingController from "../controllers/bookingControllers.js";
import RegistrationController from "../controllers/registrationController.js";
import LogoutController from "../controllers/logoutController.js";

// var paypal = require('paypal-rest-sdk');
import paypal from "paypal-rest-sdk"

import express from 'express';
const router = express.Router();

// public routes
router.get('/register/', RegistrationController.getRegisterDocs)
router.post('/register/', RegistrationController.userRegistration)


router.get('/login', RegistrationController.getLoginDocs)
router.post('/login/', RegistrationController.userLogin)


//logout
router.get('/dashboard/', LogoutController.getLogoutDocs)
router.post('/dashboard/', LogoutController.deleteDocsById)


// protected routes
router.get('/', BookingController.getAllDocs)
// router.post('/book-parking', BookingController.postAllDocs)

router.get('/book-parking', BookingController.getbookParkingForm)
router.post('/book-parking', BookingController.postbookParkingForm)

router.get('/view-booking', BookingController.getViewBooking)

router.get('/feedback', LogoutController.getFeedbackDocs)
router.post('/feedback', LogoutController.postFeedbackDocs)


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeeGPvi97HrmCz_Zm819klx95N3XelRdxH_G_ctw4rUaM0DARW5et9Fa2vViUUN1Vy5V8TwOsSlTgaJ-',
    'client_secret': 'ECJUw10lPqtxFWOOi1ZcQ0o6rVPWIo8B7N2ntmS7g85ZGwnQccIUMEKBOTVLNBODITfhLHZ9ifSXZa2Q'
});

router.get('/', function(req, res) {
    res.render('navbar');
});

router.get('/pay', function(req, res) {
    var payment = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': 'http://localhost:4000/view-booking',
            'cancel_url': 'http://localhost:4000/cancel'
        },
        'transactions': [{
            'amount': {
                'currency': 'USD',
                'total': '10.00'
            },
            'description': 'Test Payment'
        }]
    };

    paypal.payment.create(payment, function(error, payment) {
        if (error) {
            console.log(error);
        } else {
            for(var i=0;i<payment.links.length;i++){
                if(payment.links[i].rel==='approval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

router.get('/view-booking', function(req, res) {
    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId;

    var execute_payment = {
        'payer_id': payerId,
        'transactions': [{
            'amount': {
                'currency': 'USD',
                'total': '10.00'
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment, function(error, payment) {
        if (error) {
            console.log(error);
        } else {
            console.log(JSON.stringify(payment));
            res.render('viewBooking', { paymentId: paymentId });
        }
    });
});

router.get('/cancel', function(req, res) {
    res.render('cancel');
});



export default router
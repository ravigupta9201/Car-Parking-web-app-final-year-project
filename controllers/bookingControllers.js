import bookingModel from "../models/BookingModel.js"
import mqtt from "mqtt"
// import ParkingSlotModel from "../models/ParkingSlotModel.js";

class BookingController {


    static getAllDocs = (req,res)=>{

        const options = {
            username: 'RaviGupta01',
            password: 'aio_GMVY12mV1Djmgh5cVXBlDZ8OEC31'
        };
        const client = mqtt.connect('mqtt://io.adafruit.com', options);

            // Get the latest sensor value from your Adafruit IO MQTT client
            let sensorValue = null;
            client.on('connect', () => {
              console.log('Connected to Adafruit IO MQTT broker');
              client.subscribe('RaviGupta01/f/EntrySlot1');
            });
          
            client.on('message', (topic, message) => {
              sensorValue = parseInt(message.toString());
              console.log(`Received sensor value: ${sensorValue}`);
            });
          
            // Render the EJS template and pass the sensorValue variable as a local variable
            res.render('index', { sensorValue: sensorValue });
          
    }

    // static getAllDocs = async (req,res)=>{

    //     try {
            
    //         const parkingSlots = [];

    //         // create 5 parking slots and add them to the array
    //         for (let i = 1; i <= 5; i++) {
    //         const slot = {
    //             slotNo: i,
    //             status: 'Available'
    //         };
    //         parkingSlots.push(slot);
    //         }
    //         // console.log(parkingSlots);

    //         const docs = new ParkingSlotModel({
    //             parkingSlots
    //         })

    //         const result = await docs.save()
    //         console.log(result)

    //         res.render('index', { parkingSlots: parkingSlots })

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    static getbookParkingForm = (req,res)=>{
        res.render('bookParking')
    }

    static postbookParkingForm = async (req,res)=>{
        try {
            const {phone, vehicletype, plateno, date, time , hours} = req.body
            console.log(req.body)
            const docs = new bookingModel({
                phone, vehicletype, plateno, date, time, hours
            })

            const result = await docs.save()
            console.log(result)
            res.redirect('/pay')
        } catch (error) {
            console.log(error)
        }
    }

    static getViewBooking = async (req,res)=>{
        try {
            const result = await bookingModel.find()
            // console.log(result)
            res.render('viewBooking', {data:result})
        } catch (error) {
            console.log(error)
        }
    }
}

export default BookingController
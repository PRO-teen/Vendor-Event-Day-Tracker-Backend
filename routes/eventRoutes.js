const express =require('express');
const multer = require('multer');
const Event = require('../models/Event');
const router = express.Router();


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ '_' + file.originalname);
    },
});

const upload = multer({storage});


//router 

router.post('/checkin',upload.single("photo"),async(req,res)=>{
    try{
        const {vendorId,latitude,longitude} = req.body;
        if(!vendorId || !req.file){
            return res.status(400).json({message:'Missing data'});
        }

        //generate

        const startOtp = Math.floor(1000+Math.random()*9000).toString();

        const event = await Event.create({
            vendor:vendorId,
            checkInPhoto:req.file.path,
            latitude,
            longitude,
            checkInTime:new Date(),
            startOtp,
            status:'CHECKED_IN',
        });

        res.json({
            message:'Check-in successful',
            eventId:event._id,
            otp:startOtp,
        });
    }catch(error){
        res.status(500).json({message:"Check-in failed"});
    }
});

// Verify start OTP
router.post('/start', async (req, res) => {
  try {
    const { eventId, otp } = req.body;

    if (!eventId || !otp) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.startOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    event.status = 'STARTED';
    event.startOtp = null; // OTP used once
    await event.save();

    res.json({ message: 'Event started successfully' });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed' });
  }
});

//pre 
router.post(
  '/pre-setup',
  upload.single('photo'),
  async (req, res) => {
    try {
      const { eventId } = req.body;

      if (!eventId || !req.file) {
        return res.status(400).json({ message: 'Missing data' });
      }

      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.status !== 'STARTED') {
        return res.status(400).json({ message: 'Event not started' });
      }

      event.preSetupPhoto = req.file.path;
      await event.save();

      res.json({ message: 'Pre-setup photo uploaded' });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed' });
    }
  }
);

//post

router.post(
  '/post-setup',
  upload.single('photo'),
  async (req, res) => {
    try {
      const { eventId, notes } = req.body;

      if (!eventId || !req.file) {
        return res.status(400).json({ message: 'Missing data' });
      }

      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.status !== 'STARTED') {
        return res.status(400).json({ message: 'Event not started' });
      }

      event.postSetupPhoto = req.file.path;
      event.notes = notes || '';
      await event.save();

      res.json({ message: 'Post-setup photo uploaded' });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed' });
    }
  }
);

// Generate final OTP
router.post('/generate-end-otp', async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID required' });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'STARTED') {
      return res.status(400).json({ message: 'Event not started' });
    }

    const endOtp = Math.floor(1000 + Math.random() * 9000).toString();
    event.endOtp = endOtp;
    await event.save();

    res.json({
      message: 'Final OTP generated',
      otp: endOtp, // mocked
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate OTP' });
  }
});



// Verify final OTP and complete event
router.post('/complete', async (req, res) => {
  try {
    const { eventId, otp } = req.body;

    if (!eventId || !otp) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.endOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    event.status = 'COMPLETED';
    event.endOtp = null;
    await event.save();

    res.json({ message: 'Event completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Completion failed' });
  }
});




module.exports = router;

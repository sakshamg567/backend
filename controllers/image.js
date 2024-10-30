const Greeting = require('../models/greeting');
const cloudinary = require('../services/cloudinary');
(async () => {
 const { nanoid: importedNanoid } = await import('nanoid');
 nanoid = importedNanoid; // Assign it to a variable
})();

async function handleImageUpload(req, res) {
 try {
   const image = req.file; 
   const { name, message } = req.body;

   if (!image) {
     return res.status(400).json({ error: 'No image file provided' });
   }

   const uid = nanoid(8); // Generate unique ID

   // Create a Cloudinary upload stream
   const stream = cloudinary.uploader.upload_stream(
     { resource_type: 'auto' },
     async (error, result) => {
       if (error) {
         console.error("Cloudinary upload error:", error);
         return res.status(500).json({ error: 'Cloudinary upload failed' });
       }

       // Create and save the new greeting document
       const newGreeting = new Greeting({
         uniqueId: uid,
         imageUrl: result.secure_url,
         name: name,
         message: message,
       });
       await newGreeting.save();

       // Respond with the unique ID and greeting URL
       res.json({ publicId: uid, greetingURL: result.secure_url });
     }
   );

   // Write the image buffer to the Cloudinary upload stream
   stream.end(image.buffer); // Ensure this is at the end to trigger the upload
 } catch (error) {
   console.error("Error in handleImageUpload:", error);
   res.status(500).json({ error: 'Image upload failed' });
 }
}


async function handleGetImageURL(req, res) {
  const publicId = req.params.id;
  console.log(publicId);
  const greeting = await Greeting.findOne({uniqueId: publicId}).then(
   console.log('Greeting found')
  );
  res.json({greetingURL: greeting.imageUrl});
}

module.exports = {
 handleImageUpload,
 handleGetImageURL
};
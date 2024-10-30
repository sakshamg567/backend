module.exports = (req, res) => {
 // Check the HTTP method
 if (req.method === 'GET') {
     res.status(200).json({ message: "Hello from your endpoint!" });
 } else {
     // Handle other HTTP methods, if necessary
     res.status(405).json({ error: "Method Not Allowed" });
 }
};

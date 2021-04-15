// Sample attempt at how controllers work

exports.create = (req, res) => {
    res.json({
        "message": ["Greetings!", "Hello from server!"] 
    });
};
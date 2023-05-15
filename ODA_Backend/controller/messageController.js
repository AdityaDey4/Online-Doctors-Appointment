const Message = require("../model/Message");

const getAllMessage = async (req, res)=> {
    const message = await Message.find();

    if(message.length === 0) {
        return res.status(204).json({"message" : "No Messages Found"})
    }
    res.json(message);
}

const postMessage = async (req, res)=> {
     const {name, email, message} = req.body;

     try {
        const result = await Message.create({
            "name" : name,
            "email" : email,
            "message" : message
         })

         res.status(201).json(message);
     }catch(err) {
        res.status(500).json(err.message);
     }
}

module.exports = {
    getAllMessage,
    postMessage
}
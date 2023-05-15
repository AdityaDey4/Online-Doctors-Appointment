const mongoose = require("mongoose");

const connectDB = async () => {

  // mongoose
  //   .connect("mongodb://localhost:27017/oda", {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     family: 4,
  //   })
  //   .then(console.log("Connection established with mongodb"))
  //   .catch((err) => console.log("Connection is not established with mongodb"));

  try{

    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    });
    console.log("Connected with Mongo DB");
  }catch(err) {
      console.log("Error while connect");
      console.error(err);
  }
};

module.exports = connectDB;

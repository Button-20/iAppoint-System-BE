const mongoose = require("mongoose");

try {
  mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
} catch (error) {
  console.error("Error establishing MongoDB connection:", error);
}

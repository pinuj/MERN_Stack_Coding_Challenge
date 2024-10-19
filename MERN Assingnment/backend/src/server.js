const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://pujapatil0092:AAkaPpDEZw7SlPO6@cluster0.hixn0.mongodb.net/transactionsDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

app.use('/api', transactionRoutes);

// Start the server
const PORT =5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

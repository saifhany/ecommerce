const express = require('express');
const dotenv = require('dotenv');
 dotenv.config();
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MONGOURL} = require('./key');
// routes
app.use(express.json());
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
//  environment variable or you can say constants
// env.config();


app.use(bodyParser.urlencoded({
    extended: true
  }));
//   app.use(express.json());
app.use('/api',adminRoutes);
app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

mongoose.connect(MONGOURL , { 
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
mongoose.connection.on('connected',()=> { 
    console.log("connected to mongo");
})
mongoose.connection.on('error',(err)=> { 
    console.log("err connecting ",err);
})

app.listen(PORT, ()=>{ 
    console.log("server is running on",PORT)
})
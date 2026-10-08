require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

async function server(){

    await connectDB();

    const port = process.env.PORT;

    app.listen(port, ()=>{
        console.log(`Server Started on ${port}`);
    });

}

server();
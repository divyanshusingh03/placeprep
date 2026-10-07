require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

async function server(){

    await connectDB();

    const port = process.env.PORT;

    app.listen(port, ()=>{
        console.log(`Server Started on ${port}`);
    });

}

server();
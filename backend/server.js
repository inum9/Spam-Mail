import dotenv from 'dotenv';
import app from './src/utils/app.js';
import {connectDB} from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
connectDB()
.then(()=>{
  app.listen(PORT,()=>{
      console.log(`server is running  on port ${PORT}`);
      
  });
})



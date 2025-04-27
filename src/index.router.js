import cors from 'cors';
import connectDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';

const initApp = async (app , express)=>{
    app.use(express.json());
    app.use(cors());
    connectDb();


    app.get('/', async (req, res) => {
      return res.status(200).json({ message: "Welcome to 3leina stage"});
    });

    app.use('/auth', authRouter);
   
    app.use((err,req,res,next)=>{
        return res.status(err.statusCode).json({message:err.message});
    });

}


export default initApp;
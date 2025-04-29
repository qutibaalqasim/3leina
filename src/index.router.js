import cors from 'cors';
import connectDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';
import deliveryRouter from './modules/deliveryAgent/delivery.router.js';
import categoryRouter from './modules/category/category.router.js';
import adminRouter from './modules/admin/admin.router.js';

const initApp = async (app , express)=>{
    app.use(express.json());
    app.use(cors());
    connectDb();


    app.get('/', async (req, res) => {
      return res.status(200).json({ message: "Welcome to 3leina stage"});
    });

    // url/auth
    app.use('/auth', authRouter);
    // url/users
    app.use('/users', userRouter);
    // url/delivery
    app.use('/delivery', deliveryRouter);
    // url/admin
    app.use('/admin', adminRouter);
    // url/category
    app.use('/category', categoryRouter);
    app.use((err,req,res,next)=>{
        return res.status(err.statusCode).json({message:err.message});
    });

}


export default initApp;
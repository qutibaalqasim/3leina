import cors from 'cors';
import connectDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';
import deliveryRouter from './modules/deliveryAgent/delivery.router.js';
import categoryRouter from './modules/category/category.router.js';
import adminRouter from './modules/admin/admin.router.js';
import subCategoryRouter from './modules/subCategory/subCategory.router.js';
import productRouter from './modules/product/product.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';
import favoriteRouter from './modules/favorite/favorite.router.js';
import suggestionRouter from './modules/suggestion/suggestion.router.js';
import orderRouter from "./modules/order/order.router.js";
//import paymentRouter from "./modules/payment/payment.router.js";
import chatRouter from './modules/chat/chat.router.js';

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
    // url/subCategory
    app.use('/subCategory', subCategoryRouter);
    // url/product
    app.use('/product', productRouter);
    // url/coupon
    app.use('/coupon', couponRouter);
    // url/cart
    app.use('/cart', cartRouter);
    // url/favorite
    app.use('/favorite', favoriteRouter);
    // url/suggestion
    app.use('/suggestion', suggestionRouter);
    // url/order
    app.use('/order', orderRouter);
    // url/payment
   // app.use('/payment', paymentRouter);
    // url/chat
    app.use('/chat', chatRouter);

    app.use((err,req,res,next)=>{
        return res.status(err.statusCode).json({message:err.message});
    });

}


export default initApp;
import paymentModel from "../../../DB/models/payment.model.js";
import { AppError } from "../../utils/AppError.js";
import { stripe } from "./stripe.js";



export const initiatePayment = async (req, res, next) => {
    const {amount , currency = 'USD', paymentMethodId , method = 'card'} = req.body;
    const intent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        payment_method: paymentMethodId,
        confirm: true,
        metadata:{
            userId: req.id
        }
    });

    const payment = await paymentModel.create({
        userId: req.id,
        orderId: req.body.orderId,
        amount,
        currency,
        paymentMethod: method,
        status: intent.status,
        provider: 'stripe',
        providerPaymentId: intent.id
    });

    if(!payment){
        return next (new AppError("payment failed", 400));
    }

    return res.status(201).json({message:"success", payment});
}

export const getAllPayments = async (req, res, next) => {
    const payments = await paymentModel.find({});
    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found", 404));
    }
    return res.status(200).json({ message: "success", payments });
}

export const getPaymentsByUser = async (req, res, next) => {
    const payments = await paymentModel.find({ userId: req.id });
    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this user", 404));
    }
    return res.status(200).json({ message: "success", payments });
}

export const getPaymentById = async (req, res, next) => {
    const { id } = req.params;
    const payment = await paymentModel.findById({_id:id});
    if (!payment) {
        return next(new AppError("Payment not found", 404));
    }
    return res.status(200).json({ message: "success", payment });
}

export const updateStatus = async (req, res, next) => {
    const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
    );
}
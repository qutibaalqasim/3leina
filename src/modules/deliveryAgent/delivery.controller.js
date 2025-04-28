import userModel from "../../../DB/models/user.model.js"


export const getAllDelivery = async (req, res,next) => {
    const delivery = await userModel.find({role: "delivery_Agent"});
    if (!delivery) {
        return next(new Error("No delivery agents found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", delivery});
}
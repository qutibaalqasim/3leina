import messageModel from "../../../DB/models/message.model.js";
import { AppError } from "../../utils/AppError.js";


export const getMessages = async (req, res, next) => {
    const {userId} = req.id;
    const {withUserId} = req.params;
    const Message = await messageModel.find({
        $or: [
            {from: userId, to: withUserId},
            {from: withUserId, to: userId}
        ]
    }).sort({timestamps: 1});

    if(!Message || Message.length == 0){
        return next(new AppError("no messages found", 404));
    }

    return res.status(200).json({message:"success", Message});
}
import userModel from "../../../DB/models/user.model.js";



export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find({role: 'user'});
    if (!users) {
        return next(new Error("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}


export const getActiveUsers = async (req, res, next) => {
    const users = await userModel.find({role: 'user', status: 'active'});
    if (!users) {
        return next(new Error("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}
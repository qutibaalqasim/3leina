import favoriteModel from "../../../DB/models/favorite.model.js";


export const addToFavorite = async (req, res, next) => {
    const { userId, productId } = req.body;
    const favorite = await favoriteModel.findOne({ userId: req.id });
    if(!favorite){
        if(productId){
            const newFavorite = await favoriteModel.create({ userId: req.id, favoriteProducts: [ productId ] });
            return res.status(201).json({ message: "Added to favorite", newFavorite });
        }else if(userId){
            const newFavorite = await favoriteModel.create({ userId: req.id, favoriteUsers: [ userId ] });
            return res.status(201).json({ message: "Added to favorite", newFavorite });
    }
}
    if (productId) {
        const updatedFavorite = await favoriteModel.findOneAndUpdate(
            { userId: req.id },
            { $addToSet: { favoriteProducts:  productId  } },
            { new: true }
        );
        return res.status(200).json({ message: "Added to favorite", updatedFavorite });
    } else if (userId) {
        const updatedFavorite = await favoriteModel.findOneAndUpdate(
            { userId: req.id },
            { $addToSet: { favoriteUsers:  userId  } },
            { new: true }
        );
        return res.status(200).json({ message: "Added to favorite", updatedFavorite });
    }
}
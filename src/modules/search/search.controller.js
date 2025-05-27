import categoryModel from "../../../DB/models/category.model.js";
import productModel from "../../../DB/models/product.model.js";
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import userModel from "../../../DB/models/user.model.js";




export const search = async (req, res, next) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: "Search term is required" });
    }

    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive search

    const [products, subCategories, categories, users] = await Promise.all([
       productModel.find({
            $or:[
                 { name: regex },
                 { description: regex }
            ]
       }).limit(10),

       subCategoryModel.find({
            name: regex
        }).limit(10),
         categoryModel.find({
                name: regex
          }).limit(10),

          userModel.find({
            $or: [
                { userName: regex },
                { email: regex }
            ]
        }).limit(10)
    ]);

    return res.status(200).json({
        message: "Search results",
        data: {
            products,
            subCategories,
            categories,
            users
        }
    });

}
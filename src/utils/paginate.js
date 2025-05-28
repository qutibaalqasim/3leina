

const paginate = async (model, query = {}, options = {})=>{
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;

    let dbQuery = model.find(query).skip(skip).limit(limit);
    if(options.select) {
        dbQuery = dbQuery.select(options.select);
    }
    const [data , total] = await Promise.all([
        dbQuery,
        model.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
        data,
        pagination:{
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
        }
    };
}


export default paginate;
const HttpError = require("../middlewares/HttpError");
const Rating =  require("../models/ratingsModel");


const postRatingServices = async(detail)=>
{
    const {rating,desc,order} = detail;
    try{
        const rate = new Rating(rating,desc,order);
        await rate.save();
        if(!rate)
        {
            const error = new HttpError(
                404,"Something went wring in Rating Services"
            );
            return {error};
        }
        return {rate};
    }
    catch(e)
    {
        const error = new HttpError(500, `Internal server error : ${e}`);
        return { error };   
    }
};

module.exports = {postRatingServices};
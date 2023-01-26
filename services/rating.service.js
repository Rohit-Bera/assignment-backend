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
//get rating Services
const getallratingServices = async()=>{
    try{
        const allRatings  =await Rating.find().populate("order");
        if(allRatings)
        {
            return {allRatings};
        }
        else
        {
            const error = new HttpError(404, "Sorry No Rating yet");
            console.log("error: ", error);
            return { error };
        }
    }
    catch(err)
    {
        const error = new HttpError(
            404,
            "something went wrong in All Rating Services!"
          );
        return {error};
    }
}
//delete rating
const deleteRatingServices = async(_id)=>{
    try{
        const deleteRating = await Rating.findByIdAndDelete({_id});
        if(!deleteRating)
        {
            const error = new HttpError(404, "Rating not Found!");
            console.log("error: ", error);
            return { error };
        }
        return {deleteRating};
    }
    catch(err)
    {
        const error = new HttpError(404, "Sorry can't delete Your Feedback");
        console.log("error: ", error);
        return { error };
    }
};
module.exports = {postRatingServices,getallratingServices,deleteRatingServices};


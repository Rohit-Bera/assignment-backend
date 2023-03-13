const {response} = require("express");
const { request } = require("http");
const ratingservices = require("../services/rating.service");

//post rating
const postRating = async(request,response,next)=>{
    const order = request.params.id;
    const client = request.client;
    const _id = client._id;
    console.log(order);
    // console.log(client);

    const rating = request.body.rating;
    console.log(rating);

    const feedbackDescription = request.body.feedbackDescription;
    console.log(feedbackDescription);

    const detail = {rating,feedbackDescription,order};

    const data = await ratingservices.postRatingServices(detail);
    const {rate , error} = data;
    if(error)
    {
        return next(error); 
    }
    response.json({ status: "200", rate});

};
//get all ratings
const getRating = async(request,response,next)=>{
    const data = await ratingservices.getallratingServices();
    const {allRatings,error} = data;
    if(error)
    {
        return next(error);
    }
    response.json({status:"200",allRatings});
};
const deleteRating = async(request,response,next)=>{
    const _id= request.params.id;
    const order = request.order;
    const data = ratingservices.deleteRatingServices(_id);
    const {deleteRating , error} = data;
    if(error)
    {
        return next(error);
    }
    response.json({status:"200",deleteRating});
};


module.exports = {postRating,getRating,deleteRating};





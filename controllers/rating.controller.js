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

    const desc = request.body.feedbackDescription;
    console.log(desc);

    const detail = {rating,desc,order};
    const data = await ratingservices.postRatingServices(detail);
    const {rate , error} = data;
    if(error)
    {
        return next(error); 
    }
    response.json({ status: "200", rate});
}

module.exports = {postRating};
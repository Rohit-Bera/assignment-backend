const {response} = require("express");
const { request } = require("http");
const feedbackServices = require("../services/feedback.service");

//postfeedback user controller
const postuserFeedback = async(request,response,next)=>{
    const user = request.user;
    const _id = user._id;
    const Username = user.firstName;
    const email = user.email;
    console.log(Username);
    console.log(_id);

    const feedback = request.body;
    const detail = {feedback,_id,Username,email};
    const data = await feedbackServices.postUserFeedbackServices(detail);
    const { feed,error} = data;
    console.log("postfeedback",feed);
    if(error)
    {
        // response.json(error);
        return next(error); 
        // console.log("error",error);
    }
  response.json({ status: "200", feed});
    
};

//get all user feedback
const getalluserFeedback = async(request,response,next)=>{
    const data = await feedbackServices.getAllUserFeedbackServices();
    const {allFeedback, error} = data;
    if(error)
    {
        return next(error);
    }
    response.json({status:"200",allFeedback});
};

//delete user feedback
const deleteuserFeedback = async(request,response,next)=>{
    const _id = request.params.id;
    const user = request.user;
    const data = feedbackServices.deleteuserFeedbackService(_id);
    const {deleteFeedback , error} = data;  
    if(error)
    {
        // response.json(error);
        return next(error); 
        // console.log("error",error);
    }
  response.json({ status: "200", deleteFeedback});
};


//Client postfeedback controller
const postClientFeedback = async(request,response,next)=>{
    const client = request.client;
    const _id = client._id;
    const Clientname = client.firstName;
    const email = client.email;
    console.log(Clientname);
    console.log(_id);

    const feedback = request.body;
    const detail = {feedback,_id,Clientname,email};
    const data = await feedbackServices.postClientFeedbackServices(detail);
    const { feed,error} = data;
    console.log("postfeedback",feed);
    if(error)
    {
        // response.json(error);
        return next(error); 
        // console.log("error",error);
    }
  response.json({ status: "200", feed});
    
};

//get all Client feedback
const getallClientFeedback = async(request,response,next)=>{
    const data = await feedbackServices.getAllClientFeedbackServices();
    const {allFeedback, error} = data;
    if(error)
    {
        return next(error);
    }
    response.json({status:"200",allFeedback});
};

//delete user Client feedback
const deleteClientFeedback = async(request,response,next)=>{
    const _id = request.params.id;
    const data = feedbackServices.deleteClientFeedbackService(_id);
    const {deleteFeedback , error} = data;  
    if(error)
    {
        // response.json(error);
        return next(error); 
        // console.log("error",error);
    }
  response.json({ status: "200", deleteFeedback});
};

module.exports = {postuserFeedback,
    getalluserFeedback,
    deleteuserFeedback,
    postClientFeedback,
    getallClientFeedback,
    deleteClientFeedback};
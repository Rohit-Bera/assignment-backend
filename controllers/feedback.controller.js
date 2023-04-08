const {response} = require("express");
const { request } = require("http");
const feedbackServices = require("../services/feedback.service");

//postfeedback user controller
const postuserFeedback = async(request,response,next)=>{
    const userInfo = request.user;
    const user = userInfo._id;
    const feedback = request.body.feedback;
    // console.log("feedback:", feedback)
    const detail = {feedback,user}
    const data = await feedbackServices.postUserFeedbackServices({detail});
    const { feed,error} = data;
    console.log("postfeedback",feed);
    if(error)
    {
        response.json(error);
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
    const clientInfo = request.client;
    console.log("🚀 ~ file: feedback.controller.js:55 ~ postClientFeedback ~ clientInfo:", clientInfo)
    const client = clientInfo._id;
    const feedback = request.body.feedback;
    console.log("feedback:", feedback)
    const detail = {feedback,client};
    const data = await feedbackServices.postClientFeedbackServices({detail});
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

module.exports = {
    postuserFeedback,
    getalluserFeedback,
    deleteuserFeedback,
    postClientFeedback,
    getallClientFeedback,
    deleteClientFeedback
};
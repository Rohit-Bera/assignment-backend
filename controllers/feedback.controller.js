const feedbackServices = require("../services/feedback.service");

//postfeedback user controller
const postuserFeedback = async (request, response, next) => {
  const userInfo = request.user;
  const user = userInfo._id;
  const feedback = request.body.feedback;
  // console.log("feedback:", feedback)
  const detail = { feedback, user };
  const data = await feedbackServices.postUserFeedbackServices({ detail });
  const { feed, error } = data;
  console.log("postfeedback", feed);
  if (error) {
    response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", feed });
};

//get all user feedback
const getalluserFeedback = async (request, response, next) => {
  const data = await feedbackServices.getAllUserFeedbackServices();
  const { allFeedback, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allFeedback });
};

//delete user feedback
const deleteuserFeedback = async (request, response, next) => {
  const _id = request.params.id;
  const user = request.user;
  const data = feedbackServices.deleteuserFeedbackService(_id);
  const { deleteFeedback, error } = data;
  if (error) {
    // response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", deleteFeedback });
};

//Client postfeedback controller
const postClientFeedback = async (request, response, next) => {
  const clientInfo = request.client;
  console.log(
    "🚀 ~ file: feedback.controller.js:55 ~ postClientFeedback ~ clientInfo:",
    clientInfo
  );
  const client = clientInfo._id;
  const feedback = request.body.feedback;
  console.log("feedback:", feedback);
  const detail = { feedback, client };
  const data = await feedbackServices.postClientFeedbackServices({ detail });
  const { feed, error } = data;
  console.log("postfeedback", feed);
  if (error) {
    // response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", feed });
};

//get all Client feedback
const getallClientFeedback = async (request, response, next) => {
  const data = await feedbackServices.getAllClientFeedbackServices();
  const { allFeedback, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allFeedback });
};

//delete user Client feedback
const deleteClientFeedback = async (request, response, next) => {
  const _id = request.params.id;
  const data = feedbackServices.deleteClientFeedbackService(_id);
  const { deleteFeedback, error } = data;
  if (error) {
    // response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", deleteFeedback });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  complaints

const postComplaintApi = async (request, response, next) => {
  const { complaint } = request.body;

  if (request.user) {
    const user = request?.user._id;
    const reply = await feedbackServices.postComplaintService({
      user,
      complaint,
    });

    const { addComplaint, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, addComplaint });
  } else {
    const client = request?.client._id;

    const reply = await feedbackServices.postComplaintService({
      client,
      complaint,
    });

    const { addComplaint, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, addComplaint });
  }
};

const getComplaintAPi = async (request, response, next) => {
  if (request.user) {
    const user = request?.user._id;
    const reply = await feedbackServices.getComplaintService({ user });

    const { myComplaints, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, myComplaints });
  } else {
    const client = request?.client._id;

    const reply = await feedbackServices.postComplaintService({
      client,
    });

    const { myComplaints, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, myComplaints });
  }
};

const deleteComplaintApi = async (request, response, next) => {
  const id = request.params.id;

  if (request.user) {
    // const user = request?.user._id;

    const reply = await feedbackServices.deleteComplaintService(id);

    const { feedDeleted, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, feedDeleted });
  } else {
    const reply = await feedbackServices.deleteComplaintService(id);

    const { feedDeleted, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, feedDeleted });
  }
};

// admin
const putComplaintApi = async (request, response, next) => {};

module.exports = {
  postuserFeedback,
  getalluserFeedback,
  deleteuserFeedback,
  postClientFeedback,
  getallClientFeedback,
  deleteClientFeedback,
  postComplaintApi,
  getComplaintAPi,
  deleteComplaintApi,
  putComplaintApi,
};

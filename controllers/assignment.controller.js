const assignmentService = require("../services/assignment.service");

// for client
const postAssignmentApi = async (request, response, next) => {
  const client = request.client._id;
  const files = request.files;
  console.log("files: ", files);
  const {
    assignmentName,
    assignmentType,
    description,
    assignmentStatus,
    assignmentBudget,
  } = request.body;

  const reqfiles = [];

  const url = request.protocol + "://" + request.get("host");

  files.forEach((item) => {
    reqfiles.push(url + "/clientAttachments/" + item.filename);
  });

  const attachments = reqfiles;
  const body = {
    client,
    assignmentName,
    assignmentType,
    description,
    assignmentStatus,
    assignmentBudget,
    attachments,
  };

  const result = await assignmentService.postAssignmentService({ body });

  const { uploadAssignment, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, uploadAssignment });
};

const getMyAssignmentApi = async (request, response, next) => {
  const _id = request.params.id;

  const result = await assignmentService.getAssignmentService({ _id });

  const { myAssignments, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  if (myAssignments.length === 0) {
    return response.json({
      status: 400,
      Message: "you have not listed any assignments!",
    });
  } else {
    response.json({ status: 200, myAssignments });
  }
};

const updateAssignmentApi = async (request, response, next) => {
  const _id = request.params.id;
  const client = request.client._id;
  const files = request.files;
  console.log("files: ", files);
  const {
    assignmentName,
    assignmentType,
    description,
    assignmentStatus,
    assignmentBudget,
  } = request.body;
  console.log("request.body: ", request.body);

  const reqfiles = [];

  const url = request.protocol + "://" + request.get("host");

  const body = [];

  if (assignmentName) {
    body.push({ assignmentName });
  }

  if (assignmentType) {
    body.push({ assignmentType });
  }

  if (description) {
    body.push({ description });
  }

  if (assignmentStatus) {
    body.push({ assignmentStatus });
  }

  if (assignmentBudget) {
    body.push({ assignmentBudget });
  }

  if (files) {
    files.forEach((item) => {
      reqfiles.push(url + "/clientAttachments/" + item.filename);
    });

    const attachments = reqfiles;
    body.push({ attachments });
  }

  const result = await assignmentService.updateAssignmentService({ _id, body });

  const { updated, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, updated });
};

const deleteAssignmentApi = async (request, response, next) => {
  const _id = request.params.id;

  const result = await assignmentService.deleteAssignmentService({ _id });

  const { taskDeleted, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, taskDeleted });
};

// public
const getAssignmentListApi = async (request, response, next) => {
  const result = await assignmentService.getPublicAssignmentService();

  const { allAssignments, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, allAssignments });
};

const searchAssignmentbyName = async (request, response, next) => {
  const name = request.params.name;

  const result = await assignmentService.searchAssignmentService({ name });

  const { found, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, found });
};

module.exports = {
  postAssignmentApi,
  getMyAssignmentApi,
  updateAssignmentApi,
  deleteAssignmentApi,
  searchAssignmentbyName,
  getAssignmentListApi,
};

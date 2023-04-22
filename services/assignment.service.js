const HttpError = require("../middlewares/HttpError");
const Assignment = require("../models/assignmentModel");

const postAssignmentService = async ({ body }) => {
  try {
    const uploadAssignment = new Assignment(body);
    await uploadAssignment.save();

    if (!uploadAssignment) {
      const error = new HttpError(
        404,
        "assignment was not uploaded successfully!"
      );

      return { error };
    }

    return { uploadAssignment };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const getAssignmentService = async ({ _id }) => {
  const client = _id;
  try {
    const myAssignments = await Assignment.find({ client });

    if (!myAssignments) {
      const error = new HttpError(
        404,
        `you have not uploaded any assignments!`
      );

      return { error };
    }

    return { myAssignments };
  } catch (e) {
    const error = new HttpError(500, `Internal server error :${e}`);

    return { error };
  }
};

const updateAssignmentService = async ({ _id, body }) => {
  console.log("body: ", body);

  try {
    const updatedItems = {};

    body.forEach((item) => {
      if (item.assignmentName) {
        updatedItems.assignmentName = item.assignmentName;
      }

      if (item.assignmentType) {
        updatedItems.assignmentType = item.assignmentType;
      }

      if (item.description) {
        updatedItems.description = item.description;
      }

      if (item.assignmentStatus) {
        updatedItems.assignmentStatus = item.assignmentStatus;
      }

      if (item.assignmentBudget) {
        updatedItems.assignmentBudget = item.assignmentBudget;
      }

      if (item.attachments) {
        updatedItems.attachments = item.attachments;
      }
    });

    console.log("updatedItems: ", updatedItems);

    const updated = await Assignment.findByIdAndUpdate(
      { _id },
      { $set: updatedItems },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "please enter a valid id");

      return { error };
    }

    return { updated };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const deleteAssignmentService = async ({ _id }) => {
  try {
    const taskDeleted = await Assignment.findByIdAndDelete({ _id });

    if (!taskDeleted) {
      const error = new HttpError(404, "Task not found!");

      return { error };
    }

    return { taskDeleted };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getPublicAssignmentService = async () => {
  try {
    const allAssignments = await Assignment.find().populate("client");

    if (!allAssignments) {
      const error = new HttpError(404, "something went wrong in the database");

      return { error };
    }

    return { allAssignments };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const searchAssignmentService = async ({ name }) => {
  try {
    const assignmentName = new RegExp(name, "i");

    const found = await Assignment.find({ assignmentName }).populate("client");

    if (!found) {
      const error = new HttpError(404, "something went wrong in the database!");

      return { error };
    }

    if (found.length == 0) {
      const error = new HttpError(404, `there are no ${name} Assignment!`);

      return { error };
    }

    return { found };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getAssignmentByIDService = async (_id) => {
  try {
    const assignmentFound = await Assignment.findById({
      _id,
    }).populate("client");

    if (!assignmentFound) {
      const error = new HttpError(404, "something went wrong in the database!");

      return { error };
    }

    return { assignmentFound };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  postAssignmentService,
  getAssignmentService,
  updateAssignmentService,
  deleteAssignmentService,
  getPublicAssignmentService,
  searchAssignmentService,
  getAssignmentByIDService,
};

import {
  findQuestionByLink,
  createQuestion,
  addQuestionToList,
} from '../repositories/questions/index.js';

const addQuestionToListService = async (payload) => {
  const { title, link, listID, createdById, updatedById } = payload;

  // Check if the question already exists
  let question = await findQuestionByLink(link);

  // If not, create a new question
  if (!question) {
    question = await createQuestion({ title, link, createdById, updatedById });
  }

  // Add the question to the list
  await addQuestionToList(listID, question.questionID);

  return question;
};

export { addQuestionToListService };

import {
  addQuestionToListService,
  getQuestionsInListService,
} from '../../services/questionServices.js';

const addQuestion = async (req, res) => {
  try {
    const { title, link, listID, createdById, updatedById } = req.body;

    // Validate input (basic validation, can be extended)
    if (!title || !link || !listID || !createdById || !updatedById) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add question to list
    const question = await addQuestionToListService({
      title,
      link,
      listID,
      createdById,
      updatedById,
    });

    res.status(200).json({ message: 'Question added to list', question });
  } catch (error) {
    console.error('Error adding question to list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getQuestionsInList = async (req, res) => {
  try {
    const { listID } = req.params;

    if (!listID) {
      return res.status(400).json({ error: 'Missing list ID' });
    }

    const questions = await getQuestionsInListService(listID);

    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error fetching questions from list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { addQuestion, getQuestionsInList };

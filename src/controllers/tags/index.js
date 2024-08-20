import * as tagService from '../../services/tagsServices.js';

export const getTagSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    const suggestions = await tagService.getTagSuggestions(query);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tag suggestions' });
  }
};

export const addTagsToList = async (req, res) => {
  try {
    const { listID, tags } = req.body;
    const result = await tagService.addTagsToList(listID, tags);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add tags to list' });
  }
};

export const updateTagsForList = async (req, res) => {
  try {
    const { listID, addTags, removeTags } = req.body;
    const result = await tagService.updateTagsForList(
      listID,
      addTags,
      removeTags,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tags for list' });
  }
};

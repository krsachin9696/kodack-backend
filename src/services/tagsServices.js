import * as tagRepository from '../repositories/tags/index.js';

export const getTagSuggestions = async (query) => {
  return await tagRepository.getTagsByQuery(query);
};

export const addTagsToList = async (listID, tags) => {
  const results = [];
  for (const tag of tags) {
    let tagData = await tagRepository.findTagByName(tag.name);
    if (!tagData) {
      tagData = await tagRepository.createTag(tag.name);
    }
    await tagRepository.associateTagWithList(listID, tagData.id);
    results.push(tagData);
  }
  return results;
};

export const updateTagsForList = async (listID, addTags, removeTags) => {
    if (removeTags && removeTags.length > 0) {
      await tagRepository.removeTagsFromList(listID, removeTags);
    }
  
    if (addTags && addTags.length > 0) {
      const result = await tagRepository.addTagsToList(listID, addTags);
      return result;
    }
  
    return { message: 'Tags updated successfully' };
  };
  
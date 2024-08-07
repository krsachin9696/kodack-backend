import prisma from '../../config/prismaClient.js';

export const getTagsByQuery = async (query) => {
  return await prisma.tag.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });
};

export const findTagByName = async (name) => {
  return await prisma.tag.findUnique({
    where: { name },
  });
};

export const createTag = async (name) => {
  return await prisma.tag.create({
    data: { name },
  });
};

export const associateTagWithList = async (listID, tagID) => {
  return await prisma.listTag.create({
    data: {
      listID,
      tagID,
    },
  });
};

export const removeTagsFromList = async (listID, tagsToRemove) => {
    const existingTags = await prisma.listTag.findMany({
      where: {
        listID,
        tagID: { in: tagsToRemove },
      },
    });
  
    const tagIDsToRemove = existingTags.map(tag => tag.tagID);
  
    return await prisma.listTag.deleteMany({
      where: {
        listID,
        tagID: { in: tagIDsToRemove },
      },
    });
  };
  
  export const addTagsToList = async (listID, tagsToAdd) => {
    const tagIDs = [];
    for (const tagName of tagsToAdd) {
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      });
      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName },
        });
      }
      tagIDs.push(tag.id);
    }
  
    const listTags = tagIDs.map(tagID => ({
      listID,
      tagID,
    }));
  
    return await prisma.listTag.createMany({
      data: listTags,
      skipDuplicates: true,
    });
  };
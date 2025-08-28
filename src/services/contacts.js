import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

// GET by ID
export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  if (!contact) {
    throw createHttpError(404, 'Contact not found or not yours');
  }
  return contact;
};

// POST
export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId,
  });
  return contact;
};

// PATCH
export const updateContactById = async (id, userId, updates) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    updates,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found or not yours');
  }

  return updatedContact;
};

// DELETE
export const deleteContactById = async (id, userId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found or not yours');
  }

  return deletedContact;
};

// PAGINATION
export const getContactsPerPage = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;

  const query = ContactsCollection.find({ userId });

  if (filter.type) {
    query.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    query.where('isFavourite').equals(filter.isFavourite);
  }

  const totalContacts = await ContactsCollection.countDocuments({ userId });

  const contacts = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(totalContacts, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

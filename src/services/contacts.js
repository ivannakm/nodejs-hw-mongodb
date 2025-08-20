import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// export const getAllContacts = async () => {
//   const contacts = await ContactsCollection.find();
//   return contacts;
// };

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
//POST
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
//PATCH
export const updateContactById = async (id, updates) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    id,
    updates,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedContact;
};
//DELETE
export const deleteContactById = async (id) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(id);
  return deletedContact;
};

//PAGINATION
export const getContactsPerPage = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const totalContacts = await ContactsCollection.countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(totalContacts, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

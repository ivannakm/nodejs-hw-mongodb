import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
//PUT
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
  return deletedContact; // повертає null, якщо не знайдено
};

import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getContactById,
  getContactsPerPage,
  updateContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

// GET ONE
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found or not yours');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// POST
export const createContactController = async (req, res) => {
  const userId = req.user._id;

  const contact = await createContact(req.body, userId);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

// PATCH
export const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const updates = req.body;

  const updatedContact = await updateContactById(contactId, userId, updates);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found or not yours');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated contact!',
    data: updatedContact,
  });
};

// DELETE
export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const deletedContact = await deleteContactById(contactId, userId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found or not yours');
  }

  res.status(204).send(); // No Content
};

// PAGINATION
export const getContactsPerPageController = async (req, res) => {
  const userId = req.user._id;

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contactsWithPagination = await getContactsPerPage({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsWithPagination,
  });
};

import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isValid = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  return isValid ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const allowedFields = [
    '_id',
    'name',
    'email',
    'phoneNumber',
    'contactType',
    'createdAt',
  ];

  return allowedFields.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
};

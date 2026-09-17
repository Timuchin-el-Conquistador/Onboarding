export const BASE_ENDPOINT = 'v1/todo';

export const TASK_ENDPOINT = `${BASE_ENDPOINT}/task`;

export const ENDPOINTS_CONFIG = {
  DELETE_TASK: TASK_ENDPOINT,
  EDIT_TASK: `${BASE_ENDPOINT}/edit-task`,
  CREATE_TASK: TASK_ENDPOINT,
};

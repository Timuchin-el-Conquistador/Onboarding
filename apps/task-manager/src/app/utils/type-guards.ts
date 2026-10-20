import { ITodoResponse } from '../models';

export function isITodoResponse(value: unknown): value is ITodoResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'userId' in value &&
    'name' in value &&
    'tasks' in value
  );
}

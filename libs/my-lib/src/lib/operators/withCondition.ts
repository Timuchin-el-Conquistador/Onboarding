import { OperatorFunction } from 'rxjs';

export function withCondition<T>(
  condition: boolean,
  operators: OperatorFunction<T, T>[],
): OperatorFunction<T, T> {
  if (!condition) {
    return (source$) => source$;
  }

  return (source$) =>
    operators.reduce((acc, operator) => operator(acc), source$);
}

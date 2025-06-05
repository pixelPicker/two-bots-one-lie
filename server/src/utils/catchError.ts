interface PostgresError extends Error {
  code?: string;
}

export const catchDrizzzzzleError = function <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [PostgresError]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      return [error];
    });
};

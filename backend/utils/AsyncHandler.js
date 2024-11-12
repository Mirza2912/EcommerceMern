// This function will use when we write async code
const AsyncHandler = (upcomingFunction) => (req, res, next) => {
  Promise.resolve(upcomingFunction(req, res, next)).catch((error) =>
    next(error)
  );
};

export { AsyncHandler };

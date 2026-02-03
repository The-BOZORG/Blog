import ErrorResponse from '../errors/customError.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new ErrorResponse('not authorized to access this route', 403);
};

export default checkPermissions;

exports.successResponse = function (res, msg) {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  const data = {
    status: 0,
    message: msg,
    data: '',
  };
  return res.status(401).json(data);
};

exports.unauthorizedResponseWithMessage = function (res, msg, dataIn) {
  const data = {
    status: 0,
    message: msg,
    data: dataIn,
  };
  return res.status(401).json(data);
};

exports.forbiddenResponse = function (res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(403).json(data);
};
exports.authenticationToken = function (res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(501).json(data);
};
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://localhost:3000',
  'http://api.kirser-diploma.nomoredomains.club',
  'https://api.kirser-diploma.nomoredomains.club',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next(); // пропускаем запрос дальше
};

module.exports = {

  /* App URL */
  url: process.env.APP_URL || 'http://localhost:3000',
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || '3000',

  local: process.env.NODE_ENV !== 'prodection',
  debug: process.env.NODE_ENV !== 'prodection',
}
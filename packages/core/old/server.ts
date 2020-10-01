const mongoose = require('mongoose');
const app = require('./src/app');
const config = require('./src/configs');
//const logger = require('./src/configs/logger');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//  logger.info('Connected to MongoDB');
  server = app.listen(config.app.port, () => {
//    logger.info(`Listening to port ${config.app.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
//      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
//  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
//  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
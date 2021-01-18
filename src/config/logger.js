import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { combine, errors, json, prettyPrint, timestamp } = format;

const logDir = path.join(__dirname, '..', 'logs');

const options = {
  json: true,
  dirname: logDir,
  filename: '%DATE%',
  datePattern: 'YYYY-MM-DD',
  utc: false,
  extension: '.log',
  maxFiles: '7d',
};

const logger = createLogger({
  format: combine(errors({ stack: true }), json(), timestamp(), prettyPrint()),
  transports: new DailyRotateFile(options),
});

if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console());
}

export default logger;

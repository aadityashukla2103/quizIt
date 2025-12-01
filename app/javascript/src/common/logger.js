/* eslint-disable react-hooks/rules-of-hooks */
import Logger from "js-logger";

export const initializeLogger = () => {
  // setup defaults
  Logger.useDefaults();

  // disable logs in production
  if (process.env.RAILS_ENV === "production") {
    Logger.setLevel(Logger.OFF);
  }

  // make logger global so you can call logger.info() anywhere
  window.logger = Logger;
};

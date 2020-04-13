const moment = require('moment');

// middleware function, you will have access to req, res
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    
    next();
}

module.exports = logger;
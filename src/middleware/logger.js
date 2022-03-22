const logger = require("../logger/winston");


const logToFile = (req, res, next) =>{

    logger.log('info', req.params)

    next()
}

module.exports = logToFile
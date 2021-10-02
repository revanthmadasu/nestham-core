const { STATUS } = require("../constants/util.constants")

module.exports = {
    getFormattedResponse(type, data, message, code) {
        if (type === STATUS.SUCCESS) {
            return {
                data: data,
                status: {
                    statusCode: code,
                    message: message || 'Success'
                }
            }
        } else if (type === STATUS.ERROR) {
            return {
                status: {
                    statusCode: code,
                    message: message || 'Error'
                }
            }
        }
    }
}
module.exports = {
    STATUS: {
        SUCCESS: 'success',
        ERROR: 'error'
    },
    STATUS_CODE: {
        SUCCESS: 200,
        CLIENT_ERROR: 400,
        DATA_ERROR: 404,
        INTERNAL_ERROR: 500
    },
    STATUS_MESSAGES: {
        SUCCESS: 'Success',
        CLIENT_ERROR: 'Invalid Data',
        DATA_ERROR: 'Not found what you are looking for',
        INTERNAL_ERROR: 'Internal error. Sorry there is a problem from our side. Please try later',
        DATA_REDUNDANT_ERROR: 'Duplicate data.'
    }
};
const getErrorMessage = (message) => {
    return {
        error: message || 'Unexpected error occured. Please try again'
    }
}

module.exports = getErrorMessage

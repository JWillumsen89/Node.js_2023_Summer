const welcomeMessageJson = require('./welcomeMessage.json');

function getWelcomeMessage(clientName) {
    if (!clientName) {
        return welcomeMessageJson.noNameWelcomeMessage;
    } else {
        return welcomeMessageJson.nameWelcomeMessage.replace('$clientName', clientName);
    }
}

module.exports = {
    getWelcomeMessage,
};

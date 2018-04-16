const botbuilder_dialogs = require("botbuilder-dialogs");

class WakeUp extends botbuilder_dialogs.CompositeControl {
    constructor(convState) {
        super(dialogs, 'wakeUp');
    }
}
exports.WakeUp = WakeUp;

var guestInfo = {};

const dialogs = new botbuilder_dialogs.DialogSet();
dialogs.add('wakeUp', [
    async function (dc, args) {
        guestInfo = args;
        await dc.prompt('datePrompt', `Hello, ${guestInfo.userName}. What time would you like your alarm to be set?`);
    },
    async function (dc, time){
        // conversationState.storage.wakeUp.time = time[0].value;
        guestInfo.time = time[0].value
        // conversationState.topic = undefined;
        await dc.context.sendActivity(`Your alarm is set to ${time[0].value} for room ${guestInfo.room}`);
        return dc.end(guestInfo);
    }
]);

dialogs.add('datePrompt', new botbuilder_dialogs.DatetimePrompt());


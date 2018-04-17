const botbuilder_dialogs = require("botbuilder-dialogs");

class WakeUp extends botbuilder_dialogs.CompositeControl {
    constructor() {
        // Dialog ID of 'wakeup' will start when class is called in the parent
        super(dialogs, 'wakeUp');
    }
}
exports.WakeUp = WakeUp;
// Create a variable that will hold the parent's state object
var guestInfo = {};

// Defining the conversation flow using a waterfall model
const dialogs = new botbuilder_dialogs.DialogSet();
dialogs.add('wakeUp', [
    async function (dc, args) {
        // Set guestInfo to args, the state object passed in from the parent
        guestInfo = args;
        await dc.prompt('datePrompt', `Hello, ${guestInfo.userName}. What time would you like your alarm to be set?`);
    },
    async function (dc, time){
        // Save the time
        guestInfo.time = time[0].value
        await dc.context.sendActivity(`Your alarm is set to ${time[0].value} for room ${guestInfo.room}`);
        // Return the updated state object back to the parent 
        return dc.end(guestInfo);
    }
]);
// Defining the prompt used in this conversation flow
dialogs.add('datePrompt', new botbuilder_dialogs.DatetimePrompt());


const botbuilder_dialogs = require("botbuilder-dialogs");

class CheckIn extends botbuilder_dialogs.CompositeControl {
    constructor() {
        // Dialog ID of 'checkIn' will start when class is called in the parent
        super(dialogs, 'checkIn');
    }
}
exports.CheckIn = CheckIn;

// Create a variable that will hold the parent's state object
var guestInfo = {};

// Defining the conversation flow using a waterfall model
const dialogs = new botbuilder_dialogs.DialogSet();
dialogs.add('checkIn', [
    async function (dc, args) {
        // Set guestInfo to args, the state object passed in from the parent
        guestInfo = args;
        await dc.context.sendActivity("What is your name?");
    },
    async function (dc, name){
        // Save the name 
        guestInfo.userName = name;
        await dc.prompt('numberPrompt', `Hi ${name}. What room will you be staying in?`);
    },
    async function (dc, room){
        // Save the room number
        guestInfo.room = room
        await dc.context.sendActivity(`Great! Enjoy your stay!`);
        // Return the updated state object back to the parent 
        return await dc.end(guestInfo);
    }
]);
// Defining the prompt used in this conversation flow
dialogs.add('textPrompt', new botbuilder_dialogs.TextPrompt());
dialogs.add('numberPrompt', new botbuilder_dialogs.NumberPrompt());


const botbuilder_dialogs = require("botbuilder-dialogs");
const botbuilder = require("botbuilder");

class CheckIn extends botbuilder_dialogs.CompositeControl {
    constructor(convState) {
        super(dialogs, 'checkIn');
    }
}
exports.CheckIn = CheckIn;

var guestInfo = {};

const dialogs = new botbuilder_dialogs.DialogSet();
dialogs.add('checkIn', [
    async function (dc, args) {
        guestInfo = args;
        await dc.context.sendActivity("What is your name?");
    },
    async function (dc, name){
        guestInfo.userName = name;
        await dc.prompt('numberPrompt', `Hi ${name}. What room will you be staying in?`);
    },
    async function (dc, room){
        guestInfo.room = room
        await dc.context.sendActivity(`Great! Enjoy your stay!`);
        return await dc.end(guestInfo);
    }
]);
dialogs.add('textPrompt', new botbuilder_dialogs.TextPrompt());
dialogs.add('numberPrompt', new botbuilder_dialogs.NumberPrompt());


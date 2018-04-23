const botbuilder_dialogs = require("botbuilder-dialogs");

class ReserveTable extends botbuilder_dialogs.CompositeControl {
    constructor() {
        // Dialog ID of 'reserve_table' will start when class is called in the parent
        super(dialogs, 'reserve_table');
    }
}

// Create a variable that will hold the parent's state object
var guestInfo = {
    tableNumber: undefined
};

exports.ReserveTable = ReserveTable;

const dialogs = new botbuilder_dialogs.DialogSet();

// Defining the conversation flow using a waterfall model
dialogs.add('reserve_table', [
    async function (dc, args) {
        // Set guestInfo to args, the state object passed in from the parent
        guestInfo = args;
        const prompt = `Welcome ${guestInfo.userName}, which table would you like to reserve?`;
        const choices = ['1', '2', '3', '4', '5', '6'];
        await dc.prompt('choicePrompt', prompt, choices);
    },
    async function(dc, choice){
        // Save the table number
        guestInfo.tableNumber = choice.value;
        await dc.context.sendActivity(`Sounds great, we will reserve table number ${choice.value} for you.`);
        // Return the updated state object back to the parent 
        return dc.end(guestInfo);
    }
]);
// Defining the prompt used in this conversation flow
dialogs.add('choicePrompt', new botbuilder_dialogs.ChoicePrompt());


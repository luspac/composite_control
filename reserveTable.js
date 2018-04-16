const botbuilder_dialogs = require("botbuilder-dialogs");

class ReserveTable extends botbuilder_dialogs.CompositeControl {
    constructor() {
        super(dialogs, 'reserve_table');
    }
}

var guestInfo = {};

exports.ReserveTable = ReserveTable;

const dialogs = new botbuilder_dialogs.DialogSet();

dialogs.add('reserve_table', [
    async function (dc, args) {
        guestInfo = args;
        const prompt = `Welcome ${guestInfo.userName}, which table would you like to reserve?`;
        const choices = ['1', '2', '3', '4', '5', '6'];
        await dc.prompt('choicePrompt', prompt, choices);
    },
    async function(dc, choice){
        guestInfo.tableNumber = choice.value;
        await dc.context.sendActivity(`Sounds great, we will reserve table number ${choice.value} for you.`);
        return dc.end(guestInfo);
    }
]);
dialogs.add('choicePrompt', new botbuilder_dialogs.ChoicePrompt());


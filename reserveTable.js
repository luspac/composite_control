const { CompositeControl, DialogSet, ChoicePrompt } = require('botbuilder-dialogs');

class ReserveTable extends CompositeControl {
    constructor(userState) {
        // Dialog ID of 'reserve_table' will start when class is called in the parent
        super(new DialogSet(), 'reserve_table'); 

        // Define a user state object
        var user = undefined;

        // Defining the conversation flow using a waterfall model
        this.dialogs.add('reserve_table', [
            async function (dc, args) {
                // Get the user state from context
                user = userState.get(dc.context);
                
                // Create a new local reserveTable state object
                dc.instance.state.reserveTable = {};
                const prompt = `Welcome ${user.guestInfo.userName}, which table would you like to reserve?`;
                const choices = ['1', '2', '3', '4', '5', '6'];
                await dc.prompt('choicePrompt', prompt, choices);
            },
            async function(dc, choice){
                // Save the table number
                dc.instance.state.reserveTable.tableNumber = choice.value;
                await dc.context.sendActivity(`Sounds great, we will reserve table number ${choice.value} for you.`);
                
                // Save dialog's state object to the parent's state object
                user.reserveTable = dc.instance.state.reserveTable;

                // End the dialog
                await dc.end();
            }
        ]);

        // Defining the prompt used in this conversation flow
        this.dialogs.add('choicePrompt', new ChoicePrompt());
    }
}
exports.ReserveTable = ReserveTable;


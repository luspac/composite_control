const { CompositeControl, DialogSet, DatetimePrompt } = require('botbuilder-dialogs');

class WakeUp extends CompositeControl {
    constructor(userState) {
        // Dialog ID of 'wakeup' will start when class is called in the parent
        super(new DialogSet(), 'wakeUp');

        this.dialogs.add('wakeUp', [
            async function (dc, args) {
                // Create a new local wakeUp state object
                dc.instance.state.wakeUp = {};
                await dc.prompt('datePrompt', `Hello, ${args.userName}. What time would you like your alarm to be set?`);
            },
            async function (dc, time){
                // Save the time
                dc.instance.state.wakeUp.time = time[0].value
                await dc.context.sendActivity(`Your alarm is set to ${time[0].value} for room ${guestInfo.room}`);
                
                // Save dialog's state object to the parent's state object
                const user = userState.get(dc.context);
                user.wakeUp = dc.instance.state.wakeUp;

                // End the dialog
                return dc.end();
            }]);

        // Defining the prompt used in this conversation flow
        this.dialogs.add('datePrompt', new DatetimePrompt());
    }
}
exports.WakeUp = WakeUp;

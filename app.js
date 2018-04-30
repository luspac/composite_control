const {BotFrameworkAdapter, FileStorage, ConversationState, UserState, BotStateSet, MessageFactory} = require("botbuilder");
const {TableStorage} = require("botbuilder-azure");
const {DialogSet} = require("botbuilder-dialogs");
const restify = require("restify");
var azure = require('botbuilder-azure'); 

// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


// var fs = new FileStorage("C:/temp");

// var azureStorage = new azure.TableStorage({tableName: "TestAzureTable2",
// storageAccessKey: "HxiikYr01YC68gohuCFJIombWCbxutURASSIXGbmOjI5b0GWh4mNVq1kN5PgFFadcPWStzhZJDyPArCtqlxAxw==", 
// storageAccountOrConnectionString: "luspacstorage"}); 


//File Storage
// const conversationState = new ConversationState(new FileStorage("C:/temp"));

//Azure Storage
// const conversationState = new ConversationState(azureStorage);

//Memory Storage
const storage = new FileStorage("c:/temp");
// ConversationState lasts for the entirity of a conversation then gets disposed of
const convoState = new ConversationState(storage);
// UserState persists information about the user
// across all of the conversations you have with that user
const userState  = new UserState(storage);

adapter.use(new BotStateSet(convoState, userState));

// Listen for incoming requests 
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        
        const isMessage = context.activity.type === 'message';

        // State will store all of your information 
        const convo = convoState.get(context);
        // const user = userState.get(context); // userState will not be used in this example

        const dc = dialogs.createContext(context, convo);
        await dc.continue(); // Continue the current dialog if one is currently active

        // Default action
        if (!context.responded && isMessage) {

            // Getting the user info from the state
            const userinfo = userState.get(dc.context); 
            // If guest info is undefined prompt the user to check in
            if(!userinfo.guestInfo){
                await dc.begin('checkInPrompt');
            }else{
                await dc.begin('mainMenu'); 
            }           
        }
    });
});

const dialogs = new DialogSet();
dialogs.add('mainMenu', [
    async function (dc, args) {
        const menu = ["Reserve Table", "Wake Up"];
        await dc.context.sendActivity(MessageFactory.suggestedActions(menu));    
    },
    async function (dc, result){
        // Decide which module to start
        switch(result){
            case "Reserve Table":
                await dc.begin('reservePrompt');
                break;
            case "Wake Up":
                await dc.begin('wakeUpPrompt');
                break;
            default:
                await dc.context.sendActivity("Sorry, i don't understand that command. Please choose an option from the list below.");
                break;            
        }
    },
    async function (dc, result){
        await dc.replace('mainMenu'); // Show the menu again
    }

]);

// Importing the dialogs 
const checkIn = require("./checkIn");
dialogs.add('checkInPrompt', new checkIn.CheckIn(userState));

const reserve_table = require("./reserveTable");
dialogs.add('reservePrompt', new reserve_table.ReserveTable(userState));

const wake_up = require("./wake_up");
dialogs.add('wakeUpPrompt', new wake_up.WakeUp(userState));

// const customControl = require("./custom_control");
// dialogs.add('showMenu', new customControl.menuControl({menuName: "burgerMenu"}));
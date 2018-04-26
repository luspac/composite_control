const {BotFrameworkAdapter, FileStorage, ConversationState, UserState, BotStateSet} = require("botbuilder");
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
const adapter = new botbuilder.BotFrameworkAdapter({
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
const storage = new botbuilder.FileStorage("c:\temp");
const convoState = new botbuilder.ConversationState(storage);
const userState  = new botbuilder.UserState(storage);

adapter.use(new botbuilder.BotStateSet(convoState, userState));

// Listen for incoming requests 
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await context.sendActivity("hi");
        // const isMessage = context.activity.type === 'message';

        // // State will store all of your information 
        // const convo = convoState.get(context);
        // const user = userState.get(context);
        // const dc = dialogs.createContext(context, convo);
        // await dc.continue(); // Continue the current dialog if one is currently active

        // // Default action
        // if (!context.responded && isMessage) {
        //     await dc.begin('mainMenu');            
        // }
    });
});

// const dialogs = new DialogSet();
// dialogs.add('mainMenu', [
//     async function (dc, args) {
//         const menu = ["Check In", "Reserve Table", "Wake Up"];
//         dc.context.sendActivity(MessageFactory.suggestedActions(menu));    
//     },
//     async function (dc, result){
//         // Decide which module to start
//         switch(result){
//             case "Check In":
//                 await dialogs.begin('checkInPrompt');
//                 break;
//             case "Reserve Table":
//                 await dialogs.begin('reserveTable');
//                 break;
//             case "Wake Up":
//                 await dialogs.begin('wakeUpPrompt');
//                 break;
//             default:
//                 await dc.context.sendActivity("Sorry, i don't understand that command. Please choose an option from the list below.");
//                 break;            
//         }
//     },
//     async function (dc, result){
//         await dialogs.replace('mainMenu'); // Show the menu again
//     }

// ]);

// // Importing the dialogs 
// const checkIn = require("./checkIn");
// dialogs.add('checkInPrompt', new checkIn.CheckIn(userState));

// const reserve_table = require("./reserveTable");
// dialogs.add('reservePrompt', new reserve_table.ReserveTable(userState));

// const wake_up = require("./wake_up");
// dialogs.add('wakeUpPrompt', new wake_up.WakeUp(userState));

// const customControl = require("./custom_control");
// dialogs.add('showMenu', new customControl.menuControl({menuName: "burgerMenu"}));
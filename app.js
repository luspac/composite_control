const botbuilder = require("botbuilder");
const {TableStorage } = require("botbuilder-azure");
const botbuilder_dialogs = require("botbuilder-dialogs");
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


var fs = new botbuilder.FileStorage("C:/temp");

var azureStorage = new azure.TableStorage({tableName: "TestAzureTable2",
storageAccessKey: "HxiikYr01YC68gohuCFJIombWCbxutURASSIXGbmOjI5b0GWh4mNVq1kN5PgFFadcPWStzhZJDyPArCtqlxAxw==", 
storageAccountOrConnectionString: "luspacstorage"}); 


//File Storage
// const conversationState = new botbuilder.ConversationState(new botbuilder.FileStorage("C:/temp"));

//Azure Storage
// const conversationState = new botbuilder.ConversationState(azureStorage);

//Memory Storage
const conversationState = new botbuilder.ConversationState(new botbuilder.MemoryStorage());

adapter.use(conversationState);

conversationState.topic = undefined; // To track current topic of conversation

// Listen for incoming requests 
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {

            // Update request with current locale
            const state = conversationState.get(context);

            const dc = dialogs.createContext(context, state);

            // Route received request
            if (state.topic) {
                // We are in the middle of a topic of conversation
                var result = await dc.continue()
            
                if(!result.active){
                    // If dialog finished, save the result 
                    state.guestInfo = result.result;
                    // Reset the conversation topic
                    state.topic = undefined;
                }

                // Default response if none was given during the turn.
                if(!context.responded){
                    dc.context.sendActivity("Sorry I don't understand");
                }
            }
            else if(!state.guestInfo){
                state.topic = true;
                await dc.begin("checkInPrompt", state.guestInfo); // Get user info and greet the user by name
            }
            else {
                // Check for user intent
                const utterance = (context.activity.text || '').trim().toLowerCase();

                if(utterance.includes('reserve table')){
                    state.topic = true;
                    await dc.begin('reservePrompt', state.guestInfo)

                } else if(utterance.includes('wake up')){
                    state.topic = true
                    await dc.begin('wakeUpPrompt', state.guestInfo);
                } 
                else {
                    // No valid intents, provide some guidence/hints as to what commands the bot understands.
                    await context.sendActivity(`Hi ${state.guestInfo.userName}. How may we serve you today? Request a "wake up" call or "reserve table"?`);
                }
            }
        }
    });
});

const dialogs = new botbuilder_dialogs.DialogSet();

const checkIn = require("./checkIn");
dialogs.add('checkInPrompt', new checkIn.CheckIn());

const reserve_table = require("./reserveTable");
dialogs.add('reservePrompt', new reserve_table.ReserveTable());

const wake_up = require("./wake_up");
dialogs.add('wakeUpPrompt', new wake_up.WakeUp());

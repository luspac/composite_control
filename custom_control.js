// const {} = require("botbuilder-dialogs");
// const { MessageFactory, CardFactory } = require("botbuilder");


// class menuControl extends botbuilder_dialogs.Control {
//     constructor(defaultMenuName) {
//         super();
//         this.currentMenu = defaultMenuName;
//     }

//     async dialogBegin(dc, args){
//         dc.instance.state = Object.assign({}, args);
//         this.currentMenu = (args ? args.menuName : this.currentMenu);
//         return this.showMenu(dc);
//     }

//     async dialogContinue(dc){
//         return this.showMenu(dc)
//     }

//     // Helper function to display the choosen menu
//     async showMenu(dc){
//         const utterance = (dc.context.activity.text || '').trim();
//         var menuItems = menus[utterance];
//         var cards = [];

//         // Display the selected menu with options to display other menus
//         if(menuItems){
//             var itemFacts = [];
//             Object.keys(menuItems).forEach(i => {
//                 itemFacts.push({
//                     "title": "Item:",
//                     "value": `${menuItems[i].description}`,
//                 },
//                 {
//                     "title": "Price",
//                     "value": `${menuItems[i].price}`
//                 });
//             });

//             var adaptiveCard = botbuilder.CardFactory.adaptiveCard({
//                 "type": "AdaptiveCard",
// 	            "version": "1.0",
//                 "body": [{
//                 "type": "Container",
//                 "items": [
//                     {
//                         "type": "TextBlock",
//                         "text": `${utterance}`,
//                         "weight": "bolder",
//                         "size": "large"
//                     },
//                     {
//                         "type": "FactSet",
//                         "facts": itemFacts
//                     }
//                 ]
//                 }]
//             });
//             cards.push(botbuilder.MessageFactory.attachment(adaptiveCard));
//             // await dc.context.sendActivity(botbuilder.MessageFactory.attachment(adaptiveCard)); // Menu items display using adaptive card
//         }
//         cards.push(botbuilder.MessageFactory.attachment(botbuilder.CardFactory.actions(Object.keys(menus))));
//         dc.context.sendActivity(botbuilder.MessageFactory.list(cards));
//         // await dc.context.sendActivity(botbuilder.MessageFactory.suggestedActions(Object.keys(menus))); // List of menus as suggested actions
//         return dc.end(); // Ends the dialog and pop it off the stack
//     }

// }
// exports.menuControl = menuControl;

// // List of menus

// const menus = [];
// menus["burgerMenu"] = {
//     cheeseBurger: {
//         description: "Cheese Burger",
//         price: 1.99
//     },
//     hamBurger: {
//         description: "Hamburger",
//         price: 2.99
//     },
//     chickenBurger: {
//         description: "Grilled Checken Burger",
//         price: 3.99
//     }
// }

// menus["dessertMenu"] = {
//     applePie: {
//         description: "Apple Pie",
//         price: 3.99
//     },
//     cherryPie: {
//         description: "Cherry Pie",
//         price: 3.99
//     },
//     chocolateChipCookie: {
//         description: "Chocolate Chip Cookie",
//         price: .99
//     }
// }

// menus["drinkMenu"] = {
//     coke: {
//         description: "Cococla",
//         price: 1.25
//     },
//     pepsi: {
//         description: "Pepsi",
//         price: 1.25
//     },
//     mtdew: {
//         description: "Mt. Dew",
//         price: 1.25
//     }
// }

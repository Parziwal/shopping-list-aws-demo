const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;

exports.handler = async (event, context, callback) => {
    let result;

    try {
        let param = {
          name: event.body.name,
          description: event.body.description,
          quantity: event.body.quantity,
          userId: event.user.sub,
        };

        if (event.itemId != undefined) {
          let existingItem = await dynamo.get({
            TableName: SHOPPING_LIST_TABLE,
            Key: {
              id: event.itemId
            },          
          }).promise();
          
          if (existingItem.Item == undefined) {
            throw {message: "The shopping list item with " + event.itemId + " not exists."};
          }
          
          param = {
            ...param,
            id: event.itemId,
            isActive: event.body.isActive
          };
          
          result = `Put item ${param.id}`;
        } else {
          param = {
            ...param,
            userId: event.user.sub,
            id: Date.now(),
            isActive: false,
          };
          
          result = `Create item ${param.id}`;
        }
        
        await dynamo
          .put({
            TableName: SHOPPING_LIST_TABLE,
            Item: param
          })
          .promise();
    } catch (err) {
        callback(new Error("Bad request: " + err.message));
    }
    
    return result;
};
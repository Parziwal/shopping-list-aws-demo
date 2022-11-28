const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;

exports.handler = async (event, context, callback) => {
    let result;

    try {
        result = await dynamo.scan({ 
            TableName: SHOPPING_LIST_TABLE,
            FilterExpression : 'userId = :user_id',
            ExpressionAttributeValues : {':user_id' : event.user.sub }
        }).promise();
    } catch (err) {
        callback(new Error("Bad request: " + err.message));
    }
    
    return result;
};
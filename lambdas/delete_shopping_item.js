const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;

exports.handler = async (event, context, callback) => {
    let result;

    try {
        await dynamo
          .delete({
            TableName: SHOPPING_LIST_TABLE,
            Key: {
              id: parseInt(event.itemId)
            },
            ConditionExpression : 'userId = :user_id',
            ExpressionAttributeValues : {':user_id' : event.user.sub }
          })
          .promise();
        result = `Deleted item ${event.itemId}`;
    } catch (err) {
        callback(new Error("Bad request: " + err.message));
    }

    return result;
};
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;

exports.handler = async (event, context, callback) => {
  let result;

  try {
    result = await dynamo
      .scan({
        TableName: SHOPPING_LIST_TABLE,
        FilterExpression: "contains(#users, :userEmail)",
        ExpressionAttributeNames: { "#users": "users" },
        ExpressionAttributeValues: { ":userEmail": event.user.email },
      })
      .promise();
  } catch (err) {
    callback(new Error("Bad request: " + err.message));
  }

  return result;
};

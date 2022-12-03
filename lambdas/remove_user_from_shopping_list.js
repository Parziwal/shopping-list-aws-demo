const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;

exports.handler = async (event, context, callback) => {
  let result;

  try {
    let shoppingList = await dynamo
      .get({
        TableName: SHOPPING_LIST_TABLE,
        Key: {
          id: event.listId,
        },
      })
      .promise();

    if (!Object.values(shoppingList.Item.users)[1].includes(event.user.email)) {
      throw {
        message: "You don't have permission to remove user from the list!",
      };
    }

    if (!Object.values(shoppingList.Item.users)[1].length == 1) {
      throw {
        message: "You can't remove yourself from the list!",
      };
    }

    result = await dynamo
      .update({
        TableName: SHOPPING_LIST_TABLE,
        Key: {
          id: event.listId,
        },
        UpdateExpression: "DELETE #users :userEmail",
        ExpressionAttributeNames: {
          "#users": "users",
        },
        ExpressionAttributeValues: {
          ":userEmail": dynamo.createSet([event.body.userEmail]),
        },
      })
      .promise();
  } catch (err) {
    callback(new Error("Bad request: " + err.message));
  }

  return result;
};

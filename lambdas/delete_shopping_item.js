const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;
const SHOPPING_LIST_ITEM_TABLE = process.env.SHOPPING_LIST_ITEM_TABLE;

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
        message: "You don't have permission to add user to the list!",
      };
    }

    await dynamo
      .delete({
        TableName: SHOPPING_LIST_ITEM_TABLE,
        Key: {
          id: parseInt(event.itemId),
        },
      })
      .promise();
    result = `Deleted item ${event.itemId}`;
  } catch (err) {
    callback(new Error("Bad request: " + err.message));
  }

  return result;
};

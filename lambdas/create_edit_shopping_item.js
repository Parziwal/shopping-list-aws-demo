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
        message: "You don't have permission to create or adit the item!",
      };
    }

    let param = {
      name: event.body.name,
      description: event.body.description,
      quantity: event.body.quantity,
      listId: event.listId,
    };

    if (event.itemId != undefined) {
      let existingItem = await dynamo
        .get({
          TableName: SHOPPING_LIST_ITEM_TABLE,
          Key: {
            id: event.itemId,
            listId: event.listId,
          },
        })
        .promise();

      if (existingItem.Item == undefined) {
        throw {
          message:
            "The shopping list item with " + event.itemId + " not exists.",
        };
      }

      param = {
        ...param,
        id: event.itemId,
        isActive: event.body.isActive,
      };

      result = `Put item ${param.id}`;
    } else {
      param = {
        ...param,
        id: Date.now(),
        isActive: false,
      };

      result = `Create item ${param.id}`;
    }

    await dynamo
      .put({
        TableName: SHOPPING_LIST_ITEM_TABLE,
        Item: param,
      })
      .promise();
  } catch (err) {
    callback(new Error("Bad request: " + err.message));
  }

  return result;
};

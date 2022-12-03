const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const SHOPPING_LIST_TABLE = process.env.SHOPPING_LIST_TABLE;

exports.handler = async (event, context, callback) => {
  let result;

  try {
    let param = {
      id: Date.now(),
      name: event.body.name,
      users: dynamo.createSet([event.user.email]),
    };

    result = `Create item ${param.id}`;

    await dynamo
      .put({
        TableName: SHOPPING_LIST_TABLE,
        Item: param,
      })
      .promise();
  } catch (err) {
    callback(new Error("Bad request: " + err.message));
  }

  return result;
};

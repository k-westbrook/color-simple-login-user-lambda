
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {

  const params = {
    TableName: 'USER_INFO',
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email"
    },
    ExpressionAttributeValues: {
      ":email": event.email
    }
  };

  docClient.query(params, function (err, data) {

    let recordReturned = data.Items[0];

    if (err || (recordReturned.password !== event.password)) {

      data = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, email and/or password not allowed.')
        }
      };
      callback(null, data);

    } else {

      data = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {

          message: JSON.stringify('Successful get.'),
          user: recordReturned
        }

      };

      callback(null, data);

    }
  })
};

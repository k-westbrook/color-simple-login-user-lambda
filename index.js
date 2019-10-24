
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {
  const params = {
    Key: {
      email: event.email,
      password: event.password
    },
    TableName: "USER_INFO"
  };

  docClient.get(params, function (err, data) {

    if (err) {

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
          user: params.Item
        }

      };


      callback(null, data);

    }
  })




};

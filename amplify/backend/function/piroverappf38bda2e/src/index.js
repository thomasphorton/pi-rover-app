/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiPiroverappGraphQLAPIIdOutput = process.env.API_PIROVERAPP_GRAPHQLAPIIDOUTPUT
var apiPiroverappGraphQLAPIEndpointOutput = process.env.API_PIROVERAPP_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./query.js').update;
const apiKey = process.env.API_KEY;

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    console.log(event);

    const item = {
        input: {
            id: "28eadfb3-6e52-48a7-8122-4385edaab937",
            name: "LambdaRover",
            imageURL: "Item Generated from Lambda"
        }
    };

    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "UpdateRover",
        variables: item
    });

    if (apiKey) {
        req.headers["x-api-key"] = apiKey;
    } else {
        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    }

    const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });

    return {
        statusCode: 200,
        body: data
    };
};
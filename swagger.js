const swaggerAutogen = require('swagger-autogen')()
const m2s = require('mongoose-to-swagger')
const consumerSchema = m2s(require("./components/consumer/consumer.model"))
const courseSchema = m2s(require("./components/course/course.model"))
const doc = {
    info: {
        version: "0.0.1",
        title: "ENDEXEL API",
        description: "ُEndexel Platform RESTful API Documentaion"
    },
    host: "localhost:1234",
    basePath: "/",
    schemes: ['http'], //, 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name":"Consumers",
            "description": "Consumer Endpoints"
        }
        // {
        //     "name": "User",
        //     "description": "Endpoints"
        // }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    definitions: {
        consumerSchema,
        courseSchema
        // Parents: {
        //     father: "Simon Doe",
        //     mother: "Marie Doe"
        // },
        // User: {
        //     name: "Jhon Doe",
        //     age: 29,
        //     parents: {
        //         $ref: '#/definitions/Parents'
        //     },
        //     diplomas: [
        //         {
        //             school: "XYZ University",
        //             year: 2020,
        //             completed: true,
        //             internship: {
        //                 hours: 290,
        //                 location: "XYZ Company"
        //             }
        //         }
        //     ]
        // },
        // AddUser: {
        //     $name: "Jhon Doe",
        //     $age: 29,
        //     about: ""
        // }
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./components/consumer/consumer.routes.js','./components/uploader/uploader.routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app')           // Your project's root file
})
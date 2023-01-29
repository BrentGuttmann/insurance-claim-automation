const swaggerAutognerator = require('swagger-autogen')();

try {
    // Get port from environment and store in Express.
    const port = parseInt(process.env.PORT, 10) || parseInt(process.env.LOCAL_PORT, 10) || 3059
    const doc = {
        info: {
            title: 'Incourage Insurance Claim API',
            description: 'Swagger documentation of our API endpoints.',
        },
        host: `localhost:${port}`,
        schemes: ['http', 'https'],
        definitions: {
            User: {
                id: 1,
                firstName: 'firstname',
                lastName: 'lastname',
                fullName: 'some fullname',
                email: 'random@email.com',
            },
        },

    };


    const outputFile = './swagger-output.json';
    const endpointsFiles = ['./web/app.js'];

    swaggerAutognerator(outputFile, endpointsFiles, doc);

} catch (error) {
    console.error('Error generating doc', error);
}
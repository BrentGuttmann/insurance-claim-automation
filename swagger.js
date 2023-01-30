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
                membershipId: "ZZXX11",
                lastName: 'lastname',
                fullName: 'some fullname',
                email: 'random@email.com',
                createdAt: "2022-04-30T10:42:38.943Z",
                updatedAt: "2022-02-30T10:42:38.943Z"
            },
            Claim: {
                id: 1,
                name: 'firstname',
                userId: 1,
                completed: false,
                createdAt: "2022-04-30T10:42:38.943Z",
                updatedAt: "2022-02-30T10:42:38.943Z"
            },
            Media: {
                id: 1,
                name: 'firstname',
                url: "https://randome.url/path/specs",
                claimId: 1,
                createdAt: "2022-04-30T10:42:38.943Z",
                updatedAt: "2022-02-30T10:42:38.943Z"
            },
        },

    };


    const outputFile = './swagger-output.json';
    const endpointsFiles = ['./web/app.js'];

    swaggerAutognerator(outputFile, endpointsFiles, doc);

} catch (error) {
    console.error('Error generating doc', error);
}
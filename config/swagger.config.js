const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "iAppoint API Documentation",
      version: "2.0.0",
      description: "iAppoint API Documentation",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            fullname: { type: "string" },
            email: { type: "string", format: "email" },
            picture: { type: "string", format: "url" },
            role: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: [
            "id",
            "fullname",
            "email",
            "picture",
            "role",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./controllers/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app, PORT) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  console.log(`Swagger running on port http://localhost:${PORT}/docs`);
};

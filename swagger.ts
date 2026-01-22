import swaggerJSDoc from "swagger-jsdoc"

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Projeto Hanami API",
      version: "1.0.0",
      description: "API de Análise de Dados",
    },
  },
  apis: ["./src/routes.ts"],
})

export default swaggerSpec

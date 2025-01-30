import { Express, Request, Response, NextFunction } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learner API DOCS",
      version,
    },
  },
  apis: [
    "../../dist/modules/auth/auth.routes.js",
    "../../dist/modules/users/user.model.js",
    "../modules/auth/auth.routes.ts",
    "../modules/users/user.model.ts",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggeDocs(app: Express, port: number) {
  // swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  // Docs in json format
}

export default swaggeDocs;

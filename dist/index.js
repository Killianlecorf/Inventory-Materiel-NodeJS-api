"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const DBconnect_1 = __importDefault(require("./src/Config/DBconnect"));
const Materials_routes_1 = __importDefault(require("./src/Routes/Materials.routes"));
const cors_middleware_1 = require("./src/middleware/cors.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(cors_middleware_1.corsMiddleware);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/materials', Materials_routes_1.default);
(0, DBconnect_1.default)();
app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});

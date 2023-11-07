"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const DBconnect_1 = __importDefault(require("./src/Config/DBconnect"));
const Materials_routes_1 = __importDefault(require("./src/Routes/Materials.routes"));
const cors_middleware_1 = require("./src/middleware/cors.middleware");
const Mail_routes_1 = __importDefault(require("./src/Routes/Mail.routes"));
const LendMaterials_routes_1 = __importDefault(require("./src/Routes/LendMaterials.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
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
app.use('/api/service', Mail_routes_1.default);
app.use('/api/lend', LendMaterials_routes_1.default);
(0, DBconnect_1.default)();
if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) !== 'test') {
    app.listen(port, () => {
        console.log(`Le serveur est en écoute sur le port ${port}`);
    });
}

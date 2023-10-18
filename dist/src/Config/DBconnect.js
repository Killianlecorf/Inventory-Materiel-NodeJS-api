"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function isString(value) {
    return typeof value === 'string';
}
const databaseConnection = () => {
    const uri = process.env.DBNAME;
    try {
        if (isString(uri)) {
            mongoose_1.default.connect(uri);
            console.log('Connexion à la base de données MongoDB réussie');
        }
        else {
            console.error('Erreur : uri n\'est pas de type string');
        }
        console.log('Connexion à la base de données MongoDB réussie');
    }
    catch (error) {
        console.error('Erreur lors de la connexion à la base de données MongoDB', error);
    }
};
exports.default = databaseConnection;

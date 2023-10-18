import mongoose from 'mongoose';

function isString(value: any): value is string {
    return typeof value === 'string';
}

const databaseConnection = () => {
    const uri = process.env.DBNAME ; 

    try {

        if (isString(uri)) {
            mongoose.connect(uri);
            console.log('Connexion à la base de données MongoDB réussie');
        } else {
            console.error('Erreur : uri n\'est pas de type string');
        }
        console.log('Connexion à la base de données MongoDB réussie');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données MongoDB', error);
    }

}

export default databaseConnection;
import SERVER_CONFIG from "./config";
import mongoose from 'mongoose'

const connectDB = () => {
    return new Promise( (resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('database closed'))
            .once('open', () => resolve('mongoose.connection MAIN'));
        mongoose.connect(SERVER_CONFIG.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    })
};

// const connectAtlas = () => {
//     return new Promise( (resolve, reject) => {
//         mongoose.Promise = global.Promise;
//         mongoose.set('debug', true);
//         mongoose.connection
//             .on('error', error => reject(error))
//             .on('close', () => console.log('database closed'))
//             .once('open', () => resolve('mongoose.connection ATLAS'));
//         mongoose.connect(SERVER_CONFIG.MONGO_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true})
//     })
// };

export = {
    connectDB,
} ;

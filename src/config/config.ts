
export interface SERVER {
    PORT: number,
    MONGO_URI: string
    jwt: string
    MONGO_ATLAS: string
}

const SERVER_CONFIG: SERVER = {
        PORT:  9998,
        MONGO_URI: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
        MONGO_ATLAS: 'mongodb+srv://Vladislav1399:90397850@cluster0-tqtgm.mongodb.net/test?retryWrites=true&w=majority',
        jwt: 'dev-jwt' || process.env.JWT,
};




export default  SERVER_CONFIG




import app from "../app";
import SERVER_CONFIG from '../config/config'
import mongoDatabases from "../config/database";

mongoDatabases.connectDB().then(info => {
    console.log('MAIN database connect', info);
    app.listen(SERVER_CONFIG.PORT, () => {
        console.log('server started')
    });
}).catch( (err: Error) => {
    console.log('error connect MAIN database', err);
    process.exit(1)
});



import mysql from 'mysql'

const pool = mysql.createPool({
    host: "s21.thehost.com.ua",
    user: "enastation",
    database: "beauty-space",
    password: "wegas90397850"
});



const getConnection = (callback: any) => {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

const endConnection = (callback: any) => {
    pool.end(function(err: Error) {
        callback(err);
    });
};



export default getConnection

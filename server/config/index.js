const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jndjandkjasnd8as9djajsodksnadjashd80asdhasnlkdsand";
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/to-do-app"

let GOOGLE_CLIENT_ID = "164013679388-6i1p7in3sv7cdnlq5j75jlsaj6t23v10.apps.googleusercontent.com";
let GOOGLE_CLIENT_SECRET = "YDrKEekDkPMkisyYB4nFDDkR";

// let SEND_GRID_KEY = "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";
// let SEND_GRID_ID = "a8Xf2217QO6MTwZZ4fOWBQ";

// if (process.env.NODE_ENV === 'production') {

//     GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
//     GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//     // SEND_GRID_ID = proces.env.SEND_GRID_ID;
//     // SEND_GRID_KEY = process.env.SEND_GRID_KEY;
// }

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = "mongodb://localhost/to-do-app-test"
}


module.exports = {
    JWT_SECRET_KEY,
    MONGODB_URI,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
};

// SEND_GRID_ID,
// SEND_GRID_KEY
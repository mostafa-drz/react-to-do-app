const jwt = require('jwt-simple');
const { JWT_SECRET_KEY } = require('../config/index');
const { sendEmail } = require('../services/sendGrid');

const tokenGenrator = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, JWT_SECRET_KEY);
};

const sendToDoReminder = async(to, { date, description, reminder }) => {
    try {
        const html = makeEmailTemplate(description, date);
        const result = await sendEmail(to, 'mostafa69d@gmail.com', html, `Don't forget to do it!`);
        if (result.batch_id) {
            return Promise.resolve({ batch_id: result.batch_id });
        } else {
            throw new Error({ error: result.error });
        }
    } catch (error) {
        console.log(error);
        return Promise.reject({ error });
    }

}

const makeEmailTemplate = (description, date) => {
    return `
        <h3>Hi There!</h3>
        <p>You have a task to complete! Don't forget to Do it!</p>
        <p>${description}</p>
        <p>${date}</p>
        <br>
        <footer><a href='http://www.do.do'>Do</a></footer>
    `
}

module.exports = { tokenGenrator, sendToDoReminder };
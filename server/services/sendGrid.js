const sendgrid = require('@sendgrid/mail');
const { SEND_GRID_ID, SEND_GRID_KEY } = require('../config');

const sendEmail = async(to, from, html, subject, date) => {
    const message = {
        to,
        from,
        subject,
        sendAt: date,
        html
    };
    const res = await sendgrid.send(message);
    if (res.status === 201) {
        return Promise.resolve({ batch_id: res.batch_id });
    } else {
        return Promise.reject({ error: 'something went wrong' });
    }
}

const sendToDoReminder = async(to, { date, descirption, reminder }) => {
    const html = makeEmailTemplate(description, date);
    const result = await sendEmail(to, 'mostafa69d@gmail.com', html, `Don't forget to do it!`, reminder);

    if (result.batch_id) {
        return Promise.resolve({ batch_id: result.batch_id });
    } else {
        return Promise.reject({ error: result.error });
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
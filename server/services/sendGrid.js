/* I'm not gonna use this service in this project, but keep everthing here*/
const sendgrid = require('@sendgrid/mail');
const { SEND_GRID_ID, SEND_GRID_KEY } = require('../config');
const axios = require('axios');


const sendScheduledEmail = async(to, from, html, subject, date) => {
    sendgrid.setApiKey(SEND_GRID_KEY);
    try {
        const sendAt = new Date(date).getTime();
        const message = {
            to,
            from,
            subject,
            html,
            sendAt
        };
        const res = await sendgrid.send(message);
        if (res.status === 201) {
            return Promise.resolve({ batch_id: res.batch_id });
        } else {
            throw Error({ error: 'something went wrong when trying to send email with sengrid', errors: res.body.errors });
        }
    } catch (error) {
        return Promise.reject({ error });
    }
}

const sendEmail = async(to, from, html, subject) => {
    sendgrid.setApiKey(SEND_GRID_KEY);
    try {
        const message = {
            to,
            from,
            subject,
            html
        };
        const res = await sendgrid.send(message);
        if (res.status === 201) {
            return Promise.resolve({ batch_id: res.batch_id });
        } else {
            throw Error({ error: 'something went wrong when trying to send email with sengrid', errors: res.body.errors });
        }
    } catch (error) {
        return Promise.reject({ error });
    }
}


const cancelEmailScheduled = async(batchId) => {
    const body = {
        "batch_id": batchId,
        "status": "cancel",
    }

    const header = {
        Authorization: `Bearer ${SEND_GRID_KEY}`
    }

    const SEND_GRID_BASE_URL = 'https: //api.sendgrid.com/v3/user/scheduled_sends';

    const res = axios.post(SEND_GRID_BASE_URL, body, header);

}


module.exports = { sendEmail, sendScheduledEmail };
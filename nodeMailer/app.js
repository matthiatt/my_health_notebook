const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = "964374548218-u5jn5l4dp3bai8dla4g19n4s0viiaddp.apps.googleusercontent.com"
const CLIENT_SECRET= "Ffa6AtkJ7w7f9GIeBUqowrNJ"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04JJ0rJIqnaMPCgYIARAAGAQSNwF-L9IrlJGer0CXdguuHsBhkomLBtTDQH-2iGKFVyPo57ofjOImxTot_fYfruRiQO6UQidtqAc"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail() {
    try{
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "contactservicenow123@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailOptions = {
        from: "ADMIN <contactservicenow123@gmail.com>",
        to: "contactservicenow123@gmail.com",
        subject: "Hello from gmail api",
        text: "Hello from gmail using api",
        html: "<h1>Hello from gmail using api</h1>"
    };

    const result = await transport.sendMail(mailOptions)
    return result

    } catch(err) {
        return err
    }
}

sendMail().then((result) => console.log("Email sent...", result))
.catch((err) => console.log(err.message));

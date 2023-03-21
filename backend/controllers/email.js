const nodemailer = require('nodemailer');

exports.send = (req, res, next) => {
    let mailOptions = {
        from: 'coralie.testa@hotmail.com',
        to: req.body.email,
        subject: "WodBooking- Confirmation de l'activité",
        //text: 'Some content to send',
        html: `<p>Nous confirmons votre inscription le <b>${req.body.date}</b> de ${req.body.startingHour}h à ${req.body.startingHour+1}h.</p><p>Belle journée,</p><p>WodBooking</p>`
      };
    
    // Mail transport configuration
    let transporter = nodemailer.createTransport({
    service: 'outlook',
        auth: {
            user: 'coralie.testa@hotmail.com',
            pass: 'Barjobars29',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    
      // Delivering mail with sendMail method
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
      });

}
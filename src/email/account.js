const sgMail=require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.send({

    to:'st16@iitbbs.ac.in',
    from:'vaibhavvaidya669@gmail.com',
    subject:'Galti',
    text:'Yes I am a mistake'
})
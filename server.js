const app = require('./app')
const PORT = process.env.PORT || 1234

require('./services/mail/mail')

process.on('uncaughtException', err =>{
    console.log('UNCAUGHT EXCEPTION!! SHUTTING DOWN...')
    console.log(err.name, err.message)
    process.exit(1)
})

const server = app.listen(PORT, ()=>{
    console.log(`Server is running!\nAPI documentation: http://localhost:${PORT}/doc`)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!! SHUTTING DOWN...')
    console.log(err.name, err.message)
    server.close(()=>{
        process.exit(1)
    })
})


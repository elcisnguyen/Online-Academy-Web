const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
// require('express-async-errors')


const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({
	extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', exphbs())
app.set('view engine', 'hbs')

// require('./middlewares/session.mdw')(app)
// require('./middlewares/view.mdw')(app)
// require('./middlewares/locals.mdw')(app)
// require('./middlewares/routes.mdw')(app)
//
// app.use(function (err, req, res, next) {
// 	console.error(err.stack)
// 	res.render('500', {
// 		layout: false
// 	})
// })

app.get('/', (req, res) => {
	res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
	console.log(`Educational Web App is listening on port ${PORT}`)
})
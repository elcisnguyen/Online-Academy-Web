const express = require('express')
const exphbs = require('express-handlebars')
const exphbsSection = require('express-handlebars-sections')
const path = require('path')
const numeral = require('numeral')
require('express-async-errors')


// App instance
const app = express()

if (process.env.NODE_ENV !== 'production') {
	const morgan = require('morgan')
	app.use(morgan('dev'))

	require('dotenv').config()
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.engine('hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'default',
	helpers: {
		section: exphbsSection(),
		formatNum(val) { return numeral(val).format('0.0') },
		add(a, b) { return a + b },
		isEqual(a, b, opts) {
			if (a === b) return opts.fn(this)
			return opts.inverse(this)
		},
		isGreater(a, b, opts) {
			if (a > b) return opts.fn(this)
			return opts.inverse(this)
		},
		isPreviewable(idx, opts) {
			if (idx < +process.env.PREVIEW_MATERIAL) return opts.fn(this)
			return opts.inverse(this)
		}
	}
}))
app.set('view engine', 'hbs')

require('./middlewares/session.mdw')(app)
require('./middlewares/locals.mdw')(app)
require('./middlewares/routes.mdw')(app)
require('./middlewares/error.mdw')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
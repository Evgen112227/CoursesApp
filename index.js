const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');

const app = express();

//конфигурируем экземпляр. В нашем прилодении будет несколько layout
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

//регистрируем данный модуль как движок для рендеринга HTML
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//для того, чтобы статичная папка читалась
app.use(express.static(path.join(__dirname, 'public')));

//для обработки формы, перед тем, как регистрируем роуты!
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
	//достаем все содержимое файла courses.json
	const courses = await Course.getAll();
	res.render('courses', {
		title: 'Courses',
		isCourses: true,
		//передаем данный объет на страницу - как параметр этр делается
		courses,
	});
});

//для редактирования нужна отдельная страница
router.get('/:id/edit', async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/');
	}

	const course = await Course.getById(req.params.id);

	res.render('course-edit', {
		title: `Edit ${course.title}`,
		course,
	});
});

router.post('/edit', async (req, res) => {
	await Course.update(req.body);
	res.redirect('/courses');
});

//для обработки динамики - /:id
router.get('/:id', async (req, res) => {
	console.log(req.params);
	const course = await Course.getById(req.params.id);
	res.render('course', {
		layout: 'empty',
		title: `Course ${course.title}`,
		course,
	});
});

module.exports = router;

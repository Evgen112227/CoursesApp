const { Router } = require('express');
const fs = require('fs');
const path = require('path');

//подключаем модель добавления данных для роутера add
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
	//не нужно указывать расширение, т.к. указали ранее, не нужно указывать папку views, т.к. указали ранее
	res.render('add', {
		title: 'Add Course',
		isAdd: true,
	});
});

// Добавим обработчик POST запроса за обработку формы
router.post('/', async (req, res) => {
	const { title, price, img } = req.body;
	const course = new Course(title, price, img);
	await course.save();
	res.redirect('/courses');
});

module.exports = router;

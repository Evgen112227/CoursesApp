const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	//не нужно указывать расширение, т.к. указали ранее, не нужно указывать папку views, т.к. указали ранее
	res.render('index', {
		title: 'Main Page',
		isHome: true,
	});
});

module.exports = router;

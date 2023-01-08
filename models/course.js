const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
	constructor(title, price, img) {
		this.title = title;
		this.price = price;
		this.img = img;
		this.id = uuidv4();
	}

	toJSON() {
		return {
			title: this.title,
			price: this.price,
			img: this.img,
			id: this.id,
		};
	}

	//метод для сохранения всех данных в файле. Нужно преобразовать все данные в формат JSON и сохранить их в файл
	//метод save использует статический метод класса! Метод класса используе в себе метод этого же класса!
	async save() {
		//получили содержимое файла courses.json. Перед тем, как пушить, нужно получить значения, иначе все затрется
		const courses = await Course.getAll();
		console.log(courses);
		//запушим туда
		courses.push(this.toJSON());
		//записываем в файл данные из формы
		return new Promise((resolve, reject) => {
			fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	//метод для получения всех данных. Читаем файл и возвращаем промис
	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(content));
				}
			});
		});
	}

	static async getById(id) {
		//Получаем все курсы
		const courses = await Course.getAll();
		//итерируемся на предмет совпадения переданного id
		return courses.find((c) => c.id === id);
	}

	static async update(course) {
		const courses = await Course.getAll();
		// ищем индекс того курса, который хотим обновить
		const index = courses.findIndex((c) => c.id === course.id);
		courses[index] = course;
		//Пишем в файл, как при методе save
		return new Promise((resolve, reject) => {
			fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}

module.exports = Course;

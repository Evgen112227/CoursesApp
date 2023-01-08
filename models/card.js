const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

class Card {
	static async add(course) {
		//Получаем все данные корзины
		const card = await Card.fetch();

		const index = card.courses.findIndex((c) => c.id === course.id);
		const candidate = card.courses[index];

		if (candidate) {
			//курс уже есть
			candidate.count++;
			card.courses[index] = candidate;
		} else {
			//нужно добавить
			course.count = 1;
			card.courses.push(course);
		}

		card.price += +course.price;

		return new Promise((resolve, reject) => {
			fs.writeFile(p, JSON.stringify(card), (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}

	static async remove(id) {
		const card = await Card.fetch();

		const index = card.courses.findIndex((c) => c.id === id);
		const course = card.courses[index];

		if (course.count === 1) {
			//удалить
			card.courses = card.courses.filter((c) => c.id !== id);
		} else {
			//изменить кол-во
			card.courses[index].count--;
		}

		card.price -= course.price;

		return new Promise((resolve, reject) => {
			fs.writeFile(p, JSON.stringify(card), (err) => {
				if (err) {
					reject(err);
				}
				resolve(card);
			});
		});
	}

	static async fetch() {
		//считать файл, оберунть в промис и вернуть наружу
		return new Promise((resolve, reject) => {
			fs.readFile(p, 'utf-8', (err, content) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(content));
				}
			});
		});
	}
}

module.exports = Card;

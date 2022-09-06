const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('index', {products});
	},
	search: (req, res) => {
		const keyboard = req.query.keywords;
        let result = products.filter(product => product.name.toLowerCase().includes(keyboard.toLowerCase()))

		result = result.map(product => {
			if(product.discount != 0){
				let price = ( (product.price * product.discount)/ 100 )
				price = toThousand(price);
				return {
					...product,
					price : price

				}
			}else{
				return {
					...product
				}
			}
		})
		return res.render('results', { result , keyboard})

	},
};

module.exports = controller;

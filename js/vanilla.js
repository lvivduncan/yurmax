// https://github.com/lvivduncan/levus-onslide-slider
{ const e = document.querySelector("#levus-slider"); if (null !== e) { const t = e.querySelectorAll("article"), s = t[0], d = e.querySelector("#levus-left"), o = e.querySelector("#levus-right"); let i = 0; const r = t.length - 1; function hideArrow() { d.classList.add("hide"), o.classList.add("hide"), e.addEventListener("mouseover", () => { d.removeAttribute("class"), o.removeAttribute("class") }), e.addEventListener("mouseout", () => { d.classList.add("hide"), o.classList.add("hide") }) } function autoScroll() { setInterval(() => { t.forEach(e => e.removeAttribute("class")), i < r ? i++ : i = 0, t[i].classList.add("show") }, 8e3) } d.addEventListener("click", () => { setTimeout(() => { t.forEach(e => e.removeAttribute("class")), i < r ? i++ : i = 0, t[i].classList.add("show") }, 500) }), o.addEventListener("click", () => { setTimeout(() => { t.forEach(e => e.removeAttribute("class")), 0 === i ? i = r : i--, t[i].classList.add("show") }, 500) }), document.addEventListener("DOMContentLoaded", () => window.innerWidth < 1200 ? autoScroll() : hideArrow()), document.addEventListener("DOMContentLoaded", () => s.classList.add("show")), window.addEventListener("resize", () => window.innerWidth < 1200 ? autoScroll() : hideArrow()) } }

// https://github.com/lvivduncan/levus-sort
{ const t = document.querySelectorAll("#levus-buttons span"), e = document.querySelectorAll("#levus-items figure"); function sort(t) { const s = []; e.forEach(e => s.push(e.dataset.item.split(",")[t])), isNaN(+s[0]) ? s.sort() : s.sort((t, e) => t - e), e.forEach(e => { s.forEach((o, r) => { o == e.dataset.item.split(",")[t] && (e.style.order = s.indexOf(s[r])) }) }) } function sortByName() { sort(0) } function sortByPrice() { sort(1) } function sortBySize() { sort(2) } t.length > 0 && (t[0].addEventListener("click", sortByName), t[1].addEventListener("click", sortByPrice), t[2].addEventListener("click", sortBySize)) }

// https://github.com/lvivduncan/levus-shop
{
	// check basket
	if (document.querySelector('#basket')) {

		// wiev quantity goods
		const quantity = document.querySelector('#basket-quantity');

		// view sum
		const sum = document.querySelector('#basket-sum');

		// view selected goods
		const selected = document.querySelector('#basket-goods');

		// all buttons click
		document.querySelectorAll('.button').forEach(button => button.addEventListener('click', addGoods));

		// clear localStorage
		document.querySelector('#basket-clear').addEventListener('click', clearStorage);

		// delete goods one by one
		selected.addEventListener('click', e => removeGoods(e));

		// #basket-button (view/hide)
		const basketButton = document.querySelector('#basket-button');

		// view
		viewSum();
		viewQuantity();
		viewSelected();
		viewBasketButton();

		// add to localStorage
		function addGoods() {

			// temporary array
			const content = { name: this.dataset.name, size: this.dataset.size, price: this.dataset.price, number: "1", img: this.dataset.img };

			// check localStorage and add data to localStorage
			if (localStorage.getItem('basket') === null) {

				// create array for data
				const data = [];

				// push object with 3 items to array
				data.push(content);

				// add data to localStorage
				localStorage.setItem('basket', JSON.stringify(data));

				// reload 
				viewQuantity();
				viewSum();
				viewSelected();
				viewBasketButton();
			} else {

				// load data from localStorage
				const data = JSON.parse(localStorage.getItem('basket'));

				// new name 
				const name = this.dataset.name;

				if (data.find(item => item.name == name)) {
					// checked
					const checked = data.find(item => item.name === name);

					// add 1
					checked.number++;
				} else {

					// push object with 5 items to array
					data.push(content);
				}

				// add data to localStorage
				localStorage.setItem('basket', JSON.stringify(data));

				// reload 
				viewQuantity();
				viewSum();
				viewSelected();
				viewBasketButton();
			}
		}

		// return quantity goods
		function viewQuantity() {
			if (localStorage.getItem('basket') === null) {
				quantity.innerHTML = 0;
			} else {
				quantity.innerHTML = JSON.parse(localStorage.getItem('basket')).reduce((sum, item) => sum += +item.number, 0);

				// quantity.innerHTML = JSON.parse(localStorage.getItem('basket')).map(item => item.price * item.number).reduce((sum, item) => sum + +item, 0);
			}
		}

		// return sum
		function viewSum() {
			if (localStorage.getItem('basket') === null) {
				sum.innerHTML = 0;
			} else {
				sum.innerHTML = JSON.parse(localStorage.getItem('basket')).map(item => item.price * item.number).reduce((sum, item) => sum + +item, 0);
			}
		}

		// clear localStorage
		function clearStorage() {
			localStorage.clear('basket');

			// reload
			viewSum();
			viewQuantity();
			viewSelected();
			viewBasketButton();
		}

		// view selected goods
		function viewSelected() {
			if (localStorage.getItem('basket') === null) {
				selected.innerHTML = '';
			} else {
				selected.innerHTML =
					JSON.parse(localStorage.getItem('basket'))
						.reduce((sum, item, i) => sum + `<p data-id="${i}"><i></i> ${item.name} [${item.number}]: ${item.size} - ${item.price}грн</p>`, '');
			}
		}

		// delete goods from basket
		function removeGoods(e) {
			if (e.target.tagName === 'I') {

				// id goods
				const id = e.target.parentNode.dataset.id;

				// goods from storage
				const data = JSON.parse(localStorage.getItem('basket'));

				// remove item
				data.splice(id, 1);

				// claer storage or return data to localStorage
				if (data.length === 0) {
					localStorage.removeItem('basket');
				} else {
					localStorage.setItem('basket', JSON.stringify(data));
				}

				// reload
				viewSum();
				viewQuantity();
				viewSelected();
				viewBasketButton();
			}
		}

		// view/hide basket button
		function viewBasketButton() {
			if (localStorage.getItem('basket') === null) {
				basketButton.style.display = 'none';
				basketButton.innerHTML = '';
			} else {
				basketButton.style.display = 'block';
				basketButton.innerHTML = JSON.parse(localStorage.getItem('basket')).reduce((sum, item) => sum += +item.number, 0);
			}
		}

		// check #order-goods
		if (document.querySelector('#order-goods')) {
	
			// table
			const orderGoods = document.querySelector('#order-goods');
	
			const orderSum = document.querySelector('#order-sum');
	
			// delete goods one by one
			orderGoods.addEventListener('click', e => changeGoods(e));
	
			viewGoods();
			viewSumBasket();
			viewSum();

			viewQuantity();
			viewSelected();
			viewBasketButton();
	
			// view all ordered goods 
			function viewGoods() {
				if (localStorage.getItem('basket') === null) {
					orderGoods.innerHTML = '';
				} else {
					orderGoods.innerHTML =
						JSON.parse(localStorage.getItem('basket'))
							.reduce((sum, item, i) => sum + `
								<div data-id="${i}" class="product">
									<div class="product-img"><img src="${item.img}" alt=""></div>
									<div class="product-name">${item.name}</div>
									<div class="product-size">${item.size}</div>
									<div class="product-price">
										<small>${item.price}грн</small>
										<p>${item.price*item.number}грн</p>
									</div>
									<div class="product-quantity">
										<span class="minus"></span>
											<span class="number">${item.number}</span>
										<span class="plus"></span>
									</div>
									<div class="product-delete">
										<i></i>
									</div>									
								</div>`, '');
				}
			}
	
			// change quantity goods
			function changeGoods(e) {
	
				// id goods
				const id = e.target.parentNode.parentNode.dataset.id;
	
				// goods from storage
				const data = JSON.parse(localStorage.getItem('basket'));
	
				// to delete
				if (e.target.tagName === 'I') {
	
					// remove item
					data.splice(id, 1);
	
					// claer storage or return data to localStorage
					if (data.length === 0) {
						localStorage.removeItem('basket');
					} else {
						localStorage.setItem('basket', JSON.stringify(data));
					}
				} else if (e.target.className === 'minus') {
					if (data[id].number > 1) {
						// remove 1
						data[id].number--;
					} else {
						// remove item
						data.splice(id, 1);
					}
				} else if (e.target.className === 'plus') {
					// add 1
					data[id].number++;
				}
	
				// return data to localStorage
				localStorage.setItem('basket', JSON.stringify(data));
	
				// check localStorage
				if (localStorage.getItem('basket').length < 3) {
					localStorage.clear('basket');
				}
	
				// reload
				viewGoods();
				viewSum();
				viewSumBasket();
				viewBasketButton()

				viewQuantity();
				viewSelected();
				viewBasketButton();

			}
	
			// return sum
			function viewSumBasket() {
				if (localStorage.getItem('basket') === null) {
					// sum.innerHTML = 0;
					orderSum.style.display = 'none';
				} else {
					orderSum.innerHTML = JSON.parse(localStorage.getItem('basket')).map(item => item.price * item.number).reduce((sum, item) => sum + +item, 0) + 'грн';
					orderSum.style.display = 'block';
				}
			}

			// form for sale
			function viewForm(){

			}
	
		}

	}

}
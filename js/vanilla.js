// https://github.com/lvivduncan/levus-onslide-slider
{const e=document.querySelector("#levus-slider");if(null!==e){const t=e.querySelectorAll("article"),s=t[0],d=e.querySelector("#levus-left"),o=e.querySelector("#levus-right");let i=0;const r=t.length-1;function hideArrow(){d.classList.add("hide"),o.classList.add("hide"),e.addEventListener("mouseover",()=>{d.removeAttribute("class"),o.removeAttribute("class")}),e.addEventListener("mouseout",()=>{d.classList.add("hide"),o.classList.add("hide")})}function autoScroll(){setInterval(()=>{t.forEach(e=>e.removeAttribute("class")),i<r?i++:i=0,t[i].classList.add("show")},8e3)}d.addEventListener("click",()=>{setTimeout(()=>{t.forEach(e=>e.removeAttribute("class")),i<r?i++:i=0,t[i].classList.add("show")},500)}),o.addEventListener("click",()=>{setTimeout(()=>{t.forEach(e=>e.removeAttribute("class")),0===i?i=r:i--,t[i].classList.add("show")},500)}),document.addEventListener("DOMContentLoaded",()=>window.innerWidth<1200?autoScroll():hideArrow()),document.addEventListener("DOMContentLoaded",()=>s.classList.add("show")),window.addEventListener("resize",()=>window.innerWidth<1200?autoScroll():hideArrow())}}

// https://github.com/lvivduncan/levus-sort
{const t=document.querySelectorAll("#levus-buttons span"),e=document.querySelectorAll("#levus-items figure");function sort(t){const s=[];e.forEach(e=>s.push(e.dataset.item.split(",")[t])),isNaN(+s[0])?s.sort():s.sort((t,e)=>t-e),e.forEach(e=>{s.forEach((o,r)=>{o==e.dataset.item.split(",")[t]&&(e.style.order=s.indexOf(s[r]))})})}function sortByName(){sort(0)}function sortByPrice(){sort(1)}function sortBySize(){sort(2)}t.length>0&&(t[0].addEventListener("click",sortByName),t[1].addEventListener("click",sortByPrice),t[2].addEventListener("click",sortBySize))}

// https://github.com/lvivduncan/levus-basket
{
	// wiev quantity goods
	const quantity = document.querySelector('#basket-quantity');

	// view sum
	const sum = document.querySelector('#basket-sum');

	// view selected goods
	const selected = document.querySelector('#basket-goods');

	// button 
	const button = document.querySelector('#basket-button');

	// all buttons click
	document.querySelectorAll('.button').forEach(button => button.addEventListener('click', addGoods));

	// click by button #basket-order
	document.querySelector('#basket-order').addEventListener('click', getOrder);

	// clear localStorage
	document.querySelector('#basket-clear').addEventListener('click', clearStorage);

	// delete goods one by one
	selected.addEventListener('click', e => removeGoods(e));

	// view sum
	viewSum();

	// view quantity
	viewQuantity();

	// view selected goods
	viewSelected();

	// view\hide button
	viewHide();

	// add to localStorage
	function addGoods() {

		// temporary array
		const content = { name: this.dataset.name, size: this.dataset.size, price: this.dataset.price };

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
			viewHide();
			message();
		} else {

			// load data from localStorage
			const data = JSON.parse(localStorage.getItem('basket'));

			// push object with 3 items to array
			data.push(content);

			// add data to localStorage
			localStorage.setItem('basket', JSON.stringify(data));

			// reload 
			viewQuantity();
			viewSum();
			viewSelected();
			viewHide();
			message();
		}
	}

	// return quantity goods
	function viewQuantity() {
		if (localStorage.getItem('basket') === null) {
			quantity.innerHTML = 0;
		} else {
			quantity.innerHTML =
			button.innerHTML = 
				JSON.parse(localStorage.getItem('basket')).length;
		}
	}

	// return sum
	function viewSum() {
		if (localStorage.getItem('basket') === null) {
			sum.innerHTML = 0;
		} else {
			sum.innerHTML =
				JSON.parse(localStorage.getItem('basket'))
					.map(item => item.price)
					.reduce((sum, item) => sum + +item, 0);
		}
	}

	// get order
	function getOrder() {

	}

	// clear localStorage
	function clearStorage() {
		localStorage.clear('basket');

		// reload
		viewSum();
		viewQuantity();
		viewSelected();
		viewHide();
	}

	// view selected goods
	function viewSelected() {
		if (localStorage.getItem('basket') === null) {
			selected.innerHTML = '';
		} else {
			selected.innerHTML =
				JSON.parse(localStorage.getItem('basket'))
					.reduce((sum, item, i) => sum + `<p><i data-id="${i}"></i> ${item.name} - ${item.size} - ${item.price}грн</p>`, '');
		}
	}

	// delete goods from basket
	function removeGoods(e) {
		if (e.target.tagName === 'I') {

			// id goods
			const id = e.target.dataset.id;

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
			viewHide();
		}
	}

	// view\hide
	function viewHide(){
		localStorage.getItem('basket') === null ? button.style.display = 'none' : button.style.display = 'block';
	}

	// view message
	function message(){
		$.fancybox.open('Товар додано у кошик!');
		setTimeout(() => $.fancybox.close(), 1000);
	}
}
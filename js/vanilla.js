// https://github.com/lvivduncan/levus-onslide-slider
{ const e = document.querySelector("#levus-slider"); if (null !== e) { const t = e.querySelectorAll("article"), s = t[0], d = e.querySelector("#levus-left"), o = e.querySelector("#levus-right"); let i = 0; const r = t.length - 1; function hideArrow() { d.classList.add("hide"), o.classList.add("hide"), e.addEventListener("mouseover", () => { d.removeAttribute("class"), o.removeAttribute("class") }), e.addEventListener("mouseout", () => { d.classList.add("hide"), o.classList.add("hide") }) } function autoScroll() { setInterval(() => { t.forEach(e => e.removeAttribute("class")), i < r ? i++ : i = 0, t[i].classList.add("show") }, 8e3) } d.addEventListener("click", () => { setTimeout(() => { t.forEach(e => e.removeAttribute("class")), i < r ? i++ : i = 0, t[i].classList.add("show") }, 500) }), o.addEventListener("click", () => { setTimeout(() => { t.forEach(e => e.removeAttribute("class")), 0 === i ? i = r : i--, t[i].classList.add("show") }, 500) }), document.addEventListener("DOMContentLoaded", () => window.innerWidth < 1200 ? autoScroll() : hideArrow()), document.addEventListener("DOMContentLoaded", () => s.classList.add("show")), window.addEventListener("resize", () => window.innerWidth < 1200 ? autoScroll() : hideArrow()) } }

// https://github.com/lvivduncan/levus-sort
{ const t = document.querySelectorAll("#levus-buttons span"), e = document.querySelectorAll("#levus-items figure"); function sort(t) { const s = []; e.forEach(e => s.push(e.dataset.item.split(",")[t])), isNaN(+s[0]) ? s.sort() : s.sort((t, e) => t - e), e.forEach(e => { s.forEach((o, r) => { o == e.dataset.item.split(",")[t] && (e.style.order = s.indexOf(s[r])) }) }) } function sortByName() { sort(0) } function sortByPrice() { sort(1) } function sortBySize() { sort(2) } t.length > 0 && (t[0].addEventListener("click", sortByName), t[1].addEventListener("click", sortByPrice), t[2].addEventListener("click", sortBySize)) }

// https://github.com/lvivduncan/levus-shop
// назва сховища
/* const BASKET = 'basket';

// клас, що відповідає за кошик на сторінці -- загальна ціна, кількість товарів, товари тощо
class Basket {

	static getQuantity() {
		return document.querySelector('#basket-quantity');
	}

	static getSum() {
		return document.querySelector('#basket-sum');
	}

	static getGoods() {
		return document.querySelector('#basket-goods');
	}

	static getClear() {
		return document.querySelector('#basket-clear');
	}

	static getButton() {
		return document.querySelector('#basket-button');
	}

	// опрацьовуємо дані
	static viewQuantity() {
		return Storage.get().reduce((sum, item) => sum += +item.number, 0);
	}

	static viewSum() {
		return Storage.get().reduce((sum, item) => sum += item.price * item.number, 0);
	}

	static viewGoods() {
		return Storage.get().reduce((sum, item, i) => sum += `<p data-id="${i}"><i></i><b>${item.name}</b>, ${item.size}: ${item.price}, ${item.number}</p>`, '');
	}

	// видаляємо товари
	static removeGoods(e) {
		if (e.target.tagName === 'I') {
			const id = e.target.parentNode.dataset.id;
			Storage.remove(id);

			Basket.reload();
			Checkout.reload();
		}
	}

	// показ кількості товарів коло кошика
	static viewButton(){
		if (Storage.has()) {
			Basket.getButton().style.display = 'block';
			Basket.getButton().innerHTML = Basket.viewQuantity();
		} else {
			Basket.getButton().style.display = 'none';
		}
	}

	// очистка кошика
	static clearBasket() {
		Storage.clear();
		Checkout.reload();
		Basket.getQuantity().innerHTML = 0;
		Basket.getSum().innerHTML = 0;
		Basket.getGoods().innerHTML = '';
	}

	// 1 метод, який оновлює дані у кошикові
	static reload() {
		// перевірка чи існує кошик =)
		if (Basket.getQuantity()) {
			if (Storage.has()) {
				Basket.getQuantity().innerHTML = Basket.viewQuantity();
				Basket.getSum().innerHTML = Basket.viewSum();
				Basket.getGoods().innerHTML = Basket.viewGoods();
			} else {
				Basket.getQuantity().innerHTML = 0;
				Basket.getSum().innerHTML = 0;
				Basket.getGoods().innerHTML = '';
			}
		}
		// оновлюємо дані про кількість товарів (біля кнопки кошика)
		Basket.viewButton();
	}
}

// клас, який опрацьовує товари на сторінці
class Items {
	static getItems() {
		return document.querySelectorAll('.button');
	}

	static toBasket() {
		// дані з дата-атрибутів
		const content = { name: this.dataset.name, size: this.dataset.size, price: this.dataset.price, number: "1", img: this.dataset.img };

		// якщо дані вже у сховищі є, тоді додаємо до них. або ж надсилаємо перші
		if (Storage.has()) {
			Storage.add(content);
		} else {
			Storage.set(content);
		}

		// фенсібокс вікно
		$.fancybox.open(`товар <b>${this.dataset.name}</b> додано у кошик`);
		setTimeout(() => {
			$.fancybox.close();
		}, 2000);

		Basket.reload();
	}
}

// localStorage
class Storage {
	// перевірка чи існує сховище
	static has() {
		if (localStorage.getItem(BASKET) !== null) {
			return true;
		} else {
			return false;
		}
	}

	// отримуємо дані
	static get() {
		return JSON.parse(localStorage.getItem(BASKET));
	}

	// надсилаємо дані
	static set(value) {
		if (Array.isArray(value)) {
			localStorage.setItem(BASKET, JSON.stringify(value));
		} else {
			const data = [];
			data.push(value);
			localStorage.setItem(BASKET, JSON.stringify(data));
		}
	}

	// додаємо дані
	static add(value) {
		// масив зі сховища
		const data = JSON.parse(localStorage.getItem(BASKET));
		// якщо такий товар уже є, то збільшуємо кількість на 1. або ж просто додаємо новий товар
		if (data.find(item => item.name === value.name)) {
			const checked = data.find(item => item.name === value.name);
			checked.number++;
		} else {
			// додали дані
			data.push(value);
		}
		// повертаємо у сховище оновлений масив
		localStorage.setItem(BASKET, JSON.stringify(data));
	}

	// очистка сховища
	static clear() {
		localStorage.clear(BASKET);

		// оновлюємо дані про кількість товарів (біля кнопки кошика)
		Basket.viewButton();
	}

	// видаляємо товар
	static remove(id) {
		const data = JSON.parse(localStorage.getItem(BASKET));

		data.splice(id, 1);

		if (data.length === 0) {
			localStorage.removeItem(BASKET);
		} else {
			localStorage.setItem(BASKET, JSON.stringify(data));
		}
	}

}

// оформлення замовлення
class Checkout {

	static getOrderGoods() {
		return document.querySelector('#order-goods');
	}

	static getOrderSum() {
		return document.querySelector('#order-sum');
	}

	// виводимо дані
	static viewGoods() {
		if (Storage.has()) {
			const data = Storage.get()
				.reduce((sum, item, i) => sum + `
					<div data-id="${i}" class="product">
						<div class="product-img">
							<img src="${item.img}" alt="">
						</div>
						<div class="product-name">${item.name}</div>
						<div class="product-size">${item.size}</div>
						<div class="product-price">
							<small>${item.price}грн</small> 
							<p>${item.price * item.number}грн</p>
						</div>
						<div class="product-quantity">
							<span class="minus"></span>
							<span class="number">${item.number}</span>
							<span class="plus"></span>
						</div>
						<div class="product-delete">
							<i></i>
						</div>									
					</div>`, ''); // todo: delete 'грн'
			return data;
		}
	}

	static viewSum() {
		if (Storage.has()) {
			return Storage.get().map(item => item.price * item.number).reduce((sum, item) => sum + +item, 0);
		}
	}

	// метод для роботи з оформленням товарів: видалення і зміна кілкості
	static changeGoods(e) {
		const id = e.target.parentNode.parentNode.dataset.id;

		const data = Storage.get();

		if (e.target.tagName === 'I') {
			data.splice(id, 1);
			data.length === 0 ? Storage.clear() : Storage.set(data);
		} else if (e.target.className === 'minus') {
			data[id].number > 1 ? data[id].number-- : data.splice(id, 1);
		} else if (e.target.className === 'plus') {
			data[id].number++;
		}

		Storage.set(data);
		Checkout.reload();
		Basket.reload();
	}

	// 1 метод, який оновлює дані 
	static reload() {
		// якщо не на сторінці оформлення, щоб не було помилки
		if (Checkout.getOrderGoods() !== null) {
			if (Storage.has()) {
				Checkout.getOrderGoods().innerHTML = Checkout.viewGoods();
				Checkout.getOrderSum().innerHTML = Checkout.viewSum();
			} else {
				Checkout.getOrderGoods().innerHTML = '';
				Checkout.getOrderSum().innerHTML = '';
			}
		}
	}

}

// клік на кнопці "button"
Items.getItems().forEach(item => item.addEventListener('click', Items.toBasket));

// очистити кошик, якщо кнопка очистки існує =)
Basket.getClear() && Basket.getClear().addEventListener('click', Basket.clearBasket);

// оновлюємо кошик при завантаженні сторінки
Basket.reload();

// видаляємо товари з кошика
Basket.getGoods() && Basket.getGoods().addEventListener('click', Basket.removeGoods)

// сторінка оформлення замволення
Checkout.reload();

// видаляємо/змінюємо кількість
Checkout.getOrderGoods() && Checkout.getOrderGoods().addEventListener('click', e => Checkout.changeGoods(e)); */

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BASKET = 'basket'; // клас, що відповідає за кошик на сторінці -- загальна ціна, кількість товарів, товари тощо

var Basket = /*#__PURE__*/function () {
  function Basket() {
    _classCallCheck(this, Basket);
  }

  _createClass(Basket, null, [{
    key: "getQuantity",
    value: function getQuantity() {
      return document.querySelector('#basket-quantity');
    }
  }, {
    key: "getSum",
    value: function getSum() {
      return document.querySelector('#basket-sum');
    }
  }, {
    key: "getGoods",
    value: function getGoods() {
      return document.querySelector('#basket-goods');
    }
  }, {
    key: "getClear",
    value: function getClear() {
      return document.querySelector('#basket-clear');
    }
  }, {
    key: "getButton",
    value: function getButton() {
      return document.querySelector('#basket-button');
    } // опрацьовуємо дані

  }, {
    key: "viewQuantity",
    value: function viewQuantity() {
      return Storage.get().reduce(function (sum, item) {
        return sum += +item.number;
      }, 0);
    }
  }, {
    key: "viewSum",
    value: function viewSum() {
      return Storage.get().reduce(function (sum, item) {
        return sum += item.price * item.number;
      }, 0);
    }
  }, {
    key: "viewGoods",
    value: function viewGoods() {
      return Storage.get().reduce(function (sum, item, i) {
        return sum += "<p data-id=\"".concat(i, "\"><i></i><b>").concat(item.name, "</b>, ").concat(item.size, ": ").concat(item.price, ", ").concat(item.number, "</p>");
      }, '');
    } // видаляємо товари

  }, {
    key: "removeGoods",
    value: function removeGoods(e) {
      if (e.target.tagName === 'I') {
        var id = e.target.parentNode.dataset.id;
        Storage.remove(id);
        Basket.reload();
        Checkout.reload();
      }
    } // показ кількості товарів коло кошика

  }, {
    key: "viewButton",
    value: function viewButton() {
      if (Storage.has()) {
        Basket.getButton().style.display = 'block';
        Basket.getButton().innerHTML = Basket.viewQuantity();
      } else {
        Basket.getButton().style.display = 'none';
      }
    } // очистка кошика

  }, {
    key: "clearBasket",
    value: function clearBasket() {
      Storage.clear();
      Checkout.reload();
      Basket.getQuantity().innerHTML = 0;
      Basket.getSum().innerHTML = 0;
      Basket.getGoods().innerHTML = '';
    } // 1 метод, який оновлює дані у кошикові

  }, {
    key: "reload",
    value: function reload() {
      // перевірка чи існує кошик =)
      if (Basket.getQuantity()) {
        if (Storage.has()) {
          Basket.getQuantity().innerHTML = Basket.viewQuantity();
          Basket.getSum().innerHTML = Basket.viewSum();
          Basket.getGoods().innerHTML = Basket.viewGoods();
        } else {
          Basket.getQuantity().innerHTML = 0;
          Basket.getSum().innerHTML = 0;
          Basket.getGoods().innerHTML = '';
        }
      } // оновлюємо дані про кількість товарів (біля кнопки кошика)


      Basket.viewButton();
    }
  }]);

  return Basket;
}(); // клас, який опрацьовує товари на сторінці


var Items = /*#__PURE__*/function () {
  function Items() {
    _classCallCheck(this, Items);
  }

  _createClass(Items, null, [{
    key: "getItems",
    value: function getItems() {
      return document.querySelectorAll('.button');
    }
  }, {
    key: "toBasket",
    value: function toBasket() {
      // дані з дата-атрибутів
      var content = {
        name: this.dataset.name,
        size: this.dataset.size,
        price: this.dataset.price,
        number: "1",
        img: this.dataset.img
      }; // якщо дані вже у сховищі є, тоді додаємо до них. або ж надсилаємо перші

      if (Storage.has()) {
        Storage.add(content);
      } else {
        Storage.set(content);
      } // фенсібокс вікно


      $.fancybox.open("\u0442\u043E\u0432\u0430\u0440 <b>".concat(this.dataset.name, "</b> \u0434\u043E\u0434\u0430\u043D\u043E \u0443 \u043A\u043E\u0448\u0438\u043A"));
      setTimeout(function () {
        $.fancybox.close();
      }, 2000);
      Basket.reload();
    }
  }]);

  return Items;
}(); // localStorage


var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "has",
    // перевірка чи існує сховище
    value: function has() {
      if (localStorage.getItem(BASKET) !== null) {
        return true;
      } else {
        return false;
      }
    } // отримуємо дані

  }, {
    key: "get",
    value: function get() {
      return JSON.parse(localStorage.getItem(BASKET));
    } // надсилаємо дані

  }, {
    key: "set",
    value: function set(value) {
      if (Array.isArray(value)) {
        localStorage.setItem(BASKET, JSON.stringify(value));
      } else {
        var data = [];
        data.push(value);
        localStorage.setItem(BASKET, JSON.stringify(data));
      }
    } // додаємо дані

  }, {
    key: "add",
    value: function add(value) {
      // масив зі сховища
      var data = JSON.parse(localStorage.getItem(BASKET)); // якщо такий товар уже є, то збільшуємо кількість на 1. або ж просто додаємо новий товар

      if (data.find(function (item) {
        return item.name === value.name;
      })) {
        var checked = data.find(function (item) {
          return item.name === value.name;
        });
        checked.number++;
      } else {
        // додали дані
        data.push(value);
      } // повертаємо у сховище оновлений масив


      localStorage.setItem(BASKET, JSON.stringify(data));
    } // очистка сховища

  }, {
    key: "clear",
    value: function clear() {
      localStorage.clear(BASKET); // оновлюємо дані про кількість товарів (біля кнопки кошика)

      Basket.viewButton();
    } // видаляємо товар

  }, {
    key: "remove",
    value: function remove(id) {
      var data = JSON.parse(localStorage.getItem(BASKET));
      data.splice(id, 1);

      if (data.length === 0) {
        localStorage.removeItem(BASKET);
      } else {
        localStorage.setItem(BASKET, JSON.stringify(data));
      }
    }
  }]);

  return Storage;
}(); // оформлення замовлення


var Checkout = /*#__PURE__*/function () {
  function Checkout() {
    _classCallCheck(this, Checkout);
  }

  _createClass(Checkout, null, [{
    key: "getOrderGoods",
    value: function getOrderGoods() {
      return document.querySelector('#order-goods');
    }
  }, {
    key: "getOrderSum",
    value: function getOrderSum() {
      return document.querySelector('#order-sum');
    } // виводимо дані

  }, {
    key: "viewGoods",
    value: function viewGoods() {
      if (Storage.has()) {
        var data = Storage.get().reduce(function (sum, item, i) {
          return sum + "\n\t\t\t\t\t<div data-id=\"".concat(i, "\" class=\"product\">\n\t\t\t\t\t\t<div class=\"product-img\">\n\t\t\t\t\t\t\t<img src=\"").concat(item.img, "\" alt=\"\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"product-name\">").concat(item.name, "</div>\n\t\t\t\t\t\t<div class=\"product-size\">").concat(item.size, "</div>\n\t\t\t\t\t\t<div class=\"product-price\">\n\t\t\t\t\t\t\t<small>").concat(item.price, "\u0433\u0440\u043D</small> \n\t\t\t\t\t\t\t<p>").concat(item.price * item.number, "\u0433\u0440\u043D</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"product-quantity\">\n\t\t\t\t\t\t\t<span class=\"minus\"></span>\n\t\t\t\t\t\t\t<span class=\"number\">").concat(item.number, "</span>\n\t\t\t\t\t\t\t<span class=\"plus\"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"product-delete\">\n\t\t\t\t\t\t\t<i></i>\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t</div>");
        }, ''); // todo: delete 'грн'

        return data;
      }
    }
  }, {
    key: "viewSum",
    value: function viewSum() {
      if (Storage.has()) {
        return Storage.get().map(function (item) {
          return item.price * item.number;
        }).reduce(function (sum, item) {
          return sum + +item;
        }, 0);
      }
    } // метод для роботи з оформленням товарів: видалення і зміна кілкості

  }, {
    key: "changeGoods",
    value: function changeGoods(e) {
      var id = e.target.parentNode.parentNode.dataset.id;
      var data = Storage.get();

      if (e.target.tagName === 'I') {
        data.splice(id, 1);
        data.length === 0 ? Storage.clear() : Storage.set(data);
      } else if (e.target.className === 'minus') {
        data[id].number > 1 ? data[id].number-- : data.splice(id, 1);
      } else if (e.target.className === 'plus') {
        data[id].number++;
      }

      Storage.set(data);
      Checkout.reload();
      Basket.reload();
    } // 1 метод, який оновлює дані 

  }, {
    key: "reload",
    value: function reload() {
      // якщо не на сторінці оформлення, щоб не було помилки
      if (Checkout.getOrderGoods() !== null) {
        if (Storage.has()) {
          Checkout.getOrderGoods().innerHTML = Checkout.viewGoods();
          Checkout.getOrderSum().innerHTML = Checkout.viewSum();
        } else {
          Checkout.getOrderGoods().innerHTML = '';
          Checkout.getOrderSum().innerHTML = '';
        }
      }
    }
  }]);

  return Checkout;
}(); // клік на кнопці "button"


Items.getItems().forEach(function (item) {
  return item.addEventListener('click', Items.toBasket);
}); // очистити кошик, якщо кнопка очистки існує =)

Basket.getClear() && Basket.getClear().addEventListener('click', Basket.clearBasket); // оновлюємо кошик при завантаженні сторінки

Basket.reload(); // видаляємо товари з кошика

Basket.getGoods() && Basket.getGoods().addEventListener('click', Basket.removeGoods); // сторінка оформлення замволення

Checkout.reload(); // видаляємо/змінюємо кількість

Checkout.getOrderGoods() && Checkout.getOrderGoods().addEventListener('click', function (e) {
  return Checkout.changeGoods(e);
});
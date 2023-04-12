let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItemsData = [
	{
		id: "iphone_11",
		name: "iPhone 11",
		price: 1000,
		img: "images/iphone_11.png",
	},
	{
		id: "iphone_11Pro",
		name: "iPhone 11 Pro",
		price: 1200,
		img: "images/iphone_11Pro.png",
	},
	{
		id: "iphone_11ProMax",
		name: "iPhone 11 Pro Max",
		price: 1400,
		img: "images/iphone_11ProMax.png",
	},
	{
		id: "iphone_12",
		name: "iPhone 12",
		price: 1600,
		img: "images/iphone_12.png",
	},
	{
		id: "iphone_12Pro",
		name: "iPhone 12 Pro",
		price: 1800,
		img: "images/iphone_12Pro.png",
	},
	{
		id: "iphone_12ProMax",
		name: "iPhone 12 Pro Max",
		price: 2000,
		img: "images/iphone_12ProMax.png",
	},
];

let items = document.getElementById("items");

let generateItems = () => {
	return (items.innerHTML = basket
		.map((basketItem) => {
			let { id, item } = basketItem;
			let { img, name, price } = shopItemsData.find((x) => x.id === id);
			let search = basket.find((x) => x.id === id) || [];
			return `
        <div id="${id}" class="vare">
        <img src=${img} alt="">
        <h2>${name}</h2>
        <p>$${price * item}</p>
        <p class="amount">Amount: ${search.item === undefined ? 0 : search.item}</p>
        <a onclick="decrement(${id})" class="btn">Remove from cart</a>
        <a onclick="addToCart(${id})" class="btn">Add to cart</a>
        </div>`;
		})
		.join(""));
};
generateItems();

let decrement = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem.id);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	basket = basket.filter((x) => x.item !== 0);
	localStorage.setItem("data", JSON.stringify(basket));
	generateItems();
	generateTotal();
};

let addToCart = (id) => {
	let selectedItem = id;
	let search = basket.find((vare) => vare.id === selectedItem.id);

	if (search === undefined) {
		basket.push({
			id: selectedItem.id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	localStorage.setItem("data", JSON.stringify(basket));
	generateItems();
	generateTotal();
};

let total = document.getElementById("total");

let generateTotal = () => {
	let totalSum = basket.reduce((acc, cur) => {
		let { price } = shopItemsData.find((x) => x.id === cur.id);
		return acc + price * cur.item;
	}, 0);
	if (totalSum === 0)
		return (total.innerHTML = `
    <p>Nothing in your cart<p>
    <a href="../pages/index.html" class="checkout-button btn" id="checkout-button">To store</a>
    
    `);
	return (total.innerHTML = `
    <p>Total: $${totalSum}<p>
    <a onClick="checkout()" href="../pages/success.html" class="checkout-button btn" id="checkout-button">Checkout</a>
    `);
};
generateTotal();

let checkout = () => {
	localStorage.clear();
	basket = [];
	generateItems();
	generateTotal();
};

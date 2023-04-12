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
let basket = JSON.parse(localStorage.getItem("data")) || [];

// generate the result of the search
let generateItem = () => {
	let input = document.getElementById("search");
	let filter = input.value.toUpperCase();
	let search = shopItemsData.filter((vare) => vare.name.toUpperCase() === filter);
	return (results.innerHTML = search
		.map((shopItem) => {
			let { id, img, name, price } = shopItem;
			return `
            <div id="${id}" class="vare">
            <img src=${img} alt="">
            <h2>${name}</h2>
            <p>$${price}</p>
            <a onclick="addToCart(${id})" class="btn">Add to cart</a>
            </div>`;
		})
		.join(""));
};
generateItem();

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
};

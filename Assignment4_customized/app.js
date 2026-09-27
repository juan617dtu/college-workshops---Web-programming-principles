const {products, categories} = window; //getting the data from window
console.log({products, categories}, "Store Data");//checking the data
function renderDataInTable(products) {
    const myTable = document.getElementById("product-list");//finding the table body
    products.forEach(product => {//looping through every product
        let newRow = document.createElement("tr");//creating a table row
        Object.entries(product).forEach(([key, value]) => {//looking at every property of the product
            let cell = document.createElement("td");//creating a table cell
            if (key === "categories") {
                const categoryNames = value.map(categoryId => {
                    const category = categories.find(category => category.id === categoryId);
                    return category.name;
                });
                cell.innerText = categoryNames.join(", ");
            }
            else if (key === "price") {
                cell.innerText = `$${value.toFixed(2)}`;
            }
            else cell.innerText = value;
            newRow.appendChild(cell);//put the cell inside the row
        });
        myTable.appendChild(newRow);//put the completed row into the table
    });
}
// get the selected category from the url
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");
//find the selected category
const category = categories.find(category => category.name === selectedCategory);
//determine which category id's should be displayed
let categoryIds = [];
if (category.id === "GTR") categoryIds = ["GTR", "AG6", "G6"];
else if (category.id === "DRM") categoryIds = ["DRM", "EDK", "ADK", "CB"];
else categoryIds = [category.id];
//filter the products
const filteredProducts = products.filter(product =>
    product.categories.some(categoryId => categoryIds.includes(categoryId))
);
//display the selected category
document.getElementById("category-title").innerText =  selectedCategory;
//render the filtered products
renderDataInTable(filteredProducts);
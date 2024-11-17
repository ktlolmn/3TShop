import Utils from "../Utils.js";
import Api from "../Api.js";

const slider = document.querySelector(".slider");
const carouselContainer = document.querySelector(".carousel-container");
const container = document.querySelector('.container');
const priceFilter = document.getElementById('price-filter');
const sizeFilter = document.getElementById('size-filter');
const sortSelect = document.getElementById('sort');

let currentProducts = [];

container.insertAdjacentHTML("beforeend", Utils.getFooter());

Utils.getHeader();
Utils.renderSlide("slide/slide", slider);

const btnAddAnimation = document.querySelectorAll(".btn");
btnAddAnimation.forEach((b) => {
    Utils.addAnimation(b);
});

let categories = [];

const fetchCategories = async () => {
    try {
        const response = await Api.getAllCategory();
        if (response.status === 200) {
            categories = response.categoryDTOList;
            Utils.fillCategory(carouselContainer, categories);
        }
    } catch (e) {
        Utils.getToast("error", "Máy chủ lỗi, vui lòng thử lại!");
    }
};

function filterByPrice(products, priceRange) {
    if (!priceRange) return products;
    
    return products.filter(product => {
        const price = parseFloat(product.price);
        switch (priceRange) {
            case 'under-150':
                return price < 150000;
            case '150-200':
                return price >= 150000 && price <= 200000;
            case '200-500':
                return price > 200000 && price <= 500000;
            default:
                return true;
        }
    });
}

function filterBySize(products, size) {
    if (!size) return products;
    return products.filter(product => 
        product.specifications.some(spec => spec.size === size && spec.quantity > 0)
    );
}

function getAvailableSizes(products) {
    const sizesSet = new Set();
    products.forEach(product => {
        product.specifications.forEach(spec => {
            if (spec.quantity > 0) {
                sizesSet.add(spec.size);
            }
        });
    });
    return Array.from(sizesSet);
}

function updateSizeFilter(products) {
    const availableSizes = getAvailableSizes(products);
    sizeFilter.innerHTML = `
        <option value="">Chọn kích thước</option>
        ${availableSizes.map(size => `<option value="${size}">Size ${size}</option>`).join('')}
    `;
}

function sortProducts(products, sortType) {
    const sortedProducts = [...products];
    switch (sortType) {
        case 'price-asc':
            return sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        case 'price-desc':
            return sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        case 'popular':
            return sortedProducts.sort((a, b) => b.sold - a.sold);
        default:
            return sortedProducts;
    }
}

function applyFiltersAndSort() {
    let filteredProducts = currentProducts;
    
    filteredProducts = filterByPrice(filteredProducts, priceFilter.value);
    
    filteredProducts = filterBySize(filteredProducts, sizeFilter.value);
    
    filteredProducts = sortProducts(filteredProducts, sortSelect.value);
    
    renderProducts(filteredProducts);
}

priceFilter.addEventListener('change', applyFiltersAndSort);
sizeFilter.addEventListener('change', applyFiltersAndSort);
sortSelect.addEventListener('change', applyFiltersAndSort);

priceFilter.innerHTML = `
    <option value="">Chọn giá</option>
    <option value="under-150">Dưới 150.000đ</option>
    <option value="150-200">Từ 150.000đ đến 200.000đ</option>
    <option value="200-500">Từ 200.000đ đến 500.000đ</option>
`;

sortSelect.innerHTML = `
    <option value="popular">Nổi bật</option>
    <option value="price-asc">Giá thấp tới cao</option>
    <option value="price-desc">Giá cao tới thấp</option>
`;

document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    handleFetchProducts();
});

function handleFetchProducts() {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    if (path.startsWith("/category/")) {
        console.log("Thấy theo danh mục")
        const categoryId = path.split("/category/")[1];
        if (categoryId) {
            fetchProductByCategory(categoryId);
        }
    }
    else if (path.startsWith("/product/search") && searchParams.has("name")) {
        console.log("Thấy theo tên")
        const productName = searchParams.get("name");
        if (productName) {
            fetchProductByName(productName);
        }
    }else if (path.startsWith("/product/search-by-image")) {
        console.log("Thấy theo hình ảnh")
        const productContainer = document.querySelector(".category-product-list");
        const productsByImage = JSON.parse(localStorage.getItem('productsByImage') || '[]');
        const title = document.querySelector(".title-name")
        title.textContent = "Kết quả tìm kiếm"
        console.log(productsByImage)
        if (productsByImage.length > 0) {
            updateSizeFilter(productsByImage)
            renderProducts(productsByImage);
        } else {
            productContainer.innerHTML = '<p>Không có sản phẩm nào được tìm thấy.</p>';
        }
    }
}

async function fetchProductByCategory(id) {
    try {
        const response = await Api.getProductByCategory(id);
        if (response.status === 200) {
            currentProducts = response.productSpecDTOList;
            const title = document.querySelector(".title-name")
            title.textContent = currentProducts[0].categoryName
            updateSizeFilter(currentProducts);
            renderProducts(currentProducts);
        } else {
            if (response.status === 202) {
                const productContainer = document.querySelector(".category-product-list");
                productContainer.innerHTML = '<p>Không có sản phẩm nào được tìm thấy.</p>';
            }
        }
    } catch (error) {
        Utils.getToast("error", "Máy chủ lỗi lấy sản phẩm theo danh mục");
    }
}

async function fetchProductByName(name) {
    try {
        const response = await Api.getProductByName(name);
        if (response.status === 200) {
            currentProducts = response.productSpecDTOList; 
            updateSizeFilter(currentProducts);
            console.log(currentProducts)
            renderProducts(currentProducts);
            const title = document.querySelector(".title-name")
            title.textContent = "Kết quả tìm kiếm"
        } else {
            if (response.status === 202) {
                const productContainer = document.querySelector(".category-product-list");
                productContainer.innerHTML = '<p>Không có sản phẩm nào được tìm thấy.</p>';
            }
        }
    } catch (error) {
        Utils.getToast("error", "Máy chủ lỗi tìm kiếm sản phẩm");
    }
}

function renderProducts(products) {
    const productContainer = document.querySelector(".category-product-list");
    productContainer.innerHTML = '';
    
    if (products.length === 0) {
        productContainer.innerHTML = '<p>Không có sản phẩm nào được tìm thấy.</p>';
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image ? `data:image/jpeg;base64,${product.image}` : '../../img/product/product.png'}" alt="${product.name}">
            <div class="decription">
                <p class="name">${product.name}</p>
                <p class="price">${parseFloat(product.price).toLocaleString()} đ</p>
                <p class="sold">Đã bán ${product.sold}</p>
            </div>
        `;

        productElement.addEventListener('click', () => {
            window.location.href = `/product-detail/${product.product_id}`;
        });

        productContainer.appendChild(productElement);
    });
}
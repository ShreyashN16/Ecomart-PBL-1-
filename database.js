// 1. Toggle active class on navbar links when clicked
const navbarLinks = document.querySelectorAll('#navbar li a');

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// 2. Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 3. Cart functionality: Add product to cart
const cart = []; // Array to store cart items
const cartButton = document.getElementById('cart-button'); // Button to view the cart
const cartCount = document.getElementById('cart-count'); // To display the cart item count
const cartItemsContainer = document.getElementById('cart-items'); // Where cart items are listed

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product'); // Get the product that was clicked
        const productName = productElement.querySelector('.product-name').textContent; // Get product name
        const productPrice = productElement.querySelector('.product-price').textContent; // Get product price
        const productImage = productElement.querySelector('.product-image').src; // Get product image

        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
        };

        // Add the product to the cart
        cart.push(product);
        updateCart(); // Update the cart UI and count
        alert(`${productName} has been added to the cart!`);
    });
});

// Function to update the cart UI and item count
function updateCart() {
    // Update cart count
    cartCount.textContent = cart.length;

    // Display cart items
    cartItemsContainer.innerHTML = ''; // Clear previous items
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners for removing items from the cart
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productIndex = e.target.getAttribute('data-index');
            removeFromCart(productIndex);
        });
    });
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from the cart array
    updateCart(); // Update the cart UI and item count
}

// Show cart details when the cart button is clicked
cartButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        // Show cart items in the cart container or display a cart page
        alert('Cart details shown (or you can show in the cart container)');
        // Optional: You can navigate to the cart page or display the cart in a modal
    }
});

// 4. Toggle "active" class for the navbar on scroll (optional)
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});

// 5. Change button color in the hero section on hover (optional)
const heroButton = document.querySelector('#hero button');
heroButton.addEventListener('mouseenter', () => {
    heroButton.style.backgroundColor = '#056329'; // Change button color on hover
});

heroButton.addEventListener('mouseleave', () => {
    heroButton.style.backgroundColor = 'transparent'; // Reset to original color
});

// 6. Feature Box Hover Effect
const featureBoxes = document.querySelectorAll('#feature .fe-box');

featureBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'scale(1.05)';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'scale(1)';
    });
});

// 7. Scroll to top button (optional feature)
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑ Scroll to Top';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.padding = '10px';
scrollToTopButton.style.backgroundColor = '#056329';
scrollToTopButton.style.color = 'white';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.borderRadius = '5px';
scrollToTopButton.style.cursor = 'pointer';
scrollToTopButton.style.display = 'none'; // Initially hidden

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 8. Mobile Navbar Toggle (for smaller screens)
const mobileNavbarButton = document.createElement('button');
mobileNavbarButton.innerHTML = '☰'; // Hamburger icon
mobileNavbarButton.style.position = 'absolute';
mobileNavbarButton.style.top = '20px';
mobileNavbarButton.style.right = '20px';
mobileNavbarButton.style.fontSize = '24px';
mobileNavbarButton.style.backgroundColor = 'transparent';
mobileNavbarButton.style.border = 'none';
mobileNavbarButton.style.cursor = 'pointer';
mobileNavbarButton.style.zIndex = '999';

document.body.appendChild(mobileNavbarButton);

const navbarMenu = document.getElementById('navbar');
mobileNavbarButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Optional: Show or hide navbar links in mobile view
const style = document.createElement('style');
style.innerHTML = `
    #navbar.active {
        display: block;
    }

    #navbar {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 768px) {
        #navbar {
            display: none;
            flex-direction: column;
            text-align: center;
            background-color: #f9f9f9;
            padding: 20px;
        }

        #navbar li {
            margin: 10px 0;
        }
    }
`;
document.head.appendChild(style);

// 9. Product Filter (optional feature, if you have product categories)
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        productItems.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

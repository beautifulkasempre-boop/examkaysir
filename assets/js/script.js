// DOM Elements
const menuBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const categoryBtns = document.querySelectorAll('.category-btn');
const productContainer = document.getElementById('product-container');
const cartBtn = document.querySelector('a[href="#cart"]');
const searchInput = document.getElementById('product-search');
const searchFilter = document.getElementById('product-filter');
const searchButton = document.querySelector('.hero-search .btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.querySelector('.close-checkout');
const cancelCheckoutBtn = document.getElementById('cancel-checkout');
const checkoutForm = document.getElementById('checkout-form');

// Products Data
const products = [
    {
        id: 1,
        name: 'Yonex Astrox 99 Pro',
        price: 8999,
        category: 'rackets',
        image: 'image/r1..jpg',
        description: 'Professional badminton racket with extra stiff flex for powerful smashes.',
        isDeal: true
    },
    {
        id: 2,
        name: 'Victor Thruster F',
        price: 7999,
        category: 'rackets',
        image: 'image/r2..jpg',
        description: 'High-performance racket with excellent control and power.'
    },
    {
        id: 3,
        name: 'Li-Ning Windstorm 72',
        price: 7499,
        category: 'rackets',
        image: 'image/r3..jpg',
        description: 'Lightweight racket with fast swing speed for quick reactions.'
    },
    {
        id: 4,
        name: 'Yonex EZONE 100',
        price: 6999,
        category: 'rackets',
        image: 'image/r4..jpg',
        description: 'Great all-around racket suitable for all playing styles.'
    },
    {
        id: 5,
        name: 'Victor Auraspeed 90K',
        price: 8499,
        category: 'rackets',
        image: 'image/r5..jpg',
        description: 'Speed and power combined for aggressive players.'
    },
    {
        id: 6,
        name: 'Yonex Power Cushion 65Z2',
        price: 5999,
        category: 'shoes',
        image: 'image/shoes1..jpg',
        description: 'Professional badminton shoes with excellent cushioning.',
        isDeal: true
    },
    {
        id: 7,
        name: 'Victor P9200',
        price: 5499,
        category: 'shoes',
        image: 'image/shoes2..jpg',
        description: 'Durable shoes with great ankle support.'
    },
    {
        id: 8,
        name: 'Li-Ning AYTM022',
        price: 4999,
        category: 'shoes',
        image: 'image/shoes3..jpg',
        description: 'Lightweight and comfortable for quick movements.'
    },
    {
        id: 9,
        name: 'Yonex SHB-03Z',
        price: 6499,
        category: 'shoes',
        image: 'image/shoes4..jpg',
        description: 'Premium shoes with carbon fiber for explosive power.'
    },
    {
        id: 10,
        name: 'Victor SH-P9200',
        price: 5799,
        category: 'shoes',
        image: 'image/shoes5..jpg',
        description: 'Professional-grade shoes with excellent grip.'
    },
    {
        id: 11,
        name: 'Yonex Aerosensa 30',
        price: 1999,
        category: 'shuttles',
        image: 'image/s1..jpg',
        description: 'Tournament grade feather shuttlecocks, pack of 12.',
        isDeal: true
    },
    {
        id: 12,
        name: 'Victor Gold Champion',
        price: 1799,
        category: 'shuttles',
        image: 'image/s2..jpg',
        description: 'High-quality goose feather shuttles, pack of 12.'
    },
    {
        id: 13,
        name: 'Li-Ning A+60',
        price: 1599,
        category: 'shuttles',
        image: 'image/s3..jpg',
        description: 'Durable duck feather shuttles, pack of 12.'
    },
    {
        id: 14,
        name: 'Yonex Mavis 350',
        price: 1299,
        category: 'shuttles',
        image: 'image/s4..jpg',
        description: 'High-quality nylon shuttles, pack of 12.'
    },
    {
        id: 15,
        name: 'Victor NS-3000',
        price: 1499,
        category: 'shuttles',
        image: 'image/s5..jpg',
        description: 'Tournament grade nylon shuttles, pack of 12.'
    },
    {
        id: 16,
        name: 'Yonex BG-80',
        price: 899,
        category: 'accessories',
        image: 'image/n1.jpg',
        description: 'High-performance badminton string.'
    },
    {
        id: 17,
        name: 'Victor GR-262',
        price: 599,
        category: 'accessories',
        image: 'image/n2.jpg',
        description: 'Professional badminton grip.'
    },
    {
        id: 18,
        name: 'Yonex Super Grap',
        price: 499,
        category: 'accessories',
        image: 'image/n3..jpg',
        description: 'Towel grip for better sweat absorption.'
    }
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let activeCategory = 'all';

// Format price
const formatPrice = (price) => {
    return '₱' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Display products
const displayProducts = (filteredProducts = products) => {
    productContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.isDeal ? '<span class="sale-badge">Deal</span>' : ''}
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">${formatPrice(product.price)}</span>
                <p>${product.description}</p>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
};

// Filter products based on category and search
const applyFilters = (shouldScroll = false) => {
    const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const dropdownCategory = searchFilter ? searchFilter.value : 'all';
    const categoryToUse = dropdownCategory !== 'all' ? dropdownCategory : activeCategory;

    const filteredProducts = products.filter(product => {
        const categoryMatch = categoryToUse === 'all' ? true : product.category === categoryToUse;
        const textMatch = term ? (product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term)) : true;
        return categoryMatch && textMatch;
    });

    displayProducts(filteredProducts);
    
    // Scroll to products section if search was performed
    if (shouldScroll && (term || dropdownCategory !== 'all')) {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            setTimeout(() => {
                productsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    }
};

// Add to cart
const addToCart = (e) => {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(item => item.id === id);
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart`);
};

// Update cart
const updateCart = () => {
    // Save to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <span class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</span>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
};

// Remove from cart
const removeFromCart = (e) => {
    const id = parseInt(e.target.closest('.cart-item-remove').dataset.id);
    const index = cart.findIndex(item => item.id === id);
    
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
};

// Show notification
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Show checkout modal
const showCheckoutModal = () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    // Populate order summary
    updateCheckoutSummary();
    
    // Show modal
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close checkout modal
const closeCheckoutModal = () => {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    checkoutForm.reset();
};

// Update checkout summary
const updateCheckoutSummary = () => {
    const checkoutSummary = document.getElementById('checkout-summary');
    const checkoutTotal = document.getElementById('checkout-total');
    
    checkoutSummary.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-info">
                <span class="summary-item-name">${item.name}</span>
                <span class="summary-item-qty">Qty: ${item.quantity}</span>
            </div>
            <span class="summary-item-price">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = formatPrice(total);
};

// Validate checkout form
const validateCheckoutForm = () => {
    const name = document.getElementById('checkout-name').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const province = document.getElementById('checkout-province').value.trim();
    const zip = document.getElementById('checkout-zip').value.trim();
    const payment = document.getElementById('checkout-payment').value;
    
    if (!name || !email || !phone || !address || !city || !province || !zip || !payment) {
        showNotification('Please fill in all required fields');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address');
        return false;
    }
    
    // Validate phone format (Philippines)
    const phoneRegex = /^(09|\+639)\d{9}$/;
    const cleanPhone = phone.replace(/\s|-/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showNotification('Please enter a valid Philippine phone number (09XX XXX XXXX)');
        return false;
    }
    
    return true;
};

// Process checkout
const processCheckout = (e) => {
    e.preventDefault();
    
    if (!validateCheckoutForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('checkout-name').value.trim(),
        email: document.getElementById('checkout-email').value.trim(),
        phone: document.getElementById('checkout-phone').value.trim(),
        address: document.getElementById('checkout-address').value.trim(),
        city: document.getElementById('checkout-city').value.trim(),
        province: document.getElementById('checkout-province').value.trim(),
        zip: document.getElementById('checkout-zip').value.trim(),
        payment: document.getElementById('checkout-payment').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    
    // In a real application, you would send this data to a server
    console.log('Order Details:', formData);
    
    // Show success message
    showNotification('Order placed successfully! We will contact you soon.');
    
    // Clear cart
    cart = [];
    updateCart();
    
    // Close modals
    closeCheckoutModal();
    closeCart();
};

// Checkout (original function - now shows modal)
const checkout = () => {
    showCheckoutModal();
};

// Handle cart visibility
const openCart = () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeCart = () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

const toggleCart = () => {
    const isActive = cartSidebar.classList.contains('active');
    if (isActive) {
        closeCart();
    } else {
        openCart();
    }
};

// Event Listeners
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    });
});

// Category filter buttons
categoryBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Filter products
        const category = e.target.dataset.category;
        activeCategory = category;
        if (searchFilter) searchFilter.value = 'all';
        applyFilters();
    });
});

// Cart button
if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });
}

// Close cart button
closeCartBtn.addEventListener('click', closeCart);

// Checkout button
checkoutBtn.addEventListener('click', checkout);

// Close checkout modal buttons
if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
}

if (cancelCheckoutBtn) {
    cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);
}

// Checkout form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', processCheckout);
}

// Overlay click
overlay.addEventListener('click', () => {
    if (checkoutModal && checkoutModal.classList.contains('active')) {
        closeCheckoutModal();
    } else if (cartSidebar.classList.contains('active')) {
        closeCart();
    }
});

// Close cart with ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (checkoutModal && checkoutModal.classList.contains('active')) {
            closeCheckoutModal();
        } else if (cartSidebar.classList.contains('active')) {
            closeCart();
        }
    }
});


// Search input/filter
if (searchInput) {
    // Only scroll on Enter key, not on every input
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyFilters(true); // Scroll when Enter is pressed
        }
    });
    searchInput.addEventListener('input', () => {
        applyFilters(false); // Don't scroll on every keystroke
    });
}

if (searchFilter) {
    searchFilter.addEventListener('change', (e) => {
        // prioritize dropdown category when set
        applyFilters(true); // Scroll when filter changes
    });
}

if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        applyFilters(true); // Pass true to enable scrolling
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize
const init = () => {
    // Display all products on page load with filters
    applyFilters();
    
    // Update cart on page load
    updateCart();
    
    // Set current year in footer
    document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} SmashZone. All rights reserved.`;
};

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--primary-color);
        color: white;
        padding: 15px 30px;
        border-radius: 30px;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style);

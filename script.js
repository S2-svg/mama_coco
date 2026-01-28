// Initialize data and state
let currentRole = 'customer';
let products = [];
let cart = [];
let orders = [];
let editingProductId = null;
let editingOrderId = null;
let currentAdminPage = 'dashboard';
let currentCategory = 'all';
let isLoggedIn = false;
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 3;

// Demo credentials (in production, these should be stored securely on a server)
const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// DOM Elements
const customerRoleBtn = document.getElementById('customerRoleBtn');
const adminRoleBtn = document.getElementById('adminRoleBtn');
const customerView = document.getElementById('customerView');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const logoutBtn = document.getElementById('logoutBtn');

// Login modal elements
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');

// Dashboard elements
const totalProducts = document.getElementById('totalProducts');
const totalOrders = document.getElementById('totalOrders');
const totalRevenue = document.getElementById('totalRevenue');
const activePromotions = document.getElementById('activePromotions');
const productCount = document.getElementById('productCount');
const orderCount = document.getElementById('orderCount');
const salesChart = document.getElementById('salesChart');
const recentActivity = document.getElementById('recentActivity');
const recentOrdersTable = document.getElementById('recentOrdersTable');
const productsGridAdmin = document.getElementById('productsGridAdmin');
const customerProductsGrid = document.getElementById('customerProductsGrid');
const allOrdersTable = document.getElementById('allOrdersTable');

// Analytics elements
const trafficSourcesChart = document.getElementById('trafficSourcesChart');
const productPerformanceChart = document.getElementById('productPerformanceChart');
const topProductsTable = document.getElementById('topProductsTable');

// Financial elements
const incomeExpensesChart = document.getElementById('incomeExpensesChart');
const cashFlowChart = document.getElementById('cashFlowChart');

// Modal elements
const productModal = document.getElementById('productModal');
const productFormModal = document.getElementById('productFormModal');
const cartModal = document.getElementById('cartModal');
const orderFormModal = document.getElementById('orderFormModal');
const closeProductModal = document.getElementById('closeProductModal');
const closeProductFormModal = document.getElementById('closeProductFormModal');
const closeCartModal = document.getElementById('closeCartModal');
const closeOrderFormModal = document.getElementById('closeOrderFormModal');
const addProductBtn = document.getElementById('addProductBtn');
const createOrderBtn = document.getElementById('createOrderBtn');
const addOrderBtn = document.getElementById('addOrderBtn');
const productForm = document.getElementById('productForm');
const orderForm = document.getElementById('orderForm');
const productFormTitle = document.getElementById('productFormTitle');
const checkoutBtn = document.getElementById('checkoutBtn');
const notification = document.getElementById('notification');

// Navigation elements
const navItems = document.querySelectorAll('.nav-item');

// Initialize data from localStorage or create default data
function initializeData() {
    // Load products from localStorage or create default products
    const savedProducts = localStorage.getItem('techstore_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        products = [
            {
                id: 1,
                name: "Dell XPS 13 Laptop",
                brand: "dell",
                type: "laptop",
                specs: "Intel Core i7, 16GB RAM, 512GB SSD, 13.4\" 4K Display",
                price: 1299.99,
                stock: 15,
                image: "1.png",
                promotion: true,
                discount: 10,
                rating: 4.5,
                reviews: 42,
                reviewsList: [
                    { user: "Alex Johnson", comment: "Amazing laptop! Lightweight and powerful.", rating: 5 },
                    { user: "Sam Wilson", comment: "Battery life could be better but overall great product.", rating: 4 }
                ],
                revenue: 45000
            },
            {
                id: 2,
                name: "HP Pavilion Desktop",
                brand: "hp",
                type: "desktop",
                specs: "AMD Ryzen 7, 32GB RAM, 1TB SSD + 2TB HDD, NVIDIA RTX 3060",
                price: 1499.99,
                stock: 8,
                image: "desktop",
                promotion: false,
                discount: 0,
                rating: 4.2,
                reviews: 28,
                reviewsList: [
                    { user: "Taylor Smith", comment: "Perfect for gaming and work!", rating: 5 }
                ],
                revenue: 32000
            },
            {
                id: 3,
                name: "MacBook Pro 16",
                brand: "apple",
                type: "laptop",
                specs: "Apple M2 Pro, 32GB RAM, 1TB SSD, 16\" Liquid Retina Display",
                price: 2499.99,
                stock: 6,
                image: "1.png",
                promotion: true,
                discount: 15,
                rating: 4.8,
                reviews: 56,
                reviewsList: [
                    { user: "Jordan Lee", comment: "The best laptop I've ever owned!", rating: 5 },
                    { user: "Casey Brown", comment: "Expensive but worth every penny.", rating: 5 }
                ],
                revenue: 68000
            },
            {
                id: 4,
                name: "ASUS ROG Gaming Laptop",
                brand: "asus",
                type: "laptop",
                specs: "Intel i9, 32GB RAM, 1TB SSD, RTX 4070, 17.3\" 240Hz",
                price: 1999.99,
                stock: 12,
                image: "laptop",
                promotion: false,
                discount: 0,    
                rating: 4.6,
                reviews: 37,
                reviewsList: [],
                revenue: 42000
            },
            {
                id: 5,
                name: "Lenovo ThinkPad X1 Carbon",
                brand: "lenovo",
                type: "laptop",
                specs: "Intel Core i7, 16GB RAM, 512GB SSD, 14\" 2K Display",
                price: 1599.99,
                stock: 10,
                image: "",
                promotion: true,
                discount: 12,
                rating: 4.4,
                reviews: 31,
                reviewsList: [],
                revenue: 38000
            },
            {
                id: 6,
                name: "Samsung 32\" 4K Monitor",
                brand: "samsung",
                type: "monitor",
                specs: "32\" 4K UHD, 144Hz, 1ms Response, HDR600",
                price: 499.99,
                stock: 25,
                image: "monitor",
                promotion: false,
                discount: 0,
                rating: 4.7,
                reviews: 45,
                reviewsList: [],
                revenue: 28000
            },
            {
                id: 7,
                name: "Logitech MX Keys Keyboard",
                brand: "logitech",
                type: "accessory",
                specs: "Wireless, Backlit, Multi-device, Ergonomic Design",
                price: 99.99,
                stock: 50,
                image: "keyboard",
                promotion: true,
                discount: 20,
                rating: 4.3,
                reviews: 89,
                reviewsList: [],
                revenue: 15000
            },
            {
                id: 8,
                name: "Apple Mac Studio",
                brand: "apple",
                type: "desktop",
                specs: "Apple M2 Ultra, 64GB RAM, 1TB SSD, Studio Display",
                price: 3999.99,
                stock: 4,
                image: "desktop",
                promotion: false,
                discount: 0,
                rating: 4.9,
                reviews: 18,
                reviewsList: [],
                revenue: 55000
            }
        ];
        saveProducts();
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('techstore_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }

    // Load orders from localStorage or create default
    const savedOrders = localStorage.getItem('techstore_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    } else {
        orders = [
            { id: 1, customer: "John Smith", total: 1299.99, date: "2024-03-15", items: 2, status: "completed", products: [1, 2] },
            { id: 2, customer: "Emma Davis", total: 899.99, date: "2024-03-14", items: 1, status: "completed", products: [3] },
            { id: 3, customer: "Michael Brown", total: 2999.99, date: "2024-03-13", items: 1, status: "pending", products: [5] },
            { id: 4, customer: "Sarah Johnson", total: 1599.99, date: "2024-03-12", items: 3, status: "processing", products: [1, 6] },
            { id: 5, customer: "David Wilson", total: 2199.99, date: "2024-03-11", items: 2, status: "completed", products: [3, 4] },
            { id: 6, customer: "Lisa Anderson", total: 499.99, date: "2024-03-10", items: 1, status: "completed", products: [6] },
            { id: 7, customer: "Robert Taylor", total: 1999.99, date: "2024-03-09", items: 1, status: "completed", products: [4] },
            { id: 8, customer: "Maria Garcia", total: 3999.99, date: "2024-03-08", items: 1, status: "completed", products: [8] }
        ];
        saveOrders();
    }

    // Check if user is already logged in (from localStorage)
    const savedLogin = localStorage.getItem('techstore_admin_logged_in');
    if (savedLogin === 'true') {
        isLoggedIn = true;
        // Auto-login if previously logged in
        setTimeout(() => {
            switchToAdmin();
        }, 100);
    }
}

// Save functions
function saveProducts() {
    localStorage.setItem('techstore_products', JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem('techstore_cart', JSON.stringify(cart));
}

function saveOrders() {
    localStorage.setItem('techstore_orders', JSON.stringify(orders));
}

// Show notification
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Show login modal
function showLoginModal() {
    loginError.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
    loginModal.style.display = 'flex';
    usernameInput.focus();
}

// Hide login modal
function hideLoginModal() {
    loginModal.style.display = 'none';
}

// Login function
function login(username, password) {
    // Check if maximum login attempts exceeded
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        showNotification('Too many login attempts. Please try again later.', 'error');
        return false;
    }

    // Simple authentication (in production, this should be server-side)
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        isLoggedIn = true;
        loginAttempts = 0;

        // Save login state to localStorage
        localStorage.setItem('techstore_admin_logged_in', 'true');

        hideLoginModal();
        switchToAdmin();
        showNotification('Login successful! Welcome Admin.', 'success');
        return true;
    } else {
        loginAttempts++;
        const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;
        loginError.textContent = `Invalid username or password. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`;
        loginError.style.display = 'block';

        // Shake animation for error
        loginForm.style.animation = 'none';
        setTimeout(() => {
            loginForm.style.animation = 'shake 0.5s';
        }, 10);

        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            loginError.textContent = 'Account locked. Too many failed attempts.';
            loginBtn.disabled = true;
            setTimeout(() => {
                loginBtn.disabled = false;
                loginAttempts = 0;
                loginError.style.display = 'none';
            }, 30000); // 30 second lockout
        }

        return false;
    }
}

// Logout function
function logout() {
    isLoggedIn = false;
    localStorage.removeItem('techstore_admin_logged_in');
    switchRole('customer');
    showNotification('Logged out successfully', 'info');
}

// Switch to admin view
function switchToAdmin() {
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }

    currentRole = 'admin';
    customerRoleBtn.classList.remove('active');
    adminRoleBtn.classList.add('active');
    document.body.classList.add('admin-mode');
    customerView.style.display = 'none';
    switchAdminPage(currentAdminPage);
    updateUserInfo('Admin', 'Store Manager');
}

// Switch between customer and admin views
function switchRole(role) {
    if (role === 'customer') {
        currentRole = 'customer';
        customerRoleBtn.classList.add('active');
        adminRoleBtn.classList.remove('active');
        document.body.classList.remove('admin-mode');
        customerView.style.display = 'block';
        document.querySelectorAll('.admin-page').forEach(page => {
            page.style.display = 'none';
        });
        renderCustomerProducts();
        updateUserInfo('Customer', 'Guest');
    } else if (role === 'admin') {
        switchToAdmin();
    }
}

// Update user info in header
function updateUserInfo(name, role) {
    document.getElementById('userName').textContent = name;
    document.getElementById('userRole').textContent = role;
}

// Switch between admin pages
function switchAdminPage(page) {
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }

    currentAdminPage = page;

    // Hide all pages
    document.querySelectorAll('.admin-page').forEach(p => {
        p.style.display = 'none';
    });

    // Show selected page
    const pageElement = document.getElementById(`${page}Page`);
    if (pageElement) {
        pageElement.style.display = 'block';
    }

    // Update active nav item
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });

    // Load page content
    if (page === 'dashboard') {
        updateDashboard();
    } else if (page === 'products') {
        renderProductsGrid();
    } else if (page === 'orders') {
        renderOrdersTable();
    } else if (page === 'analytics') {
        renderAnalyticsPage();
    } else if (page === 'strategy') {
        renderStrategyPage();
    } else if (page === 'financial') {
        renderFinancialPage();
    } else if (page === 'settings') {
        renderSettingsPage();
    } else if (page === 'help') {
        renderHelpPage();
    }
}

// Update dashboard
function updateDashboard() {
    // Update stats
    totalProducts.textContent = products.length;
    totalOrders.textContent = orders.length;
    productCount.textContent = products.length;
    orderCount.textContent = orders.length;

    // Calculate revenue
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    totalRevenue.textContent = `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Calculate active promotions
    const promoCount = products.filter(p => p.promotion).length;
    activePromotions.textContent = promoCount;

    // Render sales chart
    renderSalesChart('week');

    // Render recent activity
    renderRecentActivity();

    // Render recent orders
    renderRecentOrders();
}

// Render sales chart
function renderSalesChart(period = 'week') {
    salesChart.innerHTML = '';

    let days, sales;
    if (period === 'week') {
        days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        sales = [4500, 5200, 4800, 6100, 5900, 7200, 6800];
    } else if (period === 'month') {
        days = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        sales = [18000, 22000, 19500, 24000];
    } else {
        days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        sales = [45000, 48000, 52000, 51000, 59000, 62000, 65000, 68000, 71000, 69000, 73000, 80000];
    }

    const maxSale = Math.max(...sales);

    days.forEach((day, index) => {
        const height = (sales[index] / maxSale) * 180;

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.innerHTML = `
                    <div class="bar blue" style="height: ${height}px"></div>
                    <div class="bar-label">${day}</div>
                `;

        salesChart.appendChild(bar);
    });
}

// Render recent activity
function renderRecentActivity() {
    recentActivity.innerHTML = '';

    const activities = [
        { icon: 'fas fa-shopping-cart', type: 'blue', title: 'New Order', desc: 'Order #1234 placed by John Doe', time: '2 min ago', new: true },
        { icon: 'fas fa-user-plus', type: 'green', title: 'New Customer', desc: 'Sarah Johnson registered', time: '1 hour ago', new: true },
        { icon: 'fas fa-tag', type: 'purple', title: 'Promotion Added', desc: '20% off on gaming laptops', time: '3 hours ago', new: false },
        { icon: 'fas fa-star', type: 'orange', title: 'New Review', desc: '5-star review for MacBook Pro', time: '5 hours ago', new: false }
    ];

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = `activity-item ${activity.new ? 'new' : ''}`;
        activityItem.innerHTML = `
                    <div class="activity-icon ${activity.type}">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-details">
                        <h4>${activity.title}</h4>
                        <p>${activity.desc}</p>
                    </div>
                    <div class="activity-time">${activity.time}</div>
                `;

        recentActivity.appendChild(activityItem);
    });
}

// Render recent orders
function renderRecentOrders() {
    recentOrdersTable.innerHTML = '';

    const recentOrders = orders.slice(-5).reverse();

    recentOrders.forEach(order => {
        let statusBadge = '';
        if (order.status === 'completed') {
            statusBadge = '<span class="status-badge status-success">Completed</span>';
        } else if (order.status === 'pending') {
            statusBadge = '<span class="status-badge status-warning">Pending</span>';
        } else if (order.status === 'processing') {
            statusBadge = '<span class="status-badge status-info">Processing</span>';
        } else {
            statusBadge = '<span class="status-badge status-danger">Cancelled</span>';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>#${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.date}</td>
                    <td>$${order.total.toFixed(2)}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-outline btn-sm" data-id="${order.id}" data-action="view-order">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                `;

        recentOrdersTable.appendChild(row);
    });
}

// Render products grid for admin
function renderProductsGrid() {
    productsGridAdmin.innerHTML = '';

    products.forEach(product => {
        const discountedPrice = product.promotion ?
            product.price * (1 - product.discount / 100) : product.price;

        const productCard = document.createElement('div');
        productCard.className = `product-card ${product.promotion ? 'promo' : ''}`;
        const imageFile = `${product.id === 1 ? 2 : product.id}.png`;
        productCard.innerHTML = `
                    <div class="product-image">
                        <img src="image/${imageFile}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">
                        ${product.promotion ? '<div style="position: absolute; top: 10px; right: 10px; background: var(--accent); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">-' + product.discount + '%</div>' : ''}
                    </div>
                    <div class="product-info">
                        <div class="product-title">${product.name}</div>
                        <div class="product-specs">${product.specs}</div>
                        ${product.stock < 5 ? '<div class="product-badge">Low Stock</div>' : ''}
                        <div class="product-price">
                            <div>
                                <span class="price-current">$${discountedPrice.toFixed(2)}</span>
                                ${product.promotion ? `<span class="price-original">$${product.price.toFixed(2)}</span>` : ''}
                            </div>
                            <span>Stock: ${product.stock}</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 1rem;">
                            <button class="btn btn-primary btn-sm" style="flex: 1;" data-id="${product.id}" data-action="edit">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-danger btn-sm" data-id="${product.id}" data-action="delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;

        productsGridAdmin.appendChild(productCard);
    });
}

// Render products for customers
function renderCustomerProducts() {
    customerProductsGrid.innerHTML = '';

    let filteredProducts = products;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = products.filter(product => product.type === currentCategory);
    }

    // Filter by search
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.specs.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }

    if (filteredProducts.length === 0) {
        customerProductsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--gray);">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                `;
        return;
    }

    filteredProducts.forEach(product => {
        const discountedPrice = product.promotion ?
            product.price * (1 - product.discount / 100) : product.price;

        // Generate star rating
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        const productCard = document.createElement('div');
        productCard.className = `product-card customer-product-card ${product.promotion ? 'promo' : ''}`;
        const imageFile = `${product.id === 1 ? 2 : product.id}.png`;
        productCard.innerHTML = `
                    <div class="product-image">
                        <img src="image/${imageFile}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">
                        ${product.promotion ? '<div style="position: absolute; top: 10px; right: 10px; background: var(--accent); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">-' + product.discount + '%</div>' : ''}
                    </div>
                    <div class="product-info">
                        <div class="product-title">${product.name}</div>
                        <div class="product-specs">${product.specs}</div>
                        <div class="product-rating">
                            <div class="rating-stars">${stars}</div>
                            <div class="rating-count">(${product.reviews})</div>
                        </div>
                        ${product.stock < 5 ? '<div class="product-badge">Low Stock</div>' : ''}
                        <div class="product-price">
                            <div>
                                <span class="price-current">$${discountedPrice.toFixed(2)}</span>
                                ${product.promotion ? `<span class="price-original">$${product.price.toFixed(2)}</span>` : ''}
                            </div>
                            <span>In Stock: ${product.stock}</span>
                        </div>
                        <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock < 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                            <i class="fas fa-cart-plus"></i> ${product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                `;

        customerProductsGrid.appendChild(productCard);
    });
}

// Render orders table
function renderOrdersTable() {
    allOrdersTable.innerHTML = '';

    orders.forEach(order => {
        let statusBadge = '';
        if (order.status === 'completed') {
            statusBadge = '<span class="status-badge status-success">Completed</span>';
        } else if (order.status === 'pending') {
            statusBadge = '<span class="status-badge status-warning">Pending</span>';
        } else if (order.status === 'processing') {
            statusBadge = '<span class="status-badge status-info">Processing</span>';
        } else {
            statusBadge = '<span class="status-badge status-danger">Cancelled</span>';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>#${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.date}</td>
                    <td>${order.items}</td>
                    <td>$${order.total.toFixed(2)}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-outline btn-sm" data-id="${order.id}" data-action="view-order">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" data-id="${order.id}" data-action="delete-order">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;

        allOrdersTable.appendChild(row);
    });
}

// Render analytics page
function renderAnalyticsPage() {
    // Render traffic sources chart
    trafficSourcesChart.innerHTML = '';
    const trafficSources = ['Direct', 'Organic', 'Social', 'Email', 'Referral'];
    const trafficData = [35, 30, 15, 10, 10];
    const maxTraffic = Math.max(...trafficData);

    trafficSources.forEach((source, index) => {
        const height = (trafficData[index] / maxTraffic) * 180;
        const colors = ['blue', 'green', 'purple', 'orange', 'red'];

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.innerHTML = `
                    <div class="bar ${colors[index]}" style="height: ${height}px"></div>
                    <div class="bar-label">${source}</div>
                `;
        trafficSourcesChart.appendChild(bar);
    });

    // Render product performance chart
    productPerformanceChart.innerHTML = '';
    const topProducts = products.slice(0, 5).sort((a, b) => b.revenue - a.revenue);
    const maxRevenue = Math.max(...topProducts.map(p => p.revenue));

    topProducts.forEach(product => {
        const height = (product.revenue / maxRevenue) * 180;

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.innerHTML = `
                    <div class="bar purple" style="height: ${height}px"></div>
                    <div class="bar-label">${product.name.substring(0, 10)}...</div>
                `;
        productPerformanceChart.appendChild(bar);
    });

    // Render top products table
    topProductsTable.innerHTML = '';
    topProducts.forEach(product => {
        const margin = Math.floor(Math.random() * 30) + 20;
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.type.charAt(0).toUpperCase() + product.type.slice(1)}</td>
                    <td>${Math.floor(product.revenue / product.price)}</td>
                    <td>$${product.revenue.toLocaleString()}</td>
                    <td>${margin}%</td>
                `;
        topProductsTable.appendChild(row);
    });
}

// Render strategy page
function renderStrategyPage() {
    // Strategy page is mostly static content
}

// Render financial page
function renderFinancialPage() {
    // Render income vs expenses chart
    incomeExpensesChart.innerHTML = '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const income = [45000, 48000, 52000, 51000, 59000, 62000];
    const expenses = [32000, 31000, 35000, 34000, 38000, 40000];
    const maxValue = Math.max(...income, ...expenses);

    months.forEach((month, index) => {
        const incomeHeight = (income[index] / maxValue) * 180;
        const expensesHeight = (expenses[index] / maxValue) * 180;

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 2px; height: 180px; justify-content: flex-end;">
                        <div class="bar green" style="height: ${incomeHeight}px; width: 30px;"></div>
                        <div class="bar red" style="height: ${expensesHeight}px; width: 30px; background: linear-gradient(to top, var(--danger), #ff6b6b);"></div>
                    </div>
                    <div class="bar-label">${month}</div>
                `;
        incomeExpensesChart.appendChild(bar);
    });

    // Render cash flow chart
    cashFlowChart.innerHTML = '';
    const cashFlow = [15000, 17000, 14000, 16000, 21000, 22000];
    const maxCashFlow = Math.max(...cashFlow);

    months.forEach((month, index) => {
        const height = (cashFlow[index] / maxCashFlow) * 180;

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.innerHTML = `
                    <div class="bar blue" style="height: ${height}px"></div>
                    <div class="bar-label">${month}</div>
                `;
        cashFlowChart.appendChild(bar);
    });
}

// Render settings page
function renderSettingsPage() {
    // Settings page is mostly static content
}

// Render help page
function renderHelpPage() {
    // Help page is mostly static content
}

// Show product form
function showProductForm(productId = null) {
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }

    editingProductId = productId;

    if (productId) {
        productFormTitle.textContent = 'Edit Product';
        const product = products.find(p => p.id === productId);

        document.getElementById('productName').value = product.name;
        document.getElementById('productBrand').value = product.brand;
        document.getElementById('productType').value = product.type;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productSpecs').value = product.specs;
        document.getElementById('productStock').value = product.stock || 10;
        document.getElementById('productPromotion').checked = product.promotion || false;
        document.getElementById('productDiscount').value = product.discount || 0;
    } else {
        productFormTitle.textContent = 'Add New Product';
        productForm.reset();
        document.getElementById('productStock').value = 10;
        document.getElementById('productPromotion').checked = false;
        document.getElementById('productDiscount').value = 0;
    }

    productFormModal.style.display = 'flex';
}

// Show cart modal
function showCartModal() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">Your cart is empty</p>';
        document.getElementById('cartSubtotal').textContent = '$0.00';
        document.getElementById('cartTax').textContent = '$0.00';
        document.getElementById('cartTotal').textContent = '$0.00';
    } else {
        let subtotal = 0;

        cart.forEach((item, index) => {
            const product = products.find(p => p.id === item.productId);
            const discountedPrice = product.promotion ?
                product.price * (1 - product.discount / 100) : product.price;
            const itemTotal = discountedPrice * item.quantity;
            subtotal += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                        <div class="cart-item-image">
                            <i class="fas fa-${product.type || 'laptop'}"></i>
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${product.name}</div>
                            <div class="cart-item-price">$${discountedPrice.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        </div>
                        <button class="btn btn-danger btn-sm" data-index="${index}" data-action="remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;

            cartItems.appendChild(cartItem);
        });

        const tax = subtotal * 0.10;
        const total = subtotal + tax;

        document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    }

    cartModal.style.display = 'flex';
}

// Show order form
function showOrderForm(orderId = null) {
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }

    editingOrderId = orderId;

    const orderProductsSelect = document.getElementById('orderProducts');
    orderProductsSelect.innerHTML = '';

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price}`;
        orderProductsSelect.appendChild(option);
    });

    if (orderId) {
        document.querySelector('#orderFormModal .modal-title').textContent = 'Edit Order';
        const order = orders.find(o => o.id === orderId);

        document.getElementById('orderCustomer').value = order.customer;
        document.getElementById('orderTotal').value = order.total;
        document.getElementById('orderStatus').value = order.status;

        if (order.products) {
            Array.from(orderProductsSelect.options).forEach(option => {
                if (order.products.includes(parseInt(option.value))) {
                    option.selected = true;
                }
            });
        }
    } else {
        document.querySelector('#orderFormModal .modal-title').textContent = 'Create New Order';
        orderForm.reset();
        document.getElementById('orderTotal').value = '';
    }

    orderFormModal.style.display = 'flex';
}

// Save product
function saveProduct(e) {
    e.preventDefault();

    const productData = {
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        type: document.getElementById('productType').value,
        price: parseFloat(document.getElementById('productPrice').value),
        specs: document.getElementById('productSpecs').value,
        stock: parseInt(document.getElementById('productStock').value) || 10,
        promotion: document.getElementById('productPromotion').checked,
        discount: parseInt(document.getElementById('productDiscount').value) || 0,
        rating: 4.0,
        reviews: 0,
        reviewsList: [],
        revenue: 0
    };

    if (editingProductId) {
        const index = products.findIndex(p => p.id === editingProductId);
        productData.id = editingProductId;
        productData.rating = products[index].rating || 4.0;
        productData.reviews = products[index].reviews || 0;
        productData.reviewsList = products[index].reviewsList || [];
        productData.revenue = products[index].revenue || 0;
        products[index] = productData;
        showNotification('Product updated successfully', 'success');
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        productData.id = newId;
        products.push(productData);
        showNotification('Product added successfully', 'success');
    }

    saveProducts();
    renderProductsGrid();
    if (currentRole === 'customer') {
        renderCustomerProducts();
    }
    updateDashboard();
    productFormModal.style.display = 'none';
    editingProductId = null;
}

// Save order
function saveOrder(e) {
    e.preventDefault();

    const selectedProducts = Array.from(document.getElementById('orderProducts').selectedOptions)
        .map(option => parseInt(option.value));

    const orderData = {
        customer: document.getElementById('orderCustomer').value,
        total: parseFloat(document.getElementById('orderTotal').value),
        date: new Date().toISOString().split('T')[0],
        items: selectedProducts.length,
        status: document.getElementById('orderStatus').value,
        products: selectedProducts
    };

    if (editingOrderId) {
        const index = orders.findIndex(o => o.id === editingOrderId);
        orderData.id = editingOrderId;
        orders[index] = orderData;
        showNotification('Order updated successfully', 'success');
    } else {
        const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
        orderData.id = newId;
        orders.push(orderData);
        showNotification('Order created successfully', 'success');
    }

    saveOrders();
    renderOrdersTable();
    updateDashboard();
    orderFormModal.style.display = 'none';
    editingOrderId = null;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product.stock < 1) {
        showNotification('Product out of stock!', 'error');
        return;
    }

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            showNotification('Cannot add more, stock limit reached!', 'error');
            return;
        }
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Handle cart actions
function handleCartAction(index, action) {
    const cartItem = cart[index];
    const product = products.find(p => p.id === cartItem.productId);

    if (action === 'increase') {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            showNotification('Cannot add more, stock limit reached!', 'error');
        }
    } else if (action === 'decrease') {
        cartItem.quantity--;
        if (cartItem.quantity <= 0) {
            cart.splice(index, 1);
        }
    } else if (action === 'remove') {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    showCartModal();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    // Update product stock
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // Create new order
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        const discountedPrice = product.promotion ?
            product.price * (1 - product.discount / 100) : product.price;
        return sum + (discountedPrice * item.quantity);
    }, 0);

    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const newOrder = {
        id: newId,
        customer: 'Customer',
        total: total,
        date: new Date().toISOString().split('T')[0],
        items: cart.reduce((sum, item) => sum + item.quantity, 0),
        status: 'pending',
        products: cart.map(item => item.productId)
    };

    orders.push(newOrder);

    // Clear cart
    cart = [];

    saveProducts();
    saveCart();
    saveOrders();
    updateCartCount();
    updateDashboard();
    cartModal.style.display = 'none';

    showNotification('Order placed successfully! Total: $' + total.toFixed(2), 'success');
}

// Initialize
function init() {
    initializeData();

    // Add shake animation for login errors
    const style = document.createElement('style');
    style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
    document.head.appendChild(style);

    // Event listeners
    customerRoleBtn.addEventListener('click', () => switchRole('customer'));
    adminRoleBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            switchToAdmin();
        } else {
            showLoginModal();
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        login(username, password);
    });

    // Logout button
    logoutBtn.addEventListener('click', logout);

    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            if (currentRole === 'admin' && isLoggedIn) {
                switchAdminPage(page);
            }
        });
    });

    cartIcon.addEventListener('click', () => {
        if (currentRole === 'customer') {
            showCartModal();
        } else {
            showNotification('Switch to customer view to use cart', 'info');
        }
    });

    addProductBtn?.addEventListener('click', () => {
        showProductForm();
    });

    createOrderBtn?.addEventListener('click', () => {
        showOrderForm();
    });

    addOrderBtn?.addEventListener('click', () => {
        showOrderForm();
    });

    productForm.addEventListener('submit', saveProduct);
    orderForm.addEventListener('submit', saveOrder);
    checkoutBtn.addEventListener('click', checkout);

    // Search functionality
    searchBtn.addEventListener('click', () => {
        if (currentRole === 'customer') {
            renderCustomerProducts();
        }
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && currentRole === 'customer') {
            renderCustomerProducts();
        }
    });

    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderCustomerProducts();
        });
    });

    // Close modal buttons
    closeLoginModal.addEventListener('click', hideLoginModal);
    closeProductModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    closeProductFormModal.addEventListener('click', () => {
        productFormModal.style.display = 'none';
    });

    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    closeOrderFormModal.addEventListener('click', () => {
        orderFormModal.style.display = 'none';
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) hideLoginModal();
        if (e.target === productModal) productModal.style.display = 'none';
        if (e.target === productFormModal) productFormModal.style.display = 'none';
        if (e.target === cartModal) cartModal.style.display = 'none';
        if (e.target === orderFormModal) orderFormModal.style.display = 'none';
    });

    // Chart period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('period-btn')) return;
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const period = btn.getAttribute('data-period');
            if (period) {
                renderSalesChart(period);
            }
        });
    });

    // View all orders button
    document.getElementById('viewAllOrders')?.addEventListener('click', () => {
        switchAdminPage('orders');
    });

    // Export products button
    document.getElementById('exportProducts')?.addEventListener('click', () => {
        if (!isLoggedIn) {
            showLoginModal();
            return;
        }
        const dataStr = JSON.stringify(products, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'techstore_products.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        showNotification('Products exported successfully', 'success');
    });

    // Filter orders button
    document.getElementById('filterOrders')?.addEventListener('click', () => {
        showNotification('Filter feature coming soon!', 'info');
    });

    // Generate report button
    document.getElementById('generateReportBtn')?.addEventListener('click', () => {
        showNotification('Financial report generated successfully', 'success');
    });

    // Delegate events for dynamic content
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        const index = btn.getAttribute('data-index');

        if (action === 'edit') {
            showProductForm(parseInt(id));
        } else if (action === 'delete') {
            if (confirm('Are you sure you want to delete this product?')) {
                products = products.filter(p => p.id !== parseInt(id));
                saveProducts();
                renderProductsGrid();
                if (currentRole === 'customer') {
                    renderCustomerProducts();
                }
                updateDashboard();
                showNotification('Product deleted', 'success');
            }
        } else if (action === 'delete-order') {
            if (confirm('Are you sure you want to delete this order?')) {
                orders = orders.filter(o => o.id !== parseInt(id));
                saveOrders();
                renderOrdersTable();
                updateDashboard();
                showNotification('Order deleted', 'success');
            }
        } else if (action === 'view-order') {
            showNotification(`Viewing order #${id}`, 'info');
        } else if (action === 'increase' || action === 'decrease' || action === 'remove') {
            handleCartAction(parseInt(index), action);
        }
    });

    // Add to cart button delegation
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn && !btn.disabled) {
            const productId = parseInt(btn.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Initialize with customer view
    switchRole('customer');
    renderCustomerProducts();
}

// Start the application
init();

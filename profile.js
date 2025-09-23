// Profile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize profile data
    initializeProfile();
    
    // Set up custom cursor
    setupCustomCursor();
    
    // Initialize tabs
    initializeTabs();
    
    // Initialize forms
    initializeForms();
});

function initializeProfile() {
    // Load user data from localStorage or use defaults
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'Coffee Lover',
        email: 'coffee.lover@example.com',
        memberSince: 'January 2024',
        ordersCount: 24,
        rewardsPoints: 1250,
        accountBalance: 45.30,
        avatar: '👤'
    };
    
    // Update profile display
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-email').textContent = userData.email;
    document.getElementById('user-member-since').textContent = `Member since ${userData.memberSince}`;
    document.getElementById('user-avatar').textContent = userData.avatar;
    document.getElementById('orders-count').textContent = userData.ordersCount;
    document.getElementById('rewards-points').textContent = userData.rewardsPoints.toLocaleString();
    document.getElementById('account-balance').textContent = `$${userData.accountBalance.toFixed(2)}`;
}

function setupCustomCursor() {
    const cursor = document.getElementById('customCursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
    });
    
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        const size = 15;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - size/2) + 'px';
        ripple.style.top = (e.clientY - size/2) + 'px';
        document.body.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function initializeForms() {
    // Set minimum date for reservations
    const dateInput = document.getElementById('reservation-date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
}

// Cart functionality
let cartItems = {
    espresso: { name: 'Premium Espresso', price: 4.25, quantity: 2 },
    croissant: { name: 'Almond Croissant', price: 4.50, quantity: 1 }
};

function updateQuantity(itemId, change) {
    if (cartItems[itemId]) {
        cartItems[itemId].quantity = Math.max(0, cartItems[itemId].quantity + change);
        if (cartItems[itemId].quantity === 0) {
            delete cartItems[itemId];
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    // Update quantity displays
    Object.keys(cartItems).forEach(itemId => {
        const qtyElement = document.getElementById(`${itemId}-qty`);
        if (qtyElement) {
            qtyElement.textContent = cartItems[itemId].quantity;
        }
    });
    
    // Update total
    const total = Object.values(cartItems).reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

function addToCart(itemId) {
    const items = {
        macchiato: { name: 'Caramel Macchiato', price: 5.75, quantity: 1 },
        muffin: { name: 'Blueberry Muffin', price: 3.50, quantity: 1 }
    };
    
    if (items[itemId]) {
        if (cartItems[itemId]) {
            cartItems[itemId].quantity += 1;
        } else {
            cartItems[itemId] = items[itemId];
        }
        updateCartDisplay();
        showNotification(`${items[itemId].name} added to cart!`);
    }
}

function proceedToCheckout() {
    if (Object.keys(cartItems).length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    showNotification('Redirecting to checkout...', 'success');
    // Here you would typically redirect to checkout page
}

// FAQ functionality
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').classList.remove('active');
        item.querySelector('.faq-toggle').textContent = '+';
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        answer.classList.add('active');
        button.querySelector('.faq-toggle').textContent = '−';
    }
}

// Reservation functionality
function makeReservation() {
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const partySize = document.getElementById('party-size').value;
    const seating = document.getElementById('seating-preference').value;
    const requests = document.getElementById('special-requests').value;
    
    if (!date || !time || !partySize) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Generate confirmation number
    const confirmationNumber = 'RES' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Show confirmation
    const summary = document.getElementById('reservation-summary');
    const details = document.getElementById('confirmation-details');
    
    let seatingText = seating ? ` - ${seating}` : '';
    details.innerHTML = `
        <strong>Date:</strong> ${new Date(date).toLocaleDateString()}<br>
        <strong>Time:</strong> ${time}<br>
        <strong>Party Size:</strong> ${partySize} ${partySize === '1' ? 'person' : 'people'}${seatingText}<br>
        <strong>Confirmation Number:</strong> ${confirmationNumber}
    `;
    
    summary.style.display = 'block';
    
    // Clear form
    document.getElementById('reservation-date').value = '';
    document.getElementById('reservation-time').value = '';
    document.getElementById('party-size').value = '';
    document.getElementById('seating-preference').value = '';
    document.getElementById('special-requests').value = '';
    
    showNotification('Reservation confirmed!', 'success');
}

function modifyReservation(confirmationCode) {
    showNotification(`Modification options for ${confirmationCode} would be displayed here.`, 'info');
}

function cancelReservation(confirmationCode) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
        showNotification(`Reservation ${confirmationCode} has been cancelled.`, 'success');
    }
}

// Delivery functionality
function changeAddress() {
    const newAddress = prompt('Enter your new delivery address:');
    if (newAddress) {
        document.querySelector('.delivery-info p').innerHTML = newAddress + '<br>Updated address';
        showNotification('Delivery address updated!', 'success');
    }
}

// Quick actions
function reorderLast() {
    showNotification('Adding your last order to cart...', 'success');
    // Add last order items to cart
    setTimeout(() => {
        cartItems.espresso = { name: 'Premium Espresso', price: 4.25, quantity: 1 };
        cartItems.croissant = { name: 'Almond Croissant', price: 4.50, quantity: 1 };
        updateCartDisplay();
        showNotification('Last order added to cart!', 'success');
    }, 1000);
}

function viewOrderHistory() {
    showNotification('Opening order history...', 'info');
    // Would typically open order history modal or page
}

function managePayments() {
    showNotification('Opening payment methods...', 'info');
    // Would typically open payment management modal or page
}

function contactSupport() {
    showNotification('Connecting to support chat...', 'info');
    // Would typically open support chat or contact form
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize cart display on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

// Add some sample offers styling
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .offers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .offer-card {
            background: var(--bg-light);
            padding: 1.5rem;
            border-radius: var(--border-radius-md);
            border-left: 4px solid var(--secondary-color);
            transition: transform var(--transition-medium);
        }
        
        body.dark-mode .offer-card {
            background: var(--bg-lighter);
        }
        
        .offer-card:hover {
            transform: translateY(-2px);
        }
        
        .offer-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .offer-card h4 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .offer-card p {
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        
        .offer-expiry {
            font-size: 0.8rem;
            color: var(--text-light);
            font-style: italic;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--border-color);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 0.5rem;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--gradient-primary);
            transition: width 0.3s ease;
        }
        
        .activity-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .activity-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-light);
            border-radius: var(--border-radius-sm);
        }
        
        body.dark-mode .activity-item {
            background: var(--bg-lighter);
        }
        
        .activity-icon {
            width: 40px;
            height: 40px;
            background: var(--gradient-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .activity-details h4 {
            color: var(--primary-color);
            margin-bottom: 0.25rem;
            font-size: 1rem;
        }
        
        .activity-details p {
            color: var(--text-light);
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        
        .activity-time {
            font-size: 0.8rem;
            color: var(--text-light);
            font-style: italic;
        }
        
        .item-quantity {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .qty-btn {
            width: 30px;
            height: 30px;
            border: 1px solid var(--border-color);
            background: var(--white-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: bold;
            transition: all var(--transition-fast);
        }
        
        body.dark-mode .qty-btn {
            background: var(--bg-light);
            color: var(--text-color);
        }
        
        .qty-btn:hover {
            background: var(--secondary-color);
            color: var(--primary-color);
        }
        
        .cart-total {
            text-align: center;
            padding: 1rem;
            background: var(--bg-light);
            border-radius: var(--border-radius-sm);
            margin-top: 1rem;
        }
        
        body.dark-mode .cart-total {
            background: var(--bg-lighter);
        }
        
        .delivery-info {
            display: grid;
            gap: 1.5rem;
        }
        
        .info-group {
            padding: 1rem;
            background: var(--bg-light);
            border-radius: var(--border-radius-sm);
        }
        
        body.dark-mode .info-group {
            background: var(--bg-lighter);
        }
        
        .info-group label {
            font-weight: 600;
            color: var(--primary-color);
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .info-note {
            font-size: 0.8rem;
            color: var(--text-light);
            font-style: italic;
        }
        
        .delivery-history {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .delivery-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-light);
            border-radius: var(--border-radius-sm);
        }
        
        body.dark-mode .delivery-item {
            background: var(--bg-lighter);
        }
        
        .delivery-date {
            font-weight: 600;
            color: var(--secondary-color);
            white-space: nowrap;
            min-width: 120px;
        }
        
        .reservations-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .reservation-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--bg-light);
            border-radius: var(--border-radius-sm);
        }
        
        body.dark-mode .reservation-item {
            background: var(--bg-lighter);
        }
        
        .reservation-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .quick-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .loyalty-info {
            text-align: center;
        }
        
        .tier-badge {
            display: inline-block;
            background: var(--gradient-primary);
            color: var(--primary-color);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .loyalty-progress {
            margin-top: 1rem;
        }
        
        .loyalty-progress p {
            font-size: 0.8rem;
            color: var(--text-light);
            margin-top: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .offers-grid {
                grid-template-columns: 1fr;
            }
            
            .reservation-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .reservation-actions {
                align-self: stretch;
            }
            
            .reservation-actions button {
                flex: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to tab content
    const tabContent = document.querySelector('.tab-content');
    if (tabContent) {
        tabContent.style.scrollBehavior = 'smooth';
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});
// Enhanced frontend with better loading states and API service integration
class CheatBusterApp {
    constructor() {
        this.emailInput = document.getElementById('emailInput');
        this.nameInput = document.getElementById('nameInput');
        this.searchEmailBtn = document.getElementById('searchEmailBtn');
        this.searchNameBtn = document.getElementById('searchNameBtn');
        this.resultDiv = document.getElementById('result');
        
        this.initEventListeners();
    }

    initEventListeners() {
        // Search by email button
        this.searchEmailBtn.addEventListener('click', () => {
            const email = this.emailInput.value.trim();
            if (email) {
                this.searchByEmail(email);
            } else {
                this.showError('Please enter an email address');
            }
        });

        // Search by name button
        this.searchNameBtn.addEventListener('click', () => {
            const name = this.nameInput.value.trim();
            if (name) {
                this.searchByName(name);
            } else {
                this.showError('Please enter a name');
            }
        });

        // Enter key support
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchEmailBtn.click();
            }
        });

        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchNameBtn.click();
            }
        });

        // Clear other input when typing
        this.emailInput.addEventListener('input', () => {
            if (this.emailInput.value.trim()) {
                this.nameInput.value = '';
            }
        });

        this.nameInput.addEventListener('input', () => {
            if (this.nameInput.value.trim()) {
                this.emailInput.value = '';
            }
        });
    }

    setLoadingState(isLoading, button, originalText) {
        if (isLoading) {
            button.disabled = true;
            button.textContent = 'Searching...';
            button.style.opacity = '0.6';
        } else {
            button.disabled = false;
            button.textContent = originalText;
            button.style.opacity = '1';
        }
    }

    async searchByEmail(email) {
        const originalText = this.searchEmailBtn.textContent;
        
        try {
            this.setLoadingState(true, this.searchEmailBtn, originalText);
            this.clearResult();
            
            const response = await searchUserByEmail(email);
            
            if (response.success) {
                this.displayUser(response.user);
            } else {
                this.showError(response.message || 'User not found');
            }
        } catch (error) {
            console.error('Search error:', error);
            if (error.response && error.response.status === 404) {
                this.showError('No user found with this email address');
            } else {
                this.showError('An error occurred while searching. Please try again.');
            }
        } finally {
            this.setLoadingState(false, this.searchEmailBtn, originalText);
        }
    }

    async searchByName(name) {
        const originalText = this.searchNameBtn.textContent;
        
        try {
            this.setLoadingState(true, this.searchNameBtn, originalText);
            this.clearResult();
            
            const response = await searchUserByName(name);
            
            if (response.success) {
                this.displayUser(response.user);
            } else {
                this.showError(response.message || 'User not found');
            }
        } catch (error) {
            console.error('Search error:', error);
            if (error.response && error.response.status === 404) {
                this.showError('No user found with this name');
            } else {
                this.showError('An error occurred while searching. Please try again.');
            }
        } finally {
            this.setLoadingState(false, this.searchNameBtn, originalText);
        }
    }

    displayUser(user) {
        this.resultDiv.innerHTML = `
            <div class="user-card">
                <div class="user-header">
                    <img src="${user.picture}" alt="${user.firstName} ${user.lastName}" class="user-avatar">
                    <div class="user-info">
                        <h3>${user.firstName} ${user.lastName}</h3>
                        <p>User Profile</p>
                    </div>
                </div>
                <div class="user-details">
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${user.email}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Age</div>
                        <div class="detail-value">${user.age} years old</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">City</div>
                        <div class="detail-value">${user.city}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Full Name</div>
                        <div class="detail-value">${user.firstName} ${user.lastName}</div>
                    </div>
                </div>
            </div>
        `;
    }

    showError(message) {
        this.resultDiv.innerHTML = `
            <div class="error-message">
                ❌ ${message}
            </div>
        `;
    }

    clearResult() {
        this.resultDiv.innerHTML = '';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CheatBusterApp();
});
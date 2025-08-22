
        document.addEventListener('DOMContentLoaded', function() {
            
            const mainNav = document.querySelector('.main-nav');

            // --- Mobile Navigation Toggle ---
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            if (mobileNavToggle && mainNav) {
                mobileNavToggle.addEventListener('click', function() {
                    const isOpen = mainNav.classList.toggle('is-open');
                    mobileNavToggle.setAttribute('aria-expanded', isOpen);
                });
            }

            // --- Mobile Accordion Logic ---
            const megaMenuItems = document.querySelectorAll('.main-nav .mega-menu-item');
            megaMenuItems.forEach(menuItem => {
                const link = menuItem.querySelector('a');
                if (link) {
                    link.addEventListener('click', function(event) {
                        if (window.innerWidth < 992 && menuItem.querySelector('.mega-menu')) {
                            event.preventDefault();
                            
                            // Close other open accordions before opening the new one
                            megaMenuItems.forEach(item => {
                                if (item !== menuItem) {
                                    item.classList.remove('is-open');
                                }
                            });
                            
                            // Toggle the clicked accordion
                            menuItem.classList.toggle('is-open');
                        }
                    });
                }
            });

            // --- User Menu Dropdown Toggle ---
            const userMenuToggle = document.querySelector('.user-menu-toggle');
            const userMenuDropdown = document.querySelector('.user-menu-dropdown');

            if (userMenuToggle && userMenuDropdown) {
                userMenuToggle.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const isOpen = userMenuDropdown.classList.toggle('is-open');
                    userMenuToggle.setAttribute('aria-expanded', isOpen);
                });
            }

            // --- Close dropdown when clicking outside ---
            document.addEventListener('click', function(event) {
                if (userMenuDropdown && userMenuDropdown.classList.contains('is-open')) {
                    if (!userMenuToggle.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                        userMenuDropdown.classList.remove('is-open');
                        userMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // --- SIMULATION of your roles.js logic for this demo ---
            function applyRoleVisibility() {
                if (window.MEMBER_ROLES && Array.isArray(window.MEMBER_ROLES)) {
                    const userRoles = window.MEMBER_ROLES.map(role => role.toLowerCase().trim());
                    const isLoggedIn = userRoles.length > 0;

                    document.querySelectorAll('.role-conditional').forEach(function(el) {
                        const allowedRolesRaw = el.dataset.roles || "";
                        
                        if (allowedRolesRaw === "") {
                            el.style.display = isLoggedIn ? 'none' : 'flex';
                            return;
                        }
                        
                        const allowedRoles = allowedRolesRaw.split(',').map(role => role.toLowerCase().trim());
                        const hasAccess = userRoles.some(userRole => allowedRoles.includes(userRole));
                        el.style.display = hasAccess ? 'flex' : 'none';
                    });
                }
            }

            // --- DEMO-ONLY: Logic for the toggle switch ---
            const loginToggle = document.getElementById('login-toggle');
            loginToggle.addEventListener('change', function() {
                if (this.checked) {
                    window.MEMBER_ROLES = ['active'];
                } else {
                    window.MEMBER_ROLES = [];
                }
                applyRoleVisibility();
            });

            // Initial run on page load
            window.MEMBER_ROLES = [];
            applyRoleVisibility();
        });
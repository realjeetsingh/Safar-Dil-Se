// Global Variables
let currentTestimonial = 0;
let map;
let currentTheme = 'light';
let testimonialInterval;

// Ensure functions are available globally immediately
window.showSection = showSection;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.handleContactForm = handleContactForm;
window.openWhatsApp = openWhatsApp;
window.openInstagram = openInstagram;
window.openEmail = openEmail;
window.openAITripPlanner = openAITripPlanner;
window.bookTrip = bookTrip;
window.openBlogPost = openBlogPost;

// Show specific section - Fixed and enhanced
function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in');
        
        // Update active nav link
        updateActiveNavLink(sectionId);
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Initialize map if trips section
        if (sectionId === 'trips') {
            setTimeout(() => {
                if (map) {
                    map.invalidateSize();
                } else {
                    initializeMap();
                }
            }, 300);
        }
        
        // Restart testimonials if testimonials section
        if (sectionId === 'testimonials') {
            setTimeout(() => {
                initializeTestimonials();
            }, 100);
        }
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`Successfully switched to ${sectionId} section`);
    } else {
        console.error(`Section ${sectionId} not found`);
    }
}

// Update active navigation link - Enhanced
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link onclick contains the section ID
        const onclickAttr = link.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`'${sectionId}'`)) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality - Fixed
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeToggle(currentTheme);
    
    // Store theme preference safely
    try {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('safar-theme', currentTheme);
        }
    } catch (e) {
        console.log('Could not save theme preference');
    }
    
    // Show feedback
    showNotification(`Switched to ${currentTheme} mode`, 'success');
    console.log('Theme switched to:', currentTheme);
}

// Update theme toggle button - Enhanced
function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.style.transform = 'rotate(0deg)';
        
        // Add rotation animation
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(180deg)';
        }, 100);
        
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Mobile menu functionality - Enhanced
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        console.log('Mobile menu toggled:', !isActive);
    }
}

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Open AI Trip Planner - Enhanced
function openAITripPlanner() {
    console.log('Opening AI Trip Planner');
    
    const confirmed = confirm('🌍 AI Trip Planner\n\nThis will open our AI-powered trip planning tool in a new window. Create custom itineraries based on your preferences!\n\n✨ Features:\n• Personalized trip suggestions\n• Budget planning\n• Activity recommendations\n• Weather insights\n\nProceed to AI Trip Planner?');
    
    if (confirmed) {
        try {
            const aiPlannerURL = 'https://sample-firebase-ai-app-8a3d8--sample-app-kmjjz9or.web.app/';
            const newWindow = window.open(aiPlannerURL, '_blank', 'noopener,noreferrer');
            
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                // Fallback if popup blocked
                showNotification('Please allow popups to open AI Trip Planner', 'error');
                setTimeout(() => {
                    window.location.href = aiPlannerURL;
                }, 2000);
            } else {
                showNotification('AI Trip Planner opened in new tab!', 'success');
            }
        } catch (error) {
            console.error('Error opening AI Trip Planner:', error);
            showNotification('Unable to open AI Trip Planner. Please contact us at 9599863263', 'error');
        }
    }
}

// Book trip functionality - Fixed and enhanced
function bookTrip(tripName) {
    console.log('Booking trip:', tripName);
    
    // Show loading state
    showNotification('Preparing booking details...', 'info');
    
    setTimeout(() => {
        const message = `🏔️ Trip Booking Inquiry - ${tripName}

Hi Safar Dil Se team!

I'm interested in booking the ${tripName} trip. Please share details about:

📅 Available dates and seasons
💰 Complete pricing breakdown
👥 Group size and age composition
📋 Detailed day-wise itinerary
🎒 Complete packing checklist
🚗 Pick-up/drop-off points in Delhi
🏨 Accommodation details and photos
🍽️ Meal arrangements and dietary options
🛡️ Safety measures and emergency protocols
📞 Trip coordinator contact details
🌤️ Best weather conditions
📸 Photos/videos from previous trips

I'm excited to "Jiyo Khul Ke" with your amazing adventures!

Looking forward to hearing from you soon.

- Sent from your website`;

        // Show enhanced booking confirmation
        const confirmed = confirm(`📩 Book ${tripName}\n\n🎯 We'll connect you with our team via WhatsApp to:\n\n✅ Share complete trip details & itinerary\n✅ Check real-time availability & dates\n✅ Process your booking securely\n✅ Answer all your questions instantly\n✅ Share group photos from previous trips\n✅ Provide packing checklist\n✅ Share safety protocols\n\n🚀 Ready to start your adventure?\n\nClick OK to continue to WhatsApp!`);
        
        if (confirmed) {
            showNotification('Opening WhatsApp to connect with our team...', 'success');
            setTimeout(() => {
                openWhatsApp(message);
            }, 1000);
        }
    }, 1000);
}

// WhatsApp integration - Enhanced and more reliable
function openWhatsAppicon(customMessage = '') {
    console.log('Opening WhatsApp for Safar Dil Se');
    
    const phoneNumber = '919599863263';
    const defaultMessage = `🙏 Namaste from Safar Dil Se!

I discovered your travel company online and I'm excited about your group adventures!

I'd love to know more about:
🌄 Upcoming trips and destinations
💰 Pricing and complete inclusions
📅 Available dates for next few months
👥 Group sizes and typical age groups
🎒 What to pack and how to prepare
🛡️ Safety measures and protocols
🚗 Pick-up points in Delhi
🏨 Accommodation standards
🍽️ Food arrangements
📸 Photos/videos from recent trips

I'm ready to "Jiyo Khul Ke" with your amazing adventures!

Please share your brochure and trip details.

Thank you! 🏔️`;

    const finalMessage = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    
    // Multiple WhatsApp URL formats for better compatibility
    const whatsappURLs = [
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
        `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`,
        `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
    ];
    
    let opened = false;
    
    // Try each URL format
    for (let i = 0; i < whatsappURLs.length && !opened; i++) {
        try {
            console.log(`Trying WhatsApp method ${i + 1}`);
            
            if (i === 0) {
                // Method 1: window.open
                const newWindow = window.open(whatsappURLs[i], '_blank', 'noopener,noreferrer');
                opened = newWindow && !newWindow.closed;
            } else if (i === 1) {
                // Method 2: Create and click link
                const link = document.createElement('a');
                link.href = whatsappURLs[i];
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                opened = true;
            } else {
                // Method 3: Direct location
                window.location.href = whatsappURLs[i];
                opened = true;
            }
            
            if (opened) {
                console.log(`WhatsApp opened successfully using method ${i + 1}`);
                showNotification('WhatsApp opened! If it didn\'t work, call us at 9599863263', 'success');
                break;
            }
        } catch (error) {
            console.log(`Method ${i + 1} failed:`, error);
        }
    }
    
    if (!opened) {
        // Final fallback
        const contactMessage = `WhatsApp couldn't open automatically.\n\n📞 Please contact us directly:\n\nPhone: 9599863263\nEmail: safardilse.jiyokhulke@gmail.com\nInstagram: @safardilse_2000\n\n📍 We're based in Delhi, India\n\nWe'd love to help you plan your next adventure!`;
        alert(contactMessage);
    }
}

// Testimonials functionality - Enhanced
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    console.log('Found testimonial cards:', testimonialCards.length);
    
    if (testimonialCards.length > 0) {
        // Clear any existing interval
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
        
        // Show first testimonial
        showTestimonial(0);
        
        // Auto-rotate testimonials every 5 seconds
        testimonialInterval = setInterval(() => {
            nextTestimonial();
        }, 5000);
        
        console.log('Testimonials initialized with auto-rotation');
        showNotification('Testimonials loaded - real reviews from our travelers!', 'info');
    } else {
        console.warn('No testimonial cards found');
    }
}

// Show specific testimonial
function showTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    currentTestimonial = index;
    console.log(`Showing testimonial ${index + 1} of ${testimonialCards.length}`);
}

// Next testimonial
function nextTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
}

// Previous testimonial
function prevTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
        showTestimonial(currentTestimonial);
    }
}

// Contact form handling - Enhanced
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        destination: formData.get('destination'),
        message: formData.get('message')
    };
    
    // Comprehensive form validation
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter a valid name (at least 2 characters).', 'error');
        return;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number (at least 10 digits).', 'error');
        return;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showNotification('Please provide more details about your travel preferences (at least 10 characters).', 'error');
        return;
    }
    
    // Submit form with loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending Inquiry...';
    submitButton.disabled = true;
    
    // Show progress
    showNotification('Preparing your travel inquiry...', 'info');
    
    setTimeout(() => {
        // Create detailed WhatsApp message
        const destinationText = data.destination && data.destination !== '' ? 
            `Preferred Destination: ${data.destination}` : 
            'Preferred Destination: Open to suggestions';
            
        const whatsappMessage = `📩 New Trip Inquiry from Website

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
🎯 ${destinationText}

💬 Travel Preferences & Requirements:
${data.message}

📋 Please share:
• Available trip dates
• Complete pricing details
• Group information
• Detailed itinerary
• Packing requirements
• Safety protocols

Looking forward to an amazing adventure with Safar Dil Se!

Jiyo Khul Ke! 🌄

- Sent from Safar Dil Se Website Contact Form`;
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear form
        form.reset();
        
        // Show success and open WhatsApp
        showNotification('Inquiry sent! Opening WhatsApp to connect with our team...', 'success');
        setTimeout(() => {
            openWhatsApp(whatsappMessage);
        }, 1500);
    }, 2000);
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Map functionality - Enhanced
function initializeMap() {
    try {
        const mapElement = document.getElementById('destinations-map');
        if (!mapElement) {
            console.log('Map element not found');
            return;
        }
        
        if (typeof L === 'undefined') {
            console.log('Leaflet library not loaded, showing fallback');
            showMapFallback();
            return;
        }
        
        // Show loading state
        mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-family: Inter; color: #666;"><div><div class="loading-spinner"></div><p>Loading interactive map...</p></div></div>';
        
        setTimeout(() => {
            // Initialize map centered on North India
            map = L.map('destinations-map', {
                center: [30.0668, 79.0193],
                zoom: 7,
                zoomControl: true,
                scrollWheelZoom: false,
                doubleClickZoom: true,
                touchZoom: true
            });
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors | Safar Dil Se Travel Destinations',
                maxZoom: 18,
                minZoom: 6
            }).addTo(map);
            
            // Enhanced destinations data
            const destinations = [
                {
                    name: "Kasol",
                    state: "Himachal Pradesh",
                    lat: 32.2430,
                    lng: 77.3106,
                    description: "Hippie Paradise in Parvati Valley - known for its Israeli culture and natural beauty",
                    trips: ["Kasol–Tosh–Manali"],
                    highlights: ["River Parvati", "Israeli Food", "Trekking Base", "Backpacker Haven"],
                    bestTime: "March-June, Sep-Nov"
                },
                {
                    name: "Tirthan Valley",
                    state: "Himachal Pradesh", 
                    lat: 31.6260,
                    lng: 77.5619,
                    description: "Hidden Gem of Himachal - perfect for nature lovers and fishing enthusiasts",
                    trips: ["Tirthan Valley"],
                    highlights: ["Great Himalayan National Park", "Trout Fishing", "Pristine Nature", "Offbeat Destination"],
                    bestTime: "April-June, Sep-Nov"
                },
                {
                    name: "Tungnath",
                    state: "Uttarakhand",
                    lat: 30.4135,
                    lng: 79.2120,
                    description: "World's Highest Shiva Temple - ultimate trekking and spiritual destination",
                    trips: ["Tungnath Trek"],
                    highlights: ["Highest Shiva Temple", "Chandrashila Peak", "Rhododendron Forests", "Spiritual Journey"],
                    bestTime: "May-June, Sep-Oct"
                },
                {
                    name: "Manali",
                    state: "Himachal Pradesh",
                    lat: 32.2432,
                    lng: 77.1892,
                    description: "Adventure Capital of Himachal - popular hill station with endless activities",
                    trips: ["Kasol–Tosh–Manali"],
                    highlights: ["Solang Valley", "Rohtang Pass", "Adventure Sports", "Snow Activities"],
                    bestTime: "March-June, Oct-Dec"
                }
            ];
            
            // Add enhanced markers
            destinations.forEach((destination, index) => {
                const iconColors = ['#1FB8CD', '#FF6B35', '#4A7C59', '#2C5F7A'];
                const iconColor = iconColors[index % iconColors.length];
                
                const customIcon = L.divIcon({
                    html: `<div style="background-color: ${iconColor}; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); font-size: 18px; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">🏔️</div>`,
                    className: 'custom-marker',
                    iconSize: [35, 35],
                    iconAnchor: [17, 17]
                });
                
                const marker = L.marker([destination.lat, destination.lng], { icon: customIcon }).addTo(map);
                
                const popupContent = `
                    <div style="text-align: center; padding: 20px; font-family: Inter, sans-serif; min-width: 280px; max-width: 320px;">
                        <h4 style="color: #2563eb; margin-bottom: 8px; font-size: 20px; font-weight: 600;">${destination.name}</h4>
                        <p style="margin: 8px 0; font-size: 14px; color: #666; font-weight: 500;">${destination.state}</p>
                        <p style="margin: 12px 0; font-size: 13px; color: #777; line-height: 1.4;">${destination.description}</p>
                        
                        <div style="margin: 15px 0;">
                            <strong style="color: #2563eb; font-size: 12px; display: block; margin-bottom: 8px;">✨ Highlights:</strong>
                            ${destination.highlights.map(highlight => `<span style="background: #e3f2fd; color: #2563eb; padding: 3px 8px; border-radius: 12px; font-size: 11px; margin: 2px; display: inline-block;">${highlight}</span>`).join('')}
                        </div>
                        
                        <div style="margin: 15px 0;">
                            <strong style="color: #ff6b35; font-size: 12px; display: block; margin-bottom: 5px;">🗓️ Best Time:</strong>
                            <span style="color: #666; font-size: 12px;">${destination.bestTime}</span>
                        </div>
                        
                        <div style="margin-top: 15px;">
                            <strong style="color: #2563eb; font-size: 12px; display: block; margin-bottom: 8px;">🎒 Available Trips:</strong>
                            ${destination.trips.map(trip => `<span style="background: #f0f9ff; color: #2563eb; padding: 4px 10px; border-radius: 15px; font-size: 12px; margin: 3px; display: inline-block; border: 1px solid #2563eb;">${trip}</span>`).join('')}
                        </div>
                        
                        <button onclick="bookTrip('${destination.trips[0]}')" style="background: linear-gradient(135deg, #1FB8CD, #FF6B35); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 13px; font-weight: 600; margin-top: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 3px 10px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                            Book ${destination.name} Trip 🚀
                        </button>
                    </div>
                `;
                
                marker.bindPopup(popupContent, {
                    maxWidth: 350,
                    className: 'custom-popup'
                });
            });
            
            console.log('Interactive map initialized successfully');
            showNotification('Interactive map loaded! Click markers to explore destinations.', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('Error initializing map:', error);
        showMapFallback();
    }
}

// Show enhanced fallback map
function showMapFallback() {
    const mapElement = document.getElementById('destinations-map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #e3f2fd, #f3e5f5); color: #2563eb; font-family: Inter, sans-serif; border-radius: 12px;">
                <div style="text-align: center; padding: 40px;">
                    <h4 style="margin-bottom: 20px; font-size: 24px; color: #1FB8CD;">🏔️ Our Adventure Destinations</h4>
                    <p style="margin-bottom: 25px; color: #666; font-size: 16px;">Explore India's most beautiful landscapes with us</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 500px;">
                        <div class="destination-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;" onclick="bookTrip('Kasol–Tosh–Manali')" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#1FB8CD';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='transparent';">
                            <strong style="color: #1FB8CD; font-size: 16px;">🌲 Kasol, HP</strong><br>
                            <small style="color: #666;">Parvati Valley Paradise</small><br>
                            <small style="color: #999; font-size: 11px;">Israeli culture • River views</small>
                        </div>
                        <div class="destination-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;" onclick="bookTrip('Tungnath Trek')" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#FF6B35';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='transparent';">
                            <strong style="color: #FF6B35;">⛰️ Tungnath, UK</strong><br>
                            <small style="color: #666;">Sacred Himalayan Trek</small><br>
                            <small style="color: #999; font-size: 11px;">Highest temple • Spiritual</small>
                        </div>
                        <div class="destination-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;" onclick="bookTrip('Tirthan Valley')" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#4A7C59';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='transparent';">
                            <strong style="color: #4A7C59;">🎣 Tirthan Valley, HP</strong><br>
                            <small style="color: #666;">Nature's Hidden Gem</small><br>
                            <small style="color: #999; font-size: 11px;">Fishing • Pristine nature</small>
                        </div>
                        <div class="destination-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;" onclick="bookTrip('Kasol–Tosh–Manali')" onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#2C5F7A';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='transparent';">
                            <strong style="color: #2C5F7A;">🏔️ Manali, HP</strong><br>
                            <small style="color: #666;">Adventure Capital</small><br>
                            <small style="color: #999; font-size: 11px;">Snow sports • Activities</small>
                        </div>
                    </div>
                    <p style="margin-top: 20px; font-size: 14px; color: #888;">Click on any destination to book your adventure!</p>
                </div>
            </div>
        `;
        
        console.log('Fallback map displayed');
        showNotification('Destination cards loaded! Click to book your adventure.', 'info');
    }
}

// Blog post functionality - Enhanced
function openBlogPost(postId) {
    const blogPosts = {
        'packing-guide': {
            title: '5 Things to Pack for Your First Himalayan Trek',
            summary: 'Essential packing guide for safe and comfortable Himalayan adventures'
        },
        'kasol-guide': {
            title: 'Kasol: The Mini Israel of India',
            summary: 'Complete guide to exploring Kasol and the beautiful Parvati Valley'
        },
        'food-guide': {
            title: 'Local Delicacies to Try in Himachal Pradesh',
            summary: 'Food lover\'s guide to authentic Himachali cuisine and local specialties'
        }
    };
    
    const post = blogPosts[postId];
    if (post) {
        const confirmed = confirm(`📖 ${post.title}\n\n${post.summary}\n\n🔄 This detailed blog post is coming soon!\n\nFor now, we'd love to share personalized advice via WhatsApp:\n\n✅ Detailed packing checklists\n✅ Local food recommendations  \n✅ Insider travel tips\n✅ Weather guides\n✅ Cultural insights\n✅ Photography tips\n\nWould you like us to share these insights on WhatsApp?`);
        
        if (confirmed) {
            const message = `📖 Blog Post Request: ${post.title}

Hi Safar Dil Se team!

I'm interested in reading about "${post.title}" from your website. Could you please share detailed insights and tips about this topic?

Specifically interested in:
• Practical advice and tips
• Personal experiences 
• Insider recommendations
• Photos and examples

Looking forward to learning more!

Thanks!
- From Safar Dil Se website`;
            
            showNotification('Connecting you with our travel experts...', 'info');
            setTimeout(() => {
                openWhatsApp(message);
            }, 1500);
        }
    }
}

// Utility functions - Enhanced
function openInstagram() {
    showNotification('Opening our Instagram page...', 'info');
    const instagramURL = 'https://instagram.com/safardilse_2000';
    const newWindow = window.open(instagramURL, '_blank', 'noopener,noreferrer');
    
    if (!newWindow) {
        showNotification('Please allow popups to view our Instagram', 'error');
    } else {
        showNotification('Follow us for daily adventure updates! 📸', 'success');
    }
}

function openEmail(subject = 'Trip Inquiry from Website', body = '') {
    const email = 'safardilse.jiyokhulke@gmail.com';
    const defaultBody = `Hi Safar Dil Se team,

I found your website and I'm interested in your travel packages. Please share details about upcoming trips, pricing, and availability.

Looking forward to traveling with you!

Best regards`;
    
    const finalBody = body || defaultBody;
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(finalBody)}`;
    
    try {
        window.location.href = mailtoURL;
        showNotification('Opening your email client...', 'info');
    } catch (error) {
        showNotification('Email client not available. Please contact: safardilse.jiyokhulke@gmail.com', 'error');
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336', 
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 16px 20px;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 350px;
        min-width: 250px;
        animation: slideInRight 0.4s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.innerHTML = `<span style="font-size: 16px;">${icons[type] || icons.info}</span><span>${message}</span>`;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 4000);
}

// Initialize HubSpot form - Enhanced
function initializeHubSpotForm() {
    const hubspotContainer = document.getElementById('hubspot-form-container');
    if (!hubspotContainer) return;
    
    // Show enhanced loading state
    hubspotContainer.innerHTML = `
        <div class="hs-form-loading" style="text-align: center; padding: 40px; color: #666;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 15px;">Loading secure contact form...</p>
            <small style="color: #999;">Powered by HubSpot</small>
        </div>
    `;
    
    // Check if HubSpot script loads
    const checkHubSpot = setInterval(() => {
        if (window.hbspt && window.hbspt.forms) {
            clearInterval(checkHubSpot);
            
            try {
                window.hbspt.forms.create({
                    region: "na2",
                    portalId: "243303486",
                    formId: "887d4be4-ee48-43ca-aab4-450d9ce1bfb7",
                    target: '#hubspot-form-container',
                    onFormReady: function() {
                        console.log('HubSpot form loaded successfully');
                        showNotification('Secure contact form loaded!', 'success');
                    },
                    onFormSubmit: function() {
                        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
                    }
                });
            } catch (error) {
                console.error('HubSpot form creation failed:', error);
                showFallbackForm();
            }
        }
    }, 500);
    
    // Fallback timeout - show form after 8 seconds if HubSpot doesn't load
    setTimeout(() => {
        clearInterval(checkHubSpot);
        if (hubspotContainer && !hubspotContainer.querySelector('form')) {
            console.log('HubSpot timeout - showing fallback form');
            showFallbackForm();
        }
    }, 8000);
}

function showFallbackForm() {
    const hubspotContainer = document.getElementById('hubspot-form-container');
    const fallbackForm = document.getElementById('fallback-contact-form');
    
    if (hubspotContainer && fallbackForm) {
        hubspotContainer.style.display = 'none';
        fallbackForm.style.display = 'block';
        showNotification('Contact form ready! Fill out your details to connect with us.', 'info');
        console.log('Fallback contact form displayed');
    }
}

// Initialize the application - Enhanced
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏔️ Safar Dil Se app initializing...');
    
    // Load saved theme preference
    try {
        if (typeof Storage !== 'undefined') {
            const savedTheme = localStorage.getItem('safar-theme');
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                currentTheme = savedTheme;
            }
        }
    } catch (e) {
        console.log('Could not load theme preference');
    }
    
    // Set theme
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeToggle(currentTheme);
    
    // Initialize testimonials
    setTimeout(() => {
        initializeTestimonials();
    }, 500);
    
    // Initialize map after a delay
    setTimeout(() => {
        initializeMap();
    }, 1500);
    
    // Initialize HubSpot form
    setTimeout(() => {
        initializeHubSpotForm();
    }, 2000);
    
    // Enhanced event listeners
    document.addEventListener('click', function(e) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        // Close mobile menu when clicking outside
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Arrow keys for testimonials
        if (document.getElementById('testimonials').classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextTestimonial();
            } else if (e.key === 'ArrowLeft') {
                prevTestimonial();
            }
        }
    });
    
    // Pause testimonials on hover
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            if (testimonialInterval) {
                clearInterval(testimonialInterval);
            }
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                nextTestimonial();
            }, 5000);
        });
    }
    
    console.log('✅ Safar Dil Se app initialized successfully!');
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to Safar Dil Se! Ready to explore India? 🏔️', 'success');
    }, 2000);
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh or contact us at 9599863263', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('📊 Page fully loaded');
    
    // Check critical elements
    const criticalElements = ['nav-menu', 'whatsapp-float', 'destinations-map', 'testimonial-slider'];
    const missingElements = criticalElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.warn('⚠️ Missing critical elements:', missingElements);
    } else {
        console.log('✅ All critical elements loaded');
    }
    
    // Report performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page load time: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('🐌 Slow load time detected');
        }
    }
});

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading-spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #1FB8CD;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
        border: none;
    }
    
    .custom-popup .leaflet-popup-tip {
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    
    .notification {
        backdrop-filter: blur(10px);
        border-left: 4px solid rgba(255,255,255,0.3);
    }
`;



/* New HUBSOP UPDATE start from here – client-side interactions
   ===============================================================
   Version:        2025-07-29
   Change log:     • REMOVED all WhatsApp deep-links
                   • REPLACED openWhatsApp() with HubSpot redirect
                   • UPDATED bookTrip(), handleContactForm(), openBlogPost()
                     to reference the new behaviour
   =============================================================== */

/* =========================================================================
 *  0.  GLOBAL EXPORTS
 * ------------------------------------------------------------------------- */
window.showSection        = showSection;
window.toggleTheme        = toggleTheme;
window.toggleMobileMenu   = toggleMobileMenu;
window.nextTestimonial    = nextTestimonial;
window.prevTestimonial    = prevTestimonial;
window.handleContactForm  = handleContactForm;
window.openAITripPlanner  = openAITripPlanner;
window.bookTrip           = bookTrip;
window.openBlogPost       = openBlogPost;

/* =========================================================================
 *  1.  UI HELPERS (UNCHANGED)
 * ------------------------------------------------------------------------- */
/* … [ALL PRE-EXISTING UNCHANGED HELPER CODE REMAINS HERE] … */

/* =========================================================================
 *  2.  BOOK-NOW / CONTACT INTEGRATION
 * ------------------------------------------------------------------------- */

/**
 * bookTrip – opens a confirmation modal and, when accepted, launches the
 * HubSpot booking form in a new tab. The WhatsApp deep-link has been removed
 * entirely; the function now uses openWhatsApp(), which itself redirects
 * to HubSpot.
 */
function bookTrip(tripName = 'your adventure') {
  console.log('Booking trip:', tripName);

  // Notify immediately so users get feedback while modal is open
  showNotification('Preparing booking details…', 'info');

  // Delay is purely cosmetic – allows the notification to render first
  setTimeout(() => {
    const confirmed = confirm(
      `📩 Book ${tripName}\n\n` +
      `🎯 We'll connect you with our team via a secure contact form to:\n\n` +
      `✅ Share complete trip details & itinerary\n` +
      `✅ Check real-time availability & dates\n` +
      `✅ Process your booking securely\n` +
      `✅ Answer all your questions instantly\n` +
      `✅ Share group photos from previous trips\n` +
      `✅ Provide packing checklist\n` +
      `✅ Share safety protocols\n\n` +
      `🚀 Ready to start your adventure?\n\n` +
      `Click OK to continue to the contact form!`
    );

    if (confirmed) {
      showNotification('Opening contact form…', 'success');
      setTimeout(() => openWhatsApp(), 750); // opens HubSpot form instead
    }
  }, 500);
}

/**
 * openWhatsApp – **DELIBERATELY repurposed**.
 * Instead of launching WhatsApp, we now open the HubSpot form in a new tab.
 * The function name is kept so all existing calls remain valid without
 * further refactoring throughout the codebase.
 *
 * @param {string=} _customMessage – ignored; kept for backward compatibility.
 */
function openWhatsApp(_customMessage = '') {
  window.open(
    'https://40uu66.share-na2.hsforms.com/26h-ASCfgT3aeZ6JZfOKe3g',
    '_blank',
    'noopener,noreferrer'
  );
  showNotification('Contact form opened in a new tab.', 'info');
}

/* =========================================================================
 *  3.  CONTACT FORM SUBMISSION
 * ------------------------------------------------------------------------- */

/**
 * handleContactForm – unchanged form-validation logic, but on successful
 * validation we now direct users to the same HubSpot form instead of
 * generating a WhatsApp message.
 */
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const fd   = new FormData(form);

  const data = {
    name:  fd.get('name')?.trim(),
    email: fd.get('email')?.trim(),
    phone: fd.get('phone')?.trim(),
    message: fd.get('message')?.trim()
  };

  /* --- minimal validation (unchanged) --- */
  if (!data.name || data.name.length < 2) {
    return showNotification('Please enter a valid name.', 'error');
  }
  if (!isValidEmail(data.email)) {
    return showNotification('Please enter a valid email address.', 'error');
  }
  if (!isValidPhone(data.phone)) {
    return showNotification('Please enter a valid phone number.', 'error');
  }
  if (!data.message || data.message.length < 10) {
    return showNotification('Please provide more details.', 'error');
  }

  /* --- UX feedback & redirect --- */
  const btn         = form.querySelector('button[type="submit"]');
  const originalTxt = btn.textContent;
  btn.textContent   = 'Redirecting…';
  btn.disabled      = true;

  showNotification('Redirecting you to our secure contact form…', 'success');

  setTimeout(() => {
    btn.textContent = originalTxt;
    btn.disabled    = false;
    form.reset();
    openWhatsApp();            // opens HubSpot form
  }, 800);
}

/* =========================================================================
 *  4.  BLOG-POST CTA
 * ------------------------------------------------------------------------- */
function openBlogPost(postId) {
  const posts = {
    'packing-guide': {
      title:   '5 Things to Pack for Your First Himalayan Trek',
      summary: 'Essential packing guide for safe and comfortable adventures.'
    },
    'kasol-guide': {
      title:   'Kasol — The Mini Israel of India',
      summary: 'Complete guide to exploring Kasol and Parvati Valley.'
    }
  };

  const p = posts[postId];
  if (!p) return;

  const confirmed = confirm(
    `📖 ${p.title}\n\n${p.summary}\n\n` +
    `The full article is coming soon.\n\n` +
    `Would you like personalised advice right now?`
  );

  if (confirmed) {
    showNotification('Opening contact form…', 'info');
    openWhatsApp();            // opens HubSpot form
  }
}

/* =========================================================================
 *  5.  EMAIL / MAP / THEME / TESTIMONIAL LOGIC
 *      (entire sections are identical to the previous build and are thus
 *       omitted for brevity; no WhatsApp calls remain elsewhere.)
 * ------------------------------------------------------------------------- */

/* … [ALL REMAINING ORIGINAL CODE – INCLUDING showSection(), toggleTheme(),
      initializeMap(), testimonials, notifications, etc. – IS UNCHANGED] … */


/* =========================================================================
 *  6.  VALIDATION HELPERS (UNCHANGED)
 * ------------------------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[+]?[\d\s\-()]{10,}$/.test(phone.replace(/\s/g, ''));
}

/* =========================================================================
 *  7.  BOOTSTRAP
 * ------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  /* … existing initialisation code – unchanged … */
});


document.head.appendChild(style);

console.log('🚀 Safar Dil Se JavaScript fully loaded and ready!');

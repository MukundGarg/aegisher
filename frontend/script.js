const API_URL = "http://localhost:5001/api";
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
async function checkBackend() {
  try {
    // Example location (Los Angeles coordinates)
    const latitude = 34.0522;
    const longitude = -118.2437;

    const res = await fetch(`${API_URL}/safety-reports/nearby?latitude=${latitude}&longitude=${longitude}&radius=5000`);
    const data = await res.json();

    if (res.ok && data.success) {
      console.log(`✅ Backend is connected!`);
      console.log(`📍 Found ${data.count} safety reports.`);
      console.log(`⭐ Average Safety Rating: ${data.averageSafetyRating}`);
    } else {
      console.log("⚠️ Backend reachable but returned an error:", data.error || res.status);
    }
  } catch (err) {
    console.error("❌ Cannot reach backend:", err);
  }
}

checkBackend(); // Run this once on page load


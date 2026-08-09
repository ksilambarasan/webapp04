// Thagadur Career Services - Core Application Controller

// 1. Data Definitions for Services
const servicesData = {
    executive: {
        title: "Executive Leadership Search",
        icon: "fa-user-tie",
        desc: "We identify and recruit high-impact executives (CEOs, CTOs, VPs, and Board Members) who align with your long-term corporate vision and culture.",
        features: [
            "Comprehensive market mapping & candidate identification",
            "Deep behavioral profiling & leadership alignment vetting",
            "Compensation architecture and negotiation counseling",
            "Discreet and fully confidential background validations"
        ]
    },
    tech: {
        title: "Technical Staffing Pipelines",
        icon: "fa-laptop-code",
        desc: "Access specialized tech talent. We maintain verified networks of individual contributors, architects, and engineering managers across primary tech hubs.",
        features: [
            "Direct code assessment and tech vetting processes",
            "Niche specialties: ML, Cloud Infrastructure, Security, Blockchain",
            "Rapid deployment setups (remote & on-site models)",
            "Strict candidate vetting before introduction"
        ]
    },
    rpo: {
        title: "Recruitment Process Outsourcing",
        icon: "fa-file-invoice-dollar",
        desc: "Integrate Thagadur's expertise into your existing talent acquisition structure to scale hiring velocity without overhead.",
        features: [
            "Embedded recruiters inside your corporate Slack/Teams",
            "End-to-end management from sourcing to offer signoff",
            "ATS tool optimization and dashboard reporting setups",
            "Cost-per-hire optimization frameworks"
        ]
    },
    advisory: {
        title: "Career Advisory & Coaching",
        icon: "fa-compass",
        desc: "One-on-one professional guidance for elite candidates seeking career acceleration or leadership transitions.",
        features: [
            "Custom ATS-optimized resume restructuring",
            "Simulated technical architecture and behavioral mocks",
            "Personal brand development on LinkedIn & github",
            "Market value benchmarking and offer review guidance"
        ]
    },
    eor: {
        title: "Global Employer of Record (EoR)",
        icon: "fa-globe",
        desc: "Hire talent globally in days. We handle legal compliance, local payroll taxes, benefits administration, and contracts in over 12 countries.",
        features: [
            "Fully compliant international employment agreements",
            "Local currency payroll processing and tax reporting",
            "Localized health benefit structures & pensions",
            "IP and copyright security protection guarantees"
        ]
    },
    contract: {
        title: "Contract & Freelance Staffing",
        icon: "fa-briefcase",
        desc: "Flexible, rapid-scale consulting teams and independent contract experts for time-sensitive, business-critical product deliverables.",
        features: [
            "Contractor vetting and deployment in under 48 hours",
            "Automated invoicing, timesheets, and milestone tracking",
            "Easy direct hire transition options",
            "Dedicated client support manager contact"
        ]
    }
};

// 2. Mock Global Jobs Database for Seeker Matching
const globalJobsDb = [
    { title: "Senior React Engineer", company: "WebFlow Inc.", salary: "135,000", location: "Remote / US", tags: ["React", "JavaScript", "CSS", "TypeScript"] },
    { title: "Cloud Infrastructure Architect", company: "DataSync Systems", salary: "165,000", location: "London / Hybrid", tags: ["AWS", "Kubernetes", "Docker", "Terraform"] },
    { title: "Staff Python Engineer", company: "Aether AI", salary: "180,000", location: "San Francisco", tags: ["Python", "PyTorch", "LLMs", "Docker"] },
    { title: "Senior Cybersecurity Consultant", company: "TrustShield Co.", salary: "150,000", location: "Tokyo / Remote", tags: ["Security", "Kubernetes", "Linux", "AWS"] },
    { title: "UX/UI Product Designer", company: "Studio Stream", salary: "120,000", location: "Berlin / Hybrid", tags: ["Figma", "UX", "UI", "Prototyping"] },
    { title: "Backend Team Lead", company: "FinNexus Labs", salary: "170,000", location: "Bangalore / Remote", tags: ["Node.js", "System Design", "AWS", "Postgres"] }
];

// Session State Variable
let activeSession = null;

// 3. Document Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Nav bar scrolling class addition
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });

    // Close mobile nav when link is clicked
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
        });
    });

    // Start auto testimonial rotation
    startTestimonialTimer();

    // Check if initial hash is set to route page correctly
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        // Translate some hashes to fit exact sections
        const sectionId = currentHash === "about" ? "about" : (currentHash === "services" ? "services" : currentHash);
        navigateTo(sectionId);
    }
});

// 4. Navigation Routing Controller
function navigateTo(sectionName) {
    // Normalize target sections
    let targetSectionId = sectionName + "-section";
    
    // Check if session override is running
    if (activeSession) {
        if (activeSession.type === "seeker" && ["jobseeker", "employer"].includes(sectionName)) {
            targetSectionId = "dashboard-seeker-section";
        } else if (activeSession.type === "employer" && ["jobseeker", "employer"].includes(sectionName)) {
            targetSectionId = "dashboard-employer-section";
        }
    }

    const allSections = document.querySelectorAll("main > section");
    let targetSection = document.getElementById(targetSectionId);
    
    if (!targetSection) return;

    // Transition out all sections
    allSections.forEach(section => {
        section.classList.remove("active");
    });

    // Display and transition target section in
    targetSection.style.display = "flex";
    setTimeout(() => {
        targetSection.classList.add("active");
    }, 50);

    // Update active state navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        const href = link.getAttribute("href").substring(1);
        if (href === sectionName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Scroll smoothly to top of main workspace
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// 5. Service Modal Details Loader
function openServiceModal(serviceKey) {
    const service = servicesData[serviceKey];
    if (!service) return;

    document.getElementById("modal-icon-ph").innerHTML = `<i class="fa-solid ${service.icon}"></i>`;
    document.getElementById("modal-title-ph").textContent = service.title;
    document.getElementById("modal-desc-ph").textContent = service.desc;

    const featuresList = document.getElementById("modal-features-ph");
    featuresList.innerHTML = "";
    service.features.forEach(feat => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
        featuresList.appendChild(li);
    });

    document.getElementById("service-modal").classList.add("active");
}

function closeServiceModal() {
    document.getElementById("service-modal").classList.remove("active");
}

// 6. Testimonial Carousel Transitions
let currentSlideIdx = 0;
let slideIntervalTimer = null;

function setSlide(idx) {
    currentSlideIdx = idx;
    const slider = document.getElementById("testimonials-slider");
    slider.style.transform = `translateX(-${idx * 100}%)`;

    // Update controls indicator dots active state
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, dIdx) => {
        if (dIdx === idx) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function startTestimonialTimer() {
    slideIntervalTimer = setInterval(() => {
        let nextIdx = (currentSlideIdx + 1) % 3;
        setSlide(nextIdx);
    }, 6000);
}

// 7. Multi-step Form wizard controller
const wizardStepsCount = { seeker: 3, employer: 3 };
const wizardCurrentStep = { seeker: 1, employer: 1 };

function wizardStep(type, offset) {
    const currentStep = wizardCurrentStep[type];
    const targetStep = currentStep + offset;
    const totalSteps = wizardStepsCount[type];

    // Validate inputs in current step before moving forward
    if (offset > 0 && !validateStepFields(type, currentStep)) {
        return;
    }

    if (targetStep < 1 || targetStep > totalSteps) return;

    // Update active step pointers
    wizardCurrentStep[type] = targetStep;

    // Transition between form panels
    for (let s = 1; s <= totalSteps; s++) {
        const panel = document.getElementById(`${type}-panel-${s}`);
        if (s === targetStep) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    }

    // Update step indicator classes
    for (let s = 1; s <= totalSteps; s++) {
        const indicator = document.getElementById(`${type}-indicator-${s}`);
        if (s < targetStep) {
            indicator.classList.remove("active");
            indicator.classList.add("completed");
        } else if (s === targetStep) {
            indicator.classList.remove("completed");
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("completed");
            indicator.classList.remove("active");
        }
    }

    // Update progress bar percentage width
    const progressPercent = ((targetStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById(`${type}-progress`).style.width = `${progressPercent}%`;

    // Manage visibility of navigation actions buttons
    const prevBtn = document.getElementById(`${type}-prev-btn`);
    const nextBtn = document.getElementById(`${type}-next-btn`);
    const submitBtn = document.getElementById(`${type}-submit-btn`);

    if (targetStep === 1) {
        prevBtn.style.visibility = "hidden";
    } else {
        prevBtn.style.visibility = "visible";
    }

    if (targetStep === totalSteps) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-flex";
    } else {
        nextBtn.style.display = "inline-flex";
        submitBtn.style.display = "none";
    }
}

// Custom step validation
function validateStepFields(type, step) {
    const panel = document.getElementById(`${type}-panel-${step}`);
    const inputs = panel.querySelectorAll("input[required], select[required], textarea[required]");
    let isValid = true;

    inputs.forEach(input => {
        const formGroup = input.closest(".form-group");
        let fieldValid = true;

        if (input.type === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            fieldValid = emailPattern.test(input.value);
        } else if (input.type === "url") {
            try {
                new URL(input.value);
                fieldValid = true;
            } catch (_) {
                fieldValid = false;
            }
        } else if (input.type === "file") {
            fieldValid = input.files.length > 0;
        } else if (input.tagName.toLowerCase() === "select") {
            fieldValid = input.value !== "";
        } else {
            fieldValid = input.value.trim() !== "";
        }

        if (!fieldValid) {
            formGroup.classList.add("has-error");
            isValid = false;
        } else {
            formGroup.classList.remove("has-error");
        }
        
        // Add dynamic change listener to clear errors instantly
        input.addEventListener("input", () => {
            formGroup.classList.remove("has-error");
        }, { once: true });
        if (input.tagName.toLowerCase() === "select") {
            input.addEventListener("change", () => {
                formGroup.classList.remove("has-error");
            }, { once: true });
        }
    });

    return isValid;
}

// 8. Custom File Selector labels
function handleFileChange(input, type) {
    const fileNameph = document.getElementById(`${type}-file-name`);
    if (input.files.length > 0) {
        fileNameph.textContent = `Attached: ${input.files[0].name} (${(input.files[0].size / 1024 / 1024).toFixed(2)} MB)`;
        input.closest(".form-group").classList.remove("has-error");
    } else {
        fileNameph.textContent = "";
    }
}

// 9. Forms Handlers (Submit Actions)

// Toast Alert Trigger Helper
function triggerToast(title, msg, type = "success") {
    const toast = document.getElementById("toast-notif");
    const toastTitle = document.getElementById("toast-title");
    const toastMsg = document.getElementById("toast-msg");

    toast.className = `toast-notification ${type}`;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;

    toast.classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 5000);
}

// Contact form dispatch simulated
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // Quick validate
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    
    triggerToast("Inquiry Dispatched", `Thank you ${name}. Our talent onboarding managers will reach out to ${email} within 24 hours.`);
    form.reset();
}

// Seeker & Employer registration wizard submit handlers
function handleRegistrationSubmit(event, type) {
    event.preventDefault();

    if (type === "seeker") {
        // Collect candidate data
        const firstname = document.getElementById("seeker-firstname").value;
        const lastname = document.getElementById("seeker-lastname").value;
        const email = document.getElementById("seeker-email").value;
        const phone = document.getElementById("seeker-phone").value;
        const specialty = document.getElementById("seeker-specialty").value;
        const experience = document.getElementById("seeker-experience").value;
        const expectedsalary = Number(document.getElementById("seeker-expectedsalary").value).toLocaleString();
        const skillsRaw = document.getElementById("seeker-skills").value;
        const summary = document.getElementById("seeker-summary").value;

        activeSession = {
            type: "seeker",
            name: `${firstname} ${lastname}`,
            email: email,
            phone: phone,
            specialty: specialty,
            experience: experience,
            expectedsalary: expectedsalary,
            skills: skillsRaw.split(",").map(s => s.trim()),
            summary: summary,
            avatar: firstname.charAt(0) + lastname.charAt(0)
        };

        // Render seeker dashboard fields
        document.getElementById("seeker-avatar-lbl").textContent = activeSession.avatar;
        document.getElementById("seeker-profile-name").textContent = activeSession.name;
        document.getElementById("seeker-profile-role").textContent = activeSession.specialty;
        document.getElementById("seeker-card-email").textContent = activeSession.email;
        document.getElementById("seeker-card-phone").textContent = activeSession.phone;
        document.getElementById("seeker-card-experience").textContent = activeSession.experience;
        document.getElementById("seeker-card-salary").textContent = activeSession.expectedsalary;
        
        // Render skills tags
        const skillsContainer = document.getElementById("seeker-card-skills");
        skillsContainer.innerHTML = "";
        activeSession.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "tag tag-highlight";
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });

        // Compute Match jobs based on skills
        renderMatchedJobs(activeSession.skills);

        triggerToast("Profile Active", `Registration complete. Dynamic match scoring has mapped you to active hiring roles.`);
        
        // Reset form
        event.target.reset();
        document.getElementById("seeker-file-name").textContent = "";
        wizardCurrentStep["seeker"] = 1;
        wizardStep("seeker", 0); // resets wizard actions view state

        // Route to dashboard
        navigateTo("dashboard-seeker");

    } else if (type === "employer") {
        // Collect employer data
        const company = document.getElementById("employer-company").value;
        const website = document.getElementById("employer-website").value;
        const industry = document.getElementById("employer-industry").value;
        const size = document.getElementById("employer-size").value;
        const hrname = document.getElementById("employer-hrname").value;
        const designation = document.getElementById("employer-designation").value;
        const email = document.getElementById("employer-email").value;
        const phone = document.getElementById("employer-phone").value;
        const openings = document.getElementById("employer-openings").value;
        const rolesdesc = document.getElementById("employer-rolesdesc").value;

        activeSession = {
            type: "employer",
            company: company,
            website: website,
            industry: industry,
            size: size,
            hrname: hrname,
            designation: designation,
            email: email,
            phone: phone,
            openings: openings,
            rolesdesc: rolesdesc,
            avatar: company.substring(0, 2).toUpperCase()
        };

        // Render employer dashboard fields
        document.getElementById("employer-avatar-lbl").textContent = activeSession.avatar;
        document.getElementById("employer-profile-name").textContent = activeSession.company;
        document.getElementById("employer-profile-industry").textContent = activeSession.industry;
        document.getElementById("employer-card-hrname").textContent = activeSession.hrname;
        document.getElementById("employer-card-designation").textContent = activeSession.designation;
        document.getElementById("employer-card-email").textContent = activeSession.email;
        document.getElementById("employer-card-phone").textContent = activeSession.phone;
        document.getElementById("employer-card-size").textContent = activeSession.size;
        
        const urlLink = document.getElementById("employer-card-url");
        urlLink.href = activeSession.website;
        urlLink.textContent = activeSession.website;

        document.getElementById("employer-openings-count").textContent = activeSession.openings;

        triggerToast("Enterprise Boarded", `Welcome ${company}! Premium indexing networks are now open for talent matching.`);

        // Reset form
        event.target.reset();
        wizardCurrentStep["employer"] = 1;
        wizardStep("employer", 0);

        // Route to dashboard
        navigateTo("dashboard-employer");
    }
}

// Dynamic Job matching engine based on candidate registered skills tags
function renderMatchedJobs(candidateSkills) {
    const listPh = document.getElementById("seeker-jobs-list");
    listPh.innerHTML = "";

    // Score jobs from database against candidate skills (simple Jaccard / inclusion logic)
    const scoredJobs = globalJobsDb.map(job => {
        let matchesCount = 0;
        job.tags.forEach(tag => {
            const hasSkill = candidateSkills.some(skill => skill.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(skill.toLowerCase()));
            if (hasSkill) matchesCount++;
        });

        // Compute match percentage
        let score = 50 + Math.round((matchesCount / Math.max(job.tags.length, 1)) * 48); // Baseline 50%, scales to 98%
        if (score > 98) score = 98;
        return { ...job, score };
    }).sort((a, b) => b.score - a.score);

    scoredJobs.forEach(job => {
        const itemCard = document.createElement("div");
        itemCard.className = "list-item-card";
        
        let tagsHtml = "";
        job.tags.forEach(t => {
            tagsHtml += `<span class="tag">${t}</span> `;
        });

        itemCard.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-avatar"><i class="fa-solid fa-briefcase"></i></div>
                <div class="list-item-details">
                    <h4>${job.title}</h4>
                    <p>${job.company} • ${job.location} • Compensation: $${job.salary}/yr</p>
                    <div style="margin-top:8px;">${tagsHtml}</div>
                </div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                <span class="tag tag-highlight" style="font-weight:700;">Score Match: ${job.score}%</span>
                <button class="btn btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="applyFromDashboard(this, '${job.title}', '${job.company}')">Quick Apply</button>
            </div>
        `;
        listPh.appendChild(itemCard);
    });
}

// Candidate applies to a job role directly from their dashboard match
function applyFromDashboard(buttonEl, jobTitle, company) {
    buttonEl.disabled = true;
    buttonEl.style.opacity = "0.5";
    buttonEl.textContent = "Applied";

    triggerToast("Application Sent", `Your vetted profile has been dispatched to the hiring board at ${company} for ${jobTitle}.`);

    // Increment interviews count in overview dashboard cards as feedback
    const interviewsVal = document.getElementById("seeker-active-interviews");
    const count = parseInt(interviewsVal.textContent) || 0;
    interviewsVal.textContent = `${count + 1} Active`;
}

// 10. Dashboard tab switcher
function switchDashboardTab(role, tabKey) {
    // de-activate menu items
    const menuItems = document.querySelectorAll(`#dashboard-${role}-section .dashboard-menu-item`);
    menuItems.forEach(item => {
        if (item.getAttribute("onclick").includes(tabKey)) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // switch panels
    const panels = document.querySelectorAll(`#dashboard-${role}-section .dashboard-main-area .dashboard-content-panel`);
    panels.forEach(panel => {
        if (panel.id === `${role}-tab-${tabKey}`) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });
}

// Employer schedules candidate interview mock
function scheduleInterview(candidateName) {
    triggerToast("Interview Set", `Invitation email with calendar invites dispatched to ${candidateName}.`);
}

// Employer posts a new job mock
function handlePostJob(event) {
    event.preventDefault();
    const title = document.getElementById("new-job-title").value;
    const salary = Number(document.getElementById("new-job-salary").value).toLocaleString();
    const skillsRaw = document.getElementById("new-job-skills").value;

    const newJob = {
        title,
        company: activeSession ? activeSession.company : "Innovate Corp",
        salary,
        location: "Remote / Hybrid",
        tags: skillsRaw.split(",").map(s => s.trim())
    };

    // Add to database
    globalJobsDb.unshift(newJob);

    triggerToast("Position Indexed", `Vetted role '${title}' published. Recruiting engines started matching algorithms.`);
    
    // Clear form and go back to overview tab
    event.target.reset();
    
    // Increment active postings metric count
    const openingsCount = document.getElementById("employer-openings-count");
    const matches = openingsCount.textContent.match(/\d+/);
    const count = matches ? parseInt(matches[0]) : 0;
    openingsCount.textContent = `${count + 1} Active`;

    switchDashboardTab("employer", "home");
}

// 11. Sign Out Session Controller
function logoutSession() {
    activeSession = null;
    triggerToast("Session Ended", "You have signed out from Thagadur workspace portal successfully.");
    
    // Route back to home
    navigateTo("home");
}

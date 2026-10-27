const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme || "dark";

document.documentElement.dataset.theme = initialTheme;

const updateThemeToggle = (theme) => {
  if (!themeToggle) {
    return;
  }

  const isDark = theme === "dark";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
};

updateThemeToggle(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeToggle(nextTheme);
});

const floatingContact = document.querySelector(".floating-contact");
const floatingContactToggle = document.querySelector(".floating-contact-toggle");
const floatingContactMenu = document.querySelector("#floating-contact-menu");
const floatingContactClose = document.querySelector(".floating-contact-close");

const setContactMenuOpen = (isOpen) => {
  if (!floatingContactToggle || !floatingContactMenu) {
    return;
  }

  floatingContactMenu.hidden = !isOpen;
  floatingContactToggle.setAttribute("aria-expanded", String(isOpen));
  floatingContactToggle.setAttribute(
    "aria-label",
    isOpen ? "Close contact menu" : "Open contact menu"
  );
  floatingContactToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i><span>Close</span>'
    : '<i class="fa-solid fa-comment-dots" aria-hidden="true"></i><span>Contact</span>';
};

if (floatingContact && floatingContactToggle && floatingContactMenu) {
  floatingContact.addEventListener("click", (event) => {
    const clickedToggle = event.target.closest(".floating-contact-toggle");

    if (clickedToggle) {
      setContactMenuOpen(floatingContactMenu.hidden);
    }
  });

  floatingContactClose?.addEventListener("click", () => {
    setContactMenuOpen(false);
    floatingContactToggle.focus();
  });

  floatingContactMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setContactMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!floatingContact.contains(event.target)) {
      setContactMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !floatingContactMenu.hidden) {
      setContactMenuOpen(false);
      floatingContactToggle.focus();
    }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.innerHTML =
        '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });
  });
}

const featuredProject = document.querySelector("#featured-project");

if (featuredProject) {
  const projects = {
    hooyo: {
      label: "01 / E-commerce concept",
      title: "HOOYO · Skincare E-commerce Concept",
      sidebarDescription:
        "A Somali-inspired skincare e-commerce concept focused on product discovery.",
      description:
        "A Somali-inspired skincare brand and online store concept focused on product discovery, clean design, and an intuitive shopping experience.",
      image: "images/hooyo_skincare.png",
      alt: "HOOYO Somali botanical skincare e-commerce website concept",
      icon: "fa-solid fa-leaf",
      tags: ["UI/UX", "HTML5", "CSS3", "Responsive"],
      primaryLabel: "Case Study",
      primaryHref: "#contact",
      sourceHref: "https://github.com/isibrahiim",
    },
    python: {
      label: "02 / Programming portfolio",
      title: "Python Programming Projects",
      sidebarDescription:
        "A collection of Python exercises and practical applications.",
      description:
        "A collection of Python exercises and practical applications demonstrating problem solving, automation, and programming fundamentals.",
      image: "images/python.jpg",
      alt: "Python programming projects",
      icon: "fa-brands fa-python",
      tags: ["Python", "Automation", "Problem solving"],
      primaryLabel: "View projects",
      primaryHref: "https://github.com/isibrahiim",
      sourceHref: "https://github.com/isibrahiim",
    },
    community: {
      label: "03 / Community concept",
      title: "Community",
      sidebarDescription:
        "A web application concept for local events, groups, and conversations.",
      description:
        "A web application concept for local events, groups, and conversations designed to help people connect with their neighborhoods.",
      image: "images/community.jpg",
      alt: "Community web application concept",
      icon: "fa-solid fa-users",
      tags: ["JavaScript", "UI/UX", "Web application"],
      primaryLabel: "View concept",
      primaryHref: "#contact",
      sourceHref: "https://github.com/isibrahiim",
    },
  };

  const image = document.querySelector("#featured-project-image");
  const label = document.querySelector("#featured-project-label");
  const title = document.querySelector("#featured-project-title");
  const description = document.querySelector("#featured-project-description");
  const tags = document.querySelector("#featured-project-tags");
  const primaryLink = document.querySelector("#featured-project-primary-link");
  const sourceLink = document.querySelector("#featured-project-source-link");
  const sidebar = document.querySelector("#project-sidebar");
  const mobileLayout = window.matchMedia("(max-width: 768px)");

  const renderSidebar = (activeProjectId, isMobile = mobileLayout.matches) => {
    if (!sidebar) {
      return;
    }

    sidebar.replaceChildren(
      ...Object.entries(projects)
        .filter(
          ([projectId]) => projectId !== activeProjectId
        )
        .map(([projectId, project]) => {
          const article = document.createElement("article");
          article.className = "sidebar-project";
          article.innerHTML = isMobile
            ? `
            <div class="sidebar-project-card">
              <span class="sidebar-project-image">
                <img src="${project.image}" alt="${project.alt}">
                <span class="sidebar-project-icon"><i class="${project.icon}" aria-hidden="true"></i></span>
              </span>
              <span class="sidebar-project-label">${project.label}</span>
              <span class="sidebar-project-title">${project.title}</span>
              <span class="sidebar-project-description">${project.sidebarDescription}</span>
              <span class="sidebar-project-actions">
                <a class="project-button" href="${project.primaryHref}">${project.primaryLabel}</a>
                <a class="project-button" href="${project.sourceHref}" target="_blank"
                  rel="noopener noreferrer">Source</a>
              </span>
            </div>
          `
            : `
            <button type="button" class="sidebar-project-selector" data-project="${projectId}"
              aria-label="Show ${project.title}" aria-controls="featured-project">
              <span class="sidebar-project-image">
                <img src="${project.image}" alt="">
                <span class="sidebar-project-icon"><i class="${project.icon}" aria-hidden="true"></i></span>
              </span>
              <span class="sidebar-project-label">${project.label}</span>
              <span class="sidebar-project-title">${project.title}</span>
              <span class="sidebar-project-description">${project.sidebarDescription}</span>
              <span class="sidebar-link">Show featured project <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
            </button>
          `;
          return article;
        })
    );
  };

  const selectProject = (projectId, force = false) => {
    if (mobileLayout.matches && !force) {
      return;
    }

    const project = projects[projectId];

    if (!project || !image || !label || !title || !description || !tags ||
        !primaryLink || !sourceLink) {
      return;
    }

    image.src = project.image;
    image.alt = project.alt;
    label.textContent = project.label;
    title.textContent = project.title;
    description.textContent = project.description;
    primaryLink.textContent = project.primaryLabel;
    primaryLink.href = project.primaryHref;
    sourceLink.href = project.sourceHref;
    tags.replaceChildren(
      ...project.tags.map((tag) => {
        const item = document.createElement("li");
        item.textContent = tag;
        return item;
      })
    );

    renderSidebar(projectId);
  };

  sidebar?.addEventListener("click", (event) => {
    const selector = event.target.closest("[data-project]");

    if (selector) {
      selectProject(selector.dataset.project);
    }
  });

  renderSidebar("hooyo");
  mobileLayout.addEventListener("change", () => {
    if (mobileLayout.matches) {
      selectProject("hooyo", true);
    } else {
      renderSidebar("hooyo");
    }
  });
}

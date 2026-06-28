const translations = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact" },
    hero: {
      title: "ABDULRAHMAN ALENEZI",
      subtitle: "Tech Enthusiast & Full Stack Developer",
      bio: "A tech and computer networks enthusiast whose programming journey began in 2019. I am always keen to keep pace with rapid technological advancements and continuously develop my skills with the latest technologies, aiming to build and manage advanced infrastructures and systems.",
      cta: "View My Work",
      cv: "CV",
      cvLink: "pdf/Abdulrahman_Alenezi_EN-CV.pdf",
      blog: "Blog",
    },
    projects: {
      title: "Selected Works",
      source: "Source Code",
      link: "Live Link",
      items: {
        // incube: {
        //     title: "0xInCube",
        //     desc: "Website to support the Arabic community in sharing experience. (Work In Progress)"
        // },
        call: {
          title: "Private Call App WebRTC",
          desc: "A private local video communication program designed and operated at the Technical College in Medina.",
        },
        gold: {
          title: "Gold Store Management",
          desc: "App for gold stores to manage customer data and export as PDF.",
        },
        college: {
          title: "College Network Graduation",
          desc: "Graduation project for the field of networks: a secure network that supports many protocols.",
        },
        atraltamayuz: {
          title: "ATR Management Consulting",
          desc: "A leading strategic partner in providing management consulting, building institutional capacity, and creating a sustainable impact for organizations in the for-profit and non-profit sectors.",
        },
      },
      tags: {
        community: "Community",
        education: "Education",
        tool: "Tool",
        converter: "Converter",
        management: "Management",
        pdf: "PDF",
      },
    },
    about: {
      title: "About Me",
      timeline:
        "<strong>2019 - 2026:</strong> Comfortable working with popular programming languages, with experience delivering projects both independently and as part of a team.",
      skills: { network: "Network & OS", dev: "Development" },
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Interested in working together? Drop me a line.",
      cta: "Say Hello",
    },
    footer: {
      copyright: "© 2026 abdr501. All rights reserved.",
    },
  },
  ar: {
    nav: { work: "أعمالي", about: "حول", contact: "تواصل معي" },
    hero: {
      title: "عبدالرحمن العنزي",
      subtitle: "شغوف بالتقنية ومطور شامل",
      bio: "مهتم وشغوف بالتقنية وشبكات الحاسب، بدأت رحلتي في عالم البرمجة عام 2019. أحرص دائماً على مواكبة التطور التقني السريع وتطوير مهاراتي باستمرار مع أحدث التقنيات، بهدف بناء وإدارة بنى تحتية وأنظمة متطورة.",
      cta: "شاهد أعمالي",
      cv: "السيرة الذاتية",
      cvLink: "pdf/Abdulrahman_Alenezi_AR-CV.pdf",
      blog: "المدونة",
    },
    projects: {
      title: "أعمال مختارة",
      source: "الكود المصدري",
      link: "رابط مباشر",
      items: {
        // incube: {
        //     title: "0xInCube",
        //     desc: "موقع لدعم المجتمع العربي في تبادل الخبرات. (قيد التنفيذ)"
        // },
        call: {
          title: "Private Call App WebRTC",
          desc: "برنامج اتصال محلي خاص مرئي تم تصميمه وتشغيله في الكلية التقنية بالمدينة المنورة.",
        },
        gold: {
          title: "Gold Store Management",
          desc: "تطبيق لمحلات الذهب لإدارة بيانات العملاء والتصدير كملف PDF.",
        },
        college: {
          title: "College Network Graduation",
          desc: "مشروع تخرج في مجال الشبكات: شبكة آمنة تدعم العديد من البروتوكولات.",
        },
        atraltamayuz: {
          title: "أطر التميز",
          desc: "شريكًا استراتيجيًا رائدًا في تقديم الاستشارات الإدارية، وبناء القدرات المؤسسية، وصناعة الأثر المستدام للمنظمات في القطاعين الربحي وغير الربحي.",
        },
      },
      tags: {
        community: "مجتمع",
        education: "تعليم",
        tool: "أداة",
        converter: "محول",
        management: "إدارة",
        pdf: "بي دي اف",
      },
    },
    about: {
      title: "عني",
      timeline:
        "<strong>2019 - 2026:</strong> متمكن من العمل باستخدام لغات البرمجة الشائعة، ولديه خبرة في تنفيذ المشاريع سواء بشكل مستقل أو ضمن فريق عمل.",
      skills: { network: "الشبكات وأنظمة التشغيل", dev: "البرمجة والتطوير" },
    },
    contact: {
      title: "لنتواصل",
      subtitle: "هل أنت مهتم بالعمل معاً؟ راسلني.",
      cta: "قل مرحباً",
    },
    footer: {
      copyright: "© 2026 abdr501. جميع الحقوق محفوظة.",
    },
  },
};
const projectsData = [
  // {
  //     id: 'incube',
  //     tags: ['community', 'education', '2025'],
  //     sourceLink: '#',
  //     liveLink: '#',
  // },
  {
    id: "call",
    tags: ["Call", "WEB", "2025"],
    images: [
      "images/private-call-app-webrtc/s1.png",
      "images/private-call-app-webrtc/s2.png",
    ],
  },
  {
    id: "gold",
    tags: ["Management", "PDF", "WEB", "2024"],
    sourceLink: "https://github.com/abdr501/gold-app",
    liveLink: "https://abdr501.github.io/gold-app/src",
    images: [
      "images/gold-store-management/s1.png",
      "images/gold-store-management/s2.png",
      "images/gold-store-management/s3.png",
    ],
  },
  {
    id: "college",
    tags: ["Networking", "PKT", "2026"],
    sourceLink:
      "https://github.com/abdr501/TVTC-College-Computer-Networks-Graduation",
    images: [
      "images/college-project/s1.png",
      "images/college-project/s2.png",
      "images/college-project/s3.png",
      "images/college-project/s4.png",
    ],
  },
  {
    id: "atraltamayuz",
    tags: ["Framer", "UI/UX", "2026"],
    liveLink: "https://atraltamayuz.com",
    images: [
      "images/atr-management/s1.png",
      "images/atr-management/s2.png",
      "images/atr-management/s3.png",
      "images/atr-management/s4.png",
    ],
  },
];

const socialLinksData = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdulrahman-alenezi",
    ariaLabel: "LinkedIn",
    icon: "LinkedIn",
  },
  {
    name: "GitHub",
    url: "https://github.com/abdr501",
    ariaLabel: "GitHub",
    icon: "GitHub",
  },
  // {
  //     name: 'X/Twitter',
  //     url: 'https://twitter.com/abdr501',
  //     ariaLabel: 'Twitter',
  //     icon: 'X/Twitter'
  // },
  // {
  //     name: 'Instagram',
  //     url: 'https://instagram.com/abdr501',
  //     ariaLabel: 'Instagram',
  //     icon: 'Instagram'
  // },
  {
    name: "YouTube",
    url: "https://youtube.com/@abdr501",
    ariaLabel: "YouTube",
    icon: "YouTube",
  },
  // {
  //     name: 'Twitch',
  //     url: 'https://twitch.tv/abdr501',
  //     ariaLabel: 'Twitch',
  //     icon: 'Twitch',
  //     style: 'margin-left: 1rem;'
  // }
];
const contactConfig = {
  email: "abdulrahman.alenezi.0x@gmail.com",
};

document.addEventListener("DOMContentLoaded", () => {
  // Language Toggle
  const langToggle = document.getElementById("lang-toggle");
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Load saved preference
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  setTheme(savedTheme);

  renderSocialLinks();
  renderContactEmail();

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const currentLang = html.getAttribute("lang") || "en";
      const newLang = currentLang === "en" ? "ar" : "en";
      setLanguage(newLang);
    });
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Close menu when clicking links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.classList.remove("active");
      navLinks?.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  function setLanguage(lang) {
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang);

    renderProjects(lang);

    if (langToggle) {
      langToggle.textContent = lang === "ar" ? "English" : "العربية";
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const keys = key.split(".");
      let value = translations[lang];
      keys.forEach((k) => {
        if (value) value = value[k];
      });

      if (value) {
        // Check if content has HTML (like strong tags)
        if (el.innerHTML.includes("<") || value.includes("<")) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const keys = key.split(".");
      let value = translations[lang];

      keys.forEach((k) => {
        if (value) value = value[k];
      });

      if (value) {
        if (el.innerHTML.includes("<") || value.includes("<")) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    const cvBtn = document.getElementById("cv-btn");
    if (cvBtn) {
      cvBtn.href = translations[lang].hero.cvLink;
    }
  }

  function renderProjects(lang) {
    const grid = document.querySelector(".projects-grid");
    if (!grid) return;

    const t = translations[lang].projects;
    const tagTranslations = t.tags;

    grid.innerHTML = projectsData
      .map((project) => {
        const item = t.items[project.id];
        const tagsHtml = project.tags
          .map((tag) => {
            const tagLabel = tagTranslations[tag] || tag;
            return `<span class="tag">${tagLabel}</span>`;
          })
          .join("");

        let linksHtml = "";
        if (project.sourceLink) {
          linksHtml += `<a href="${project.sourceLink}" class="btn btn-sm" target="_blank">${t.source}</a>`;
        }
        if (project.liveLink) {
          linksHtml += `<a href="${project.liveLink}" class="btn btn-sm" target="_blank">${t.link}</a>`;
        }

        const sliderHtml = `
			<div class="project-slider">

					<div class="slider-wrapper">
							<img src="${project.images[0]}" class="slider-image">
					</div>

					${
            project.images.length > 1
              ? `
							<button class="slider-btn prev">❮</button>
							<button class="slider-btn next">❯</button>

							<div class="slider-thumbnails">
									${project.images
                    .map(
                      (img, index) => `
											<img
													src="${img}"
													class="slider-thumb ${index === 0 ? "active" : ""}"
													data-index="${index}"
											>
									`,
                    )
                    .join("")}
							</div>
							`
              : ""
          }

			</div>
			`;

        console.log(item);

        return `
                <article class="project-card fade-in">
										${sliderHtml}

                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-desc">${item.desc}</p>

                    <div class="tags">${tagsHtml}</div>

                    ${linksHtml ? `<div class="project-links">${linksHtml}</div>` : ""}
                </article>
            `;
      })
      .join("");

    // Re-apply observer to new cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    grid.querySelectorAll(".project-card").forEach((card) => {
      observer.observe(card);
    });

    grid.querySelectorAll(".project-card").forEach((card, index) => {
      const project = projectsData[index];

      if (!project.images || project.images.length <= 1) return;

      let current = 0;

      const image = card.querySelector(".slider-image");
      const thumbs = card.querySelectorAll(".slider-thumb");

      function updateSlider(newIndex) {
        image.classList.add("changing");

        setTimeout(() => {
          current = newIndex;

          image.src = project.images[current];

          thumbs.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === current);
          });

          image.classList.remove("changing");
        }, 150);
      }

      card.querySelector(".next").addEventListener("click", () => {
        let next = current + 1;

        if (next >= project.images.length) next = 0;

        updateSlider(next);
      });

      card.querySelector(".prev").addEventListener("click", () => {
        let prev = current - 1;

        if (prev < 0) prev = project.images.length - 1;

        updateSlider(prev);
      });

      thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => {
          if (i !== current) updateSlider(i);
        });
      });
    });
  }

  function renderSocialLinks() {
    const container = document.querySelector(".social-links");
    if (!container) return;

    container.innerHTML = socialLinksData
      .map(
        (link) => `
            <a href="${link.url}"
               class="social-link"
               target="_blank"
               aria-label="${link.ariaLabel}"
               ${link.style ? `style="${link.style}"` : ""}>
               ${link.icon}
            </a>
        `,
      )
      .join("");
  }

  function renderContactEmail() {
    const contactBtn = document.getElementById("contact-email-btn");
    if (contactBtn) {
      contactBtn.href = `mailto:${contactConfig.email}`;
    }
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Simple scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".project-card, h2, .hero-content")
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
});

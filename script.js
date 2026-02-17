const translations = {
    en: {
        nav: { work: "Work", about: "About", contact: "Contact" },
        hero: {
            title: "ABDULRAHMAN ALENEZI",
            subtitle: "Tech Enthusiast & Full Stack Developer",
            bio: "A 21 year old Saudi tech enthusiast with over 7 years of programming experience and a passion for networking. Dedicated to supporting the Arab community in the world of technology.",
            cta: "View My Work",
            blog: "Blog"
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
                ascii: {
                    title: "ASCII art to code",
                    desc: "A tool to convert ASCII text art into code strings."
                },
                gold: {
                    title: "Gold Store Management",
                    desc: "App for gold stores to manage customer data and export as PDF."
                }
            },
            tags: {
                community: "Community",
                education: "Education",
                tool: "Tool",
                converter: "Converter",
                management: "Management",
                pdf: "PDF"
            }
        },
        about: {
            title: "About Me",
            timeline: "<strong>2019 - 2026:</strong> Flexible with popular programming languages, controlling projects alone and with teams.",
            skills: { network: "Network & OS", dev: "Development" }
        },
        contact: {
            title: "Let's Connect",
            subtitle: "Interested in working together? Drop me a line.",
            cta: "Say Hello"
        },
        footer: {
            copyright: "© 2026 abdr501. All rights reserved."
        }
    },
    ar: {
        nav: { work: "أعمالي", about: "حول", contact: "تواصل معي" },
        hero: {
            title: "عبدالرحمن العنزي",
            subtitle: "شغوف بالتقنية ومطور شامل",
            bio: "شاب سعودي عمري 21 سنة، لدي شغف كبير بالتقنية وخبرة تزيد عن 7 سنوات في البرمجة والشبكات. مكرس جهودي لدعم المجتمع العربي في عالم التكنولوجيا.",
            cta: "شاهد أعمالي",
            blog: "المدونة"
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
                ascii: {
                    title: "ASCII art to code",
                    desc: "أداة لتحويل فن ASCII إلى نصوص برمجية."
                },
                gold: {
                    title: "Gold Store Management",
                    desc: "تطبيق لمحلات الذهب لإدارة بيانات العملاء والتصدير كملف PDF."
                }
            },
            tags: {
                community: "مجتمع",
                education: "تعليم",
                tool: "أداة",
                converter: "محول",
                management: "إدارة",
                pdf: "بي دي اف"
            }
        },
        about: {
            title: "عني",
            timeline: "<strong>2019 - 2026:</strong> مرونة عالية في لغات البرمجة الشائعة، وإدارة المشاريع بشكل مستقل أو ضمن فرق عمل.",
            skills: { network: "الشبكات وأنظمة التشغيل", dev: "البرمجة والتطوير" }
        },
        contact: {
            title: "لنتواصل",
            subtitle: "هل أنت مهتم بالعمل معاً؟ راسلني.",
            cta: "قل مرحباً"
        },
        footer: {
            copyright: "© 2026 abdr501. جميع الحقوق محفوظة."
        }
    }
};
const projectsData = [
    // {
    //     id: 'incube',
    //     tags: ['community', 'education', '2025'],
    //     sourceLink: '#',
    //     liveLink: '#',
    // },
    {
        id: 'ascii',
        tags: ['tool', 'converter'],
        sourceLink: 'https://github.com/abdr501/Local-web-ascii-to-code',
        liveLink: 'https://abdr501.github.io/Local-web-ascii-to-code/',
    },
    {
        id: 'gold',
        tags: ['management', 'pdf', '2024'],
        sourceLink: 'https://github.com/abdr501/gold-app',
        liveLink: 'https://abdr501.github.io/gold-app/src/',
    }
];

const socialLinksData = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/abdulrahman-alenezi',
        ariaLabel: 'LinkedIn',
        icon: 'LinkedIn'
    },
    {
        name: 'GitHub',
        url: 'https://github.com/abdr501',
        ariaLabel: 'GitHub',
        icon: 'GitHub'
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
        name: 'YouTube',
        url: 'https://youtube.com/@abdr501',
        ariaLabel: 'YouTube',
        icon: 'YouTube'
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
    email: 'abdulrahman.alenezi.0x@gmail.com'
};

document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved preference
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    setTheme(savedTheme);

    renderSocialLinks();
    renderContactEmail();

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = html.getAttribute('lang') || 'en';
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    function setLanguage(lang) {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('lang', lang);

        renderProjects(lang);

        if (langToggle) {
            langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];
            keys.forEach(k => { if (value) value = value[k]; });

            if (value) {
                // Check if content has HTML (like strong tags)
                if (el.innerHTML.includes('<') || value.includes('<')) {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }
        });
    }

    function renderProjects(lang) {
        const grid = document.querySelector('.projects-grid');
        if (!grid) return;

        const t = translations[lang].projects;
        const tagTranslations = t.tags;

        grid.innerHTML = projectsData.map(project => {
            const item = t.items[project.id];
            const tagsHtml = project.tags.map(tag => {
                const tagLabel = tagTranslations[tag] || tag;
                return `<span class="tag">${tagLabel}</span>`;
            }).join('');

            let linksHtml = '';
            if (project.sourceLink) {
                linksHtml += `<a href="${project.sourceLink}" class="btn btn-sm" target="_blank">${t.source}</a>`;
            }
            if (project.liveLink) {
                linksHtml += `<a href="${project.liveLink}" class="btn btn-sm" target="_blank">${t.link}</a>`;
            }

            return `
                <article class="project-card fade-in">
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-desc">${item.desc}</p>
                    <div class="tags">${tagsHtml}</div>
                    ${linksHtml ? `<div class="project-links">${linksHtml}</div>` : ''}
                </article>
            `;
        }).join('');

        // Re-apply observer to new cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        grid.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }

    function renderSocialLinks() {
        const container = document.querySelector('.social-links');
        if (!container) return;

        container.innerHTML = socialLinksData.map(link => `
            <a href="${link.url}" 
               class="social-link" 
               target="_blank" 
               aria-label="${link.ariaLabel}"
               ${link.style ? `style="${link.style}"` : ''}>
               ${link.icon}
            </a>
        `).join('');
    }

    function renderContactEmail() {
        const contactBtn = document.getElementById('contact-email-btn');
        if (contactBtn) {
            contactBtn.href = `mailto:${contactConfig.email}`;
        }
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, h2, .hero-content').forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

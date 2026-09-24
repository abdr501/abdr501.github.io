const POSTS_INDEX = "posts.json";

const postsGrid = document.getElementById("posts-grid");
const postView = document.getElementById("post-view");
const blogList = document.getElementById("blog-list");
const postHeader = document.getElementById("post-header");
const postContent = document.getElementById("post-content");
const postToc = document.getElementById("post-toc");
const recommendedPosts = document.getElementById("recommended-posts");
const recommendedPostsGrid = document.getElementById("recommended-posts-grid");

function escapeHtml(value = "") {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatDate(value) {
    if (!value) return "";

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

function postUrl(slug) {
    return `blog.html?post=${encodeURIComponent(slug)}`;
}

function getLocalizedPost(post, lang = currentLanguage) {
    if (!post) return null;
    return post[lang] || post.en || post.ar || post;
}

function renderPostCards(posts, container) {
    if (!container) return;

    container.innerHTML = posts.map((post) => {
        const localized = getLocalizedPost(post);
        if (!localized) return "";
        return `
        <article class="post-card">
            <div class="post-card-meta">
                ${localized.date ? `<span>${escapeHtml(formatDate(localized.date))}</span>` : ""}
                ${localized.readingTime ? `<span class="post-card-reading-time" data-minutes="${escapeHtml(String(localized.readingTime))}">${escapeHtml(localized.readingTime)} ${escapeHtml(getTranslation("blog.minRead"))}</span>` : ""}
            </div>
            <h2>${escapeHtml(localized.title)}</h2>
            ${localized.description ? `<p>${escapeHtml(localized.description)}</p>` : ""}
            ${renderTags(localized.tags || post.tags || [])}
            <a class="post-card-link" href="${postUrl(post.slug)}">${escapeHtml(getTranslation("blog.readPost"))}</a>
        </article>
    `;
    }).join("");
}

function renderRecommendedPosts(posts, currentPost) {
    if (!recommendedPosts || !recommendedPostsGrid) return;

    const others = posts.filter((post) => post.slug !== currentPost.slug);
    if (!others.length) {
        recommendedPosts.hidden = true;
        return;
    }

    const currentTags = new Set(currentPost.tags || []);
    const ranked = [...others].sort((a, b) => {
        const aShared = (a.tags || []).filter((tag) => currentTags.has(tag)).length;
        const bShared = (b.tags || []).filter((tag) => currentTags.has(tag)).length;
        if (aShared !== bShared) return bShared - aShared;
        return (b.date || "").localeCompare(a.date || "");
    });

    const available = ranked.filter((post) => getLocalizedPost(post));
    renderPostCards(available.slice(0, 3), recommendedPostsGrid);
    recommendedPosts.hidden = !available.length;
}

function renderPosts(posts) {
    if (!posts.length) {
        postsGrid.innerHTML = `<p>${escapeHtml(getTranslation("blog.noPosts"))}</p>`;
        return;
    }

    renderPostCards(posts, postsGrid);
}

function renderTags(tags = []) {
    if (!tags.length) return "";

    return `
        <div class="post-tags">
            ${tags.map((tag) => `<span class="post-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
    `;
}

function resolveRelativeAssets(markdown, markdownPath) {
    const base = markdownPath.slice(0, markdownPath.lastIndexOf("/") + 1);

    markdown = markdown.replace(
        /(!\[[^\]]*\]\()((?!https?:\/\/|\/|#)[^)]+)(\))/g,
        (_, prefix, path, suffix) => `${prefix}${new URL(path, new URL(base, window.location.href)).href}${suffix}`,
    );

    markdown = markdown.replace(
        /(?<!\!)\[([^\]]+)\]\((?!https?:\/\/|\/|#)([^)]+)\)/g,
        (_, text, path) => `[${text}](${new URL(path, new URL(base, window.location.href)).href})`,
    );

    return markdown;
}

function parseFrontMatter(markdown) {
    const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) {
        return { meta: {}, content: markdown };
    }

    const meta = {};

    for (const line of match[1].split("\n")) {
        const separator = line.indexOf(":");
        if (separator === -1) continue;

        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();

        if ((value.startsWith("[") && value.endsWith("]"))) {
            value = value
                .slice(1, -1)
                .split(",")
                .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
                .filter(Boolean);
        } else {
            value = value.replace(/^['"]|['"]$/g, "");
        }

        meta[key] = value;
    }

    return {
        meta,
        content: markdown.slice(match[0].length),
    };
}

function getTitleFromMarkdown(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : "Untitled Post";
}

function calculateReadingTime(text) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

async function loadHighlightJs() {
    if (window.hljs) return window.hljs;

    await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    if (!window.hljs || typeof window.hljs.highlightElement !== "function") {
        throw new Error("Syntax highlighting library could not be loaded.");
    }

    return window.hljs;
}

function highlightCodeBlocks(hljs) {
    if (!hljs || typeof hljs.highlightElement !== "function") {
        return;
    }

    postContent.querySelectorAll("pre code").forEach((block) => {
        // Marked adds classes such as language-javascript/language-python.
        if (block.className.includes("language-")) {
            hljs.highlightElement(block);
        } else {
            // Automatically detect code when the Markdown block has no language.
            block.innerHTML = hljs.highlightAuto(block.textContent).value;
            block.classList.add("hljs");
        }
    });
}

async function loadMarked() {
    if (window.marked) return window.marked;

    await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    return window.marked;
}

async function loadPosts() {
    const response = await fetch(POSTS_INDEX, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Unable to load ${POSTS_INDEX}`);

    const posts = await response.json();
    return posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function slugifyHeading(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function buildPostToc() {
    if (!postToc) return;

    const headings = [...postContent.querySelectorAll("h2, h3")];
    if (!headings.length) {
        postToc.innerHTML = "";
        postToc.parentElement?.classList.add("is-empty");
        return;
    }

    postToc.parentElement?.classList.remove("is-empty");
    const usedIds = new Set();

    headings.forEach((heading) => {
        let id = slugifyHeading(heading.textContent || "section") || "section";
        const base = id;
        let counter = 2;
        while (usedIds.has(id)) id = `${base}-${counter++}`;
        usedIds.add(id);
        heading.id = id;
    });

    postToc.innerHTML = headings.map((heading) => `
        <a class="toc-link toc-${heading.tagName.toLowerCase()}" href="#${encodeURIComponent(heading.id)}">
            ${escapeHtml(heading.textContent || "")}
        </a>
    `).join("");

    postToc.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = document.getElementById(decodeURIComponent(link.getAttribute("href").slice(1)));
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${target?.id || ""}`);
        });
    });
}

function setupTocObserver() {
    if (!postToc) return;

    const headings = [...postContent.querySelectorAll("h2, h3")];
    if (!headings.length) return;

    const links = [...postToc.querySelectorAll("a")];
    let ticking = false;

    const setActiveHeading = () => {
        const activationLine = window.innerHeight * 0.22;
        let activeHeading = headings[0];

        for (const heading of headings) {
            if (heading.getBoundingClientRect().top <= activationLine) {
                activeHeading = heading;
            } else {
                break;
            }
        }

        links.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${activeHeading.id}`,
            );
        });

        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(setActiveHeading);
            ticking = true;
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    setActiveHeading();
}

async function openPost(post) {
    try {
        const localizedPost = getLocalizedPost(post);
        if (!localizedPost) throw new Error(`No ${currentLanguage} version is available for this post.`);

        window.__currentPost = post;
        const response = await fetch(localizedPost.path);
        if (!response.ok) throw new Error(`Unable to load ${localizedPost.path}`);

        const rawMarkdown = await response.text();
        const { meta, content } = parseFrontMatter(rawMarkdown);
        const title = meta.title || localizedPost.title || getTitleFromMarkdown(content);
        const date = meta.date || localizedPost.date || post.date || "";
        const tags = Array.isArray(meta.tags) ? meta.tags : (localizedPost.tags || post.tags || []);
        const description = meta.description || localizedPost.description || "";

        const marked = await loadMarked();
        const hljs = await loadHighlightJs().catch(() => null);
        const markdown = resolveRelativeAssets(content, localizedPost.path);

        postHeader.innerHTML = `
            <h1>${escapeHtml(title)}</h1>
            <div class="post-header-meta">
                ${date ? `<span>${escapeHtml(formatDate(date))}</span>` : ""}
                <span>${calculateReadingTime(content)} min read</span>
            </div>
            ${description ? `<p class="post-description">${escapeHtml(description)}</p>` : ""}
            ${renderTags(tags)}
        `;

        postContent.innerHTML = marked.parse(markdown);
        highlightCodeBlocks(hljs);
        renderRecommendedPosts(window.__blogPosts || [], post);
        buildPostToc();
        setupTocObserver();
        blogList.hidden = true;
        postView.hidden = false;
        document.title = `${title} — Abdulrahman Alenezi`;
        window.scrollTo({ top: 0, behavior: "instant" });
    } catch (error) {
        postHeader.innerHTML = "<h1>Unable to open post</h1>";
        postContent.innerHTML = `<div class="post-error">${escapeHtml(error.message)}</div>`;
        blogList.hidden = true;
        postView.hidden = false;
    }
}

function getRequestedSlug() {
    return new URLSearchParams(window.location.search).get("post");
}

const blogTranslations = {
    en: {
        nav: { home: "Home", work: "Work", blog: "Blog", about: "About", contact: "Contact" },
        blog: {
            eyebrow: "BLOG",
            title: "Notes, projects & things I learn.",
            description: "Technical notes and write-ups written in Markdown.",
            readPost: "Read post →",
            minRead: "min read",
            back: "← Back to Blog",
            noPosts: "No posts yet.",
            onThisPage: "ON THIS PAGE",
            recommendedEyebrow: "RECOMMENDED",
            recommendedTitle: "Recommended Posts",
            unable: "Unable to open post",
        },
    },
    ar: {
        nav: { home: "الرئيسية", work: "أعمالي", blog: "المدونة", about: "عني", contact: "تواصل معي" },
        blog: {
            eyebrow: "المدونة",
            title: "ملاحظاتي ومشاريعي وما أتعلمه.",
            description: "ملاحظات وكتابات تقنية أكتبها باستخدام Markdown.",
            readPost: "قراءة المقال ←",
            minRead: "دقيقة قراءة",
            back: "→ العودة إلى المدونة",
            noPosts: "لا توجد مقالات حالياً.",
            onThisPage: "في هذه الصفحة",
            recommendedEyebrow: "مقترحة لك",
            recommendedTitle: "مقالات مقترحة",
            unable: "تعذر فتح المقال",
        },
    },
};

let currentLanguage = localStorage.getItem("lang") || "en";

function getTranslation(path) {
    return path.split(".").reduce((value, key) => value?.[key], blogTranslations[currentLanguage]);
}

function setLanguage(lang) {
    currentLanguage = lang === "ar" ? "ar" : "en";
    localStorage.setItem("lang", currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = getTranslation(element.dataset.i18n);
        if (value) element.textContent = value;
    });

    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
        langToggle.textContent = currentLanguage === "ar" ? "English" : "العربية";
    }

    if (window.__blogPosts?.length) {
        const requestedSlug = getRequestedSlug();
        const currentPost = requestedSlug
            ? window.__blogPosts.find((post) => post.slug === requestedSlug)
            : null;

        if (currentPost) {
            openPost(currentPost);
        } else {
            renderPosts(window.__blogPosts);
        }
    }
}

function renderPostsLanguage() {
    document.querySelectorAll(".post-card-link").forEach((element) => {
        element.textContent = getTranslation("blog.readPost");
    });

    document.querySelectorAll(".post-card-reading-time").forEach((element) => {
        const minutes = element.dataset.minutes;
        element.textContent = `${minutes} ${getTranslation("blog.minRead")}`;
    });
}

function setupControls() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle?.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks?.classList.toggle("active");
        document.body.style.overflow = navLinks?.classList.contains("active") ? "hidden" : "";
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle?.classList.remove("active");
            navLinks?.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("lang-toggle");
    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme);
    setLanguage(currentLanguage);

    themeToggle?.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(currentTheme === "light" ? "dark" : "light");
    });

    langToggle?.addEventListener("click", () => {
        setLanguage(currentLanguage === "en" ? "ar" : "en");
    });
}

function setTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    const button = document.getElementById("theme-toggle");
    if (button) {
        button.textContent = nextTheme === "dark" ? "☀️" : "🌙";
        button.setAttribute("aria-label", nextTheme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
}

async function initBlog() {
    setupControls();

    try {
        const posts = await loadPosts();
        window.__blogPosts = posts;
        const slug = getRequestedSlug();
        const requestedPost = slug ? posts.find((post) => post.slug === slug) : null;

        if (requestedPost) {
            await openPost(requestedPost);
            return;
        }

        if (slug) {
            throw new Error(`Post "${slug}" was not found.`);
        }

        renderPosts(posts);
    } catch (error) {
        postsGrid.innerHTML = `<div class="post-error">${escapeHtml(error.message)}</div>`;
    }
}

document.addEventListener("DOMContentLoaded", initBlog);

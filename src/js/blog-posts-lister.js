document.addEventListener("DOMContentLoaded", function () {
    const blogItems = document.querySelectorAll('.blog-item');
    console.log(`Found ${blogItems.length} blog items`);
    Array.from(blogItems).forEach(blogItem => {
        const linkElement = getBlogItemLinkElement(blogItem);
        if (!linkElement) return;

        // Reduce heading levels within the blog item
        reduceHeadingLevels(blogItem);

        // Apply the link to the blog item and remove the link element
        const href = linkElement.getAttribute('href');
        linkElement.style.display = 'none';
        wrapBlogItemWithLink(blogItem, href);
    });
});

function getBlogItems() {
    return document.querySelectorAll('.blog-item');
}

/**
 * The first element of the blog item is an <a> tag to the blog post subdocument.
 * This function returns that <a> element.
 * @param {Element} blogItem - The blog item element.
 * @returns {Element} - The <a> element of the blog item.
 */
function getBlogItemLinkElement(blogItem) {
    return blogItem.querySelector('.blog-item-content').firstChild;
}

/**
 * Wraps the blog item with an anchor element linking to the specified href.
 * @param {Element} blogItem - The blog item element.
 * @param {string} href - The URL to link to.
 */
function wrapBlogItemWithLink(blogItem, href) {
    const anchor = document.createElement('a');
    anchor.className = 'blog-item-link-wrapper';
    anchor.href = href;
    anchor.appendChild(blogItem.cloneNode(true));
    blogItem.parentElement.appendChild(anchor);
    blogItem.remove();
}

/**
 * Maps h1-h4 heading levels to h3-h6 within the blog item content.
 */
function reduceHeadingLevels(blogItem) {
    console.log('Reducing heading levels in blog item');
    const increase = 2;
    const minLevel = 1;
    const maxLevel = 4;
    const headings = Array.from(blogItem.querySelectorAll('h1, h2, h3, h4'));
    headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        if (level >= minLevel && level <= maxLevel) {
            console.log(`Reducing heading level: ${heading.tagName} to h${level + increase}`);
            const newHeading = document.createElement(`h${level + increase}`);
            newHeading.innerHTML = heading.innerHTML;
            Array.from(heading.attributes).forEach(attr => {
                newHeading.setAttribute(attr.name, attr.value);
            });
            heading.parentNode.replaceChild(newHeading, heading);
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const blogItems = document.querySelectorAll('.blog-item');
    Array.from(blogItems).forEach(blogItem => {
        const linkElement = getBlogItemLinkElement(blogItem);
        if (!linkElement) return;

        // Apply href to blog item and remove the link element
        const href = linkElement.getAttribute('href');
        blogItem.style.cursor = 'pointer';
        blogItem.addEventListener('click', () => window.location.href = href);
        linkElement.style.display = 'none';
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

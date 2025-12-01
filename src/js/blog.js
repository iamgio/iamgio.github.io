document.addEventListener("DOMContentLoaded", function () {
    const blogItems = document.querySelectorAll('.blog-item');
    Array.from(blogItems).forEach(blogItem => {
        const linkElement = getBlogItemLinkElement(blogItem);
        const blogDate = getBlogItemDate(linkElement);

        const dateElement = createBlogItemDateElement(blogDate);
        blogItem.insertBefore(dateElement, blogItem.firstChild);
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
    return blogItem.querySelector('a:first-child');
}

/**
 * The first element of the blog item is an <a> tag, whose text content is: "YYYY-MM-DD-title".
 * This function extracts the date from that text content and returns it as a Date object.
 * @param {Element} blogItemLinkElement - The <a> element of the blog item.
 * @returns {Date} - The date of the blog item.
 */
function getBlogItemDate(blogItemLinkElement) {
    const dateString = blogItemLinkElement.textContent.split('-').slice(0, 3).join('-');
    return new Date(dateString);
}

function createBlogItemDateElement(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const dateElement = document.createElement('div');
    dateElement.className = 'blog-item-date';
    dateElement.textContent = formattedDate;
    return dateElement;
}
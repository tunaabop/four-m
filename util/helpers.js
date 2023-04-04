module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  get_image: () => {
    return `<img class="post-image"
    src="/upload/sample_post_2.jpeg"
    alt="Best Websites for Coding">`;
  },
};

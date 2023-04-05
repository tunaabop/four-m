module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  get_image: (image_path) => {
    const img_src = "../controllers/upload/" +image_path;
    return `<img id="post-image"
    src="${img_src}"
    alt="Best Websites for Coding">`;
  },
};

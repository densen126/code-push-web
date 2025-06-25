const MarkdownIt = require('markdown-it');
const fm = require('front-matter');

const md = new MarkdownIt({
    html: true,
    linkify: true,
});

module.exports = function markdownLoader(source) {
    this.cacheable && this.cacheable();

    const frontmatter = fm(source);
    frontmatter.attributes.html = md.render(frontmatter.body);

    const result = `module.exports = ${JSON.stringify(frontmatter.attributes)};`;
    this.callback(null, result);
};


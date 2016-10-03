(() => {
  const $title = document.querySelector('.js-issue-title');
  if (!$title) {
    return;
  }

  chrome.storage.local.get('inlineLinks', (options) => {
    let title = $title.innerHTML.replace(/(<a[^>]+>|⬆︎|<\/a>)/g, '');

    title.match(/#\d+(?=[\],\s\d#]*\])/g).forEach((tag) => {
      const url = `https://www.pivotaltracker.com/story/show/${tag.match(/\d+/)}`;
      const attrs = `href="${url}" target="_blank"`;

      const replacement = options.inlineLinks === false ?
        `${tag}<a ${attrs}>⬆︎</a>` :
        `<a ${attrs}>${tag}</a>`;

      title = title.replace(tag, replacement);
    });

    $title.innerHTML = title;
  });
})();

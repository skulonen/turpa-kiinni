const sheet = new CSSStyleSheet();
sheet.replaceSync(
  ":is(ytd-player, ytmusic-player):has(.ad-showing) video { filter: blur(100px); }"
);
document.adoptedStyleSheets.push(sheet);

function poll() {
  for (const el of document.querySelectorAll(
    ":is(ytd-player, ytmusic-player):has(.ad-showing) video:not([original-muted])"
  )) {
    el.setAttribute("original-muted", el.muted.toString());
    el.muted = true;
  }

  for (const el of document.querySelectorAll(
    ":is(ytd-player, ytmusic-player):not(:has(.ad-showing)) video[original-muted]"
  )) {
    const originalMuted = el.getAttribute("original-muted");
    el.muted =
      originalMuted == "true" ? true :
      originalMuted == "false" ? false :
      el.muted;
    el.removeAttribute("original-muted");
  }
}

setInterval(poll, 500);
poll();

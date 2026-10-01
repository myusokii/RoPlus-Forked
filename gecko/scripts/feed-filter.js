/**
 * XHR interceptor for Roblox omni-recommendation feed filtering.
 * Reads config from data attributes on <html> element.
 * Injected at document_start before Roblox's JS loads.
 *
 * Modes per section: "disabled" = remove, "lower" = move to end, absent = default (no change)
 */
(function () {
  var root = document.documentElement;
  var tp = root.getAttribute('data-roplus-tp') || '';
  var sg = root.getAttribute('data-roplus-sg') || '';
  var sp = root.getAttribute('data-roplus-sp') || '';

  window.__roplusFeedFilter = true;

  // Map topic names to their mode ('disabled' or 'lower')
  var topicModes = {};
  if (tp) topicModes["Today's Picks"] = tp;
  if (sg) topicModes["Standout Games"] = sg;
  if (sp) topicModes["Sponsored"] = sp;

  function filterSorts(sorts) {
    var normal = [];
    var lowered = [];
    for (var i = 0; i < sorts.length; i++) {
      var mode = topicModes[sorts[i].topic];
      if (mode === 'disabled') continue;
      if (mode === 'lower') { lowered.push(sorts[i]); continue; }
      normal.push(sorts[i]);
    }
    return normal.concat(lowered);
  }

  var origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (typeof url === "string" && url.includes("omni-recommendation") && method.toUpperCase() === "POST") {
      this._rpIntercept = true;
    }
    return origOpen.apply(this, arguments);
  };

  var origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function () {
    if (this._rpIntercept) {
      this.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          try {
            var data = JSON.parse(this.responseText);
            if (data.sorts && Array.isArray(data.sorts)) {
              data.sorts = filterSorts(data.sorts);
              var filtered = JSON.stringify(data);
              Object.defineProperty(this, "responseText", { value: filtered, writable: false, configurable: true });
              Object.defineProperty(this, "response", { value: filtered, writable: false, configurable: true });
              window.dispatchEvent(new CustomEvent("roplus-feed-filtered"));
            }
          } catch (e) { }
        }
      });
    }
    return origSend.apply(this, arguments);
  };
})();

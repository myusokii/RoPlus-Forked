/**
 * Join Private Server Script
 * Runs in page context to access Roblox.GameLauncher for private server joins
 * Parameters are passed via data attributes on the script element
 */
(function() {
  var script = document.currentScript;
  if (!script) return;

  var placeId = parseInt(script.getAttribute('data-place-id'), 10);
  var accessCode = script.getAttribute('data-access-code');

  if (!placeId || !accessCode) {
    console.error('[RoPlus] Missing placeId or accessCode');
    return;
  }

  // Try Roblox's native GameLauncher
  if (window.Roblox && window.Roblox.GameLauncher) {
    var joinAttemptId;
    try {
      if (window.Roblox.GameLauncher.isJoinAttemptIdEnabled && window.Roblox.GameLauncher.isJoinAttemptIdEnabled()) {
        joinAttemptId = crypto.randomUUID();
      }
    } catch (e) {
      // Ignore if isJoinAttemptIdEnabled doesn't exist
    }

    // Try joinPrivateGame if available
    if (window.Roblox.GameLauncher.joinPrivateGame) {
      window.Roblox.GameLauncher.joinPrivateGame(
        placeId,
        accessCode,
        joinAttemptId
      );
      return;
    }
  }

  // Fallback: navigate to game page with private server link code
  window.location.href = 'https://www.roblox.com/games/' + placeId + '?privateServerLinkCode=' + accessCode;
})();

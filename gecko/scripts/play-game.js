/**
 * Play Game Script
 * Runs in page context to access Roblox.GameLauncher for playing without specific server
 * Parameters are passed via data attributes on the script element
 */
(function() {
  // Get parameters from the script element's data attributes
  var script = document.currentScript;
  if (!script) return;

  var placeId = parseInt(script.getAttribute('data-place-id'), 10);

  if (!placeId) {
    console.error('[RoPlus] Missing placeId');
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

    // Try joinMultiplayerGame first (standard play button method)
    if (window.Roblox.GameLauncher.joinMultiplayerGame) {
      window.Roblox.GameLauncher.joinMultiplayerGame(
        placeId,
        false,
        false,
        joinAttemptId
      );
    }
    // Fallback to followPlayerIntoGame with empty player (lets Roblox pick server)
    else if (window.Roblox.GameLauncher.followPlayerIntoGame) {
      window.Roblox.GameLauncher.followPlayerIntoGame(
        placeId,
        joinAttemptId
      );
    }
    // Last resort - use deep link
    else {
      window.location.href = 'roblox://placeId=' + placeId;
    }
  } else {
    // Fallback to deep link
    window.location.href = 'roblox://placeId=' + placeId;
  }
})();

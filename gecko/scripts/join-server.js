/**
 * Join Server Script
 * Runs in page context to access Roblox.GameLauncher
 * Parameters are passed via data attributes on the script element
 */
(function() {
  // Get parameters from the script element's data attributes
  var script = document.currentScript;
  if (!script) return;

  var placeId = parseInt(script.getAttribute('data-place-id'), 10);
  var serverId = script.getAttribute('data-server-id');

  if (!placeId || !serverId) {
    console.error('[RoPlus] Missing placeId or serverId');
    return;
  }

  // Try Roblox's native GameLauncher first
  if (window.Roblox && window.Roblox.GameLauncher && window.Roblox.GameLauncher.joinGameInstance) {
    var joinAttemptId;
    try {
      if (window.Roblox.GameLauncher.isJoinAttemptIdEnabled && window.Roblox.GameLauncher.isJoinAttemptIdEnabled()) {
        joinAttemptId = crypto.randomUUID();
      }
    } catch (e) {
      // Ignore if isJoinAttemptIdEnabled doesn't exist
    }

    window.Roblox.GameLauncher.joinGameInstance(
      placeId,
      serverId,
      false,
      false,
      serverId,
      joinAttemptId
    );
  } else {
    // Fallback to deep link
    window.location.href = 'roblox://experiences/start?placeId=' + placeId + '&gameInstanceId=' + serverId;
  }
})();

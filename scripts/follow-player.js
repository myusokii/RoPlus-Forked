/**
 * Follow Player Script
 * Runs in page context to join a friend's game using Roblox's native follow system
 * This handles fallback to any available server if the friend's server is unavailable
 */
(function() {
  var script = document.currentScript;
  if (!script) return;

  var userId = parseInt(script.getAttribute('data-user-id'), 10);
  var gameId = script.getAttribute('data-game-id') || '';

  if (!userId) {
    console.error('[RoPlus] Missing userId for follow');
    return;
  }

  // Use Roblox's native followPlayerIntoGame
  if (window.Roblox && window.Roblox.ProtocolHandlerClientInterface &&
      typeof window.Roblox.ProtocolHandlerClientInterface.followPlayerIntoGame === 'function') {
    window.Roblox.ProtocolHandlerClientInterface.followPlayerIntoGame({
      userId: userId,
      joinAttemptId: gameId,
      joinAttemptOrigin: 'JoinUser'
    });
  } else if (window.Roblox && window.Roblox.GameLauncher &&
             typeof window.Roblox.GameLauncher.followPlayerIntoGame === 'function') {
    // Fallback to GameLauncher.followPlayerIntoGame
    window.Roblox.GameLauncher.followPlayerIntoGame(userId, gameId, 'JoinUser');
  } else {
    console.error('[RoPlus] Could not find Roblox follow player function');
  }
})();

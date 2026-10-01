/**
 * Game Launcher Hook
 * Intercepts Roblox.GameLauncher calls to detect game joins
 * Injected into page context to access Roblox's internal objects
 */
(function() {
  'use strict';

  // Wait for Roblox.GameLauncher to be available
  function waitForGameLauncher(callback, maxAttempts = 100) {
    let attempts = 0;
    const check = () => {
      attempts++;
      if (window.Roblox && window.Roblox.GameLauncher) {
        callback();
      } else if (attempts < maxAttempts) {
        setTimeout(check, 100);
      }
    };
    check();
  }

  function hookGameLauncher() {
    const GameLauncher = window.Roblox.GameLauncher;

    // Hook joinGameInstance (used when joining specific server)
    const originalJoinGameInstance = GameLauncher.joinGameInstance;
    if (typeof originalJoinGameInstance === 'function') {
      GameLauncher.joinGameInstance = function(placeId, gameInstanceId, ...args) {
        window.dispatchEvent(new CustomEvent('roplus-game-join', {
          detail: {
            type: 'specific',
            placeId: parseInt(placeId, 10),
            serverId: gameInstanceId,
            timestamp: Date.now()
          }
        }));
        return originalJoinGameInstance.call(this, placeId, gameInstanceId, ...args);
      };
    }

    // Hook joinMultiplayerGame (used by native Play button)
    // Always use 'matchmaking' type since server assignment happens on Roblox's backend
    // The Presence API will be polled to get the actual server ID after joining
    const originalJoinMultiplayerGame = GameLauncher.joinMultiplayerGame;
    if (typeof originalJoinMultiplayerGame === 'function') {
      GameLauncher.joinMultiplayerGame = function(placeId, ...args) {
        window.dispatchEvent(new CustomEvent('roplus-game-join', {
          detail: {
            type: 'matchmaking',
            placeId: parseInt(placeId, 10),
            serverId: null,
            timestamp: Date.now()
          }
        }));
        return originalJoinMultiplayerGame.call(this, placeId, ...args);
      };
    }
  }

  // Initialize hooks when GameLauncher is ready
  waitForGameLauncher(hookGameLauncher);
})();

/**
 * Start Chat Script
 * Runs in page context to access Roblox's chat system
 * Parameters are passed via data attributes on the script element
 */
(function() {
  var script = document.currentScript;
  if (!script) return;

  var userId = parseInt(script.getAttribute('data-user-id'), 10);
  if (!userId) {
    console.error('[RoPlus] Missing userId for chat');
    return;
  }

  // Use Roblox's native chat service
  var chatService = window.Roblox && window.Roblox['core-scripts'] &&
                    window.Roblox['core-scripts'].util &&
                    window.Roblox['core-scripts'].util.chat;

  if (chatService && typeof chatService.startDesktopAndMobileWebChat === 'function') {
    chatService.startDesktopAndMobileWebChat({ userId: userId });
  } else {
    console.error('[RoPlus] Could not find Roblox chat service');
  }
})();

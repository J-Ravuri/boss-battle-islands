(function () {
  function initSounds() {
    if (!window.audioManager || typeof window.audioManager.loadSound !== 'function') return;

    const sounds = {
      walk: 'assets/sounds/walk.mp3',
      attack: 'assets/sounds/attack.mp3',
      collect: 'assets/sounds/collect.mp3',
      battle_start: 'assets/sounds/battle_start.mp3',
      level_complete: 'assets/sounds/level_complete.mp3',
      jump: 'assets/sounds/jump.mp3',
      hit: 'assets/sounds/hit.mp3',
      damage: 'assets/sounds/damage.mp3'
    };

    Object.entries(sounds).forEach(([name, url]) => {
      window.audioManager.loadSound(name, url);
    });

    window.audioManager.loadSettings();
    setupSoundTriggers();
  }

  function setupSoundTriggers() {
    if (typeof window.playSound !== 'function') return;
    const originalPlaySound = window.playSound;
    window.playSound = function (kind) {
      return originalPlaySound(kind);
    };
  }

  window.initSounds = initSounds;
  window.setupSoundTriggers = setupSoundTriggers;
})();

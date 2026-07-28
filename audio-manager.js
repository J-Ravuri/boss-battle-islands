(function () {
  class AudioManager {
    constructor() {
      this.sounds = {};
      this.isMuted = false;
      this.soundVolume = 1.0;
      this.createAudioSettings();
    }

    createAudioSettings() {
      if (document.getElementById('audio-toggle')) return;

      const audioToggle = document.createElement('div');
      audioToggle.id = 'audio-toggle';
      audioToggle.setAttribute('aria-label', 'Audio settings');
      audioToggle.style.position = 'fixed';
      audioToggle.style.top = '16px';
      audioToggle.style.right = '16px';
      audioToggle.style.zIndex = '1001';
      audioToggle.style.display = 'flex';
      audioToggle.style.alignItems = 'center';
      audioToggle.style.justifyContent = 'center';
      audioToggle.style.padding = '6px';
      audioToggle.style.borderRadius = '999px';
      audioToggle.style.background = 'rgba(255, 255, 255, 0.82)';
      audioToggle.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.18)';
      audioToggle.style.backdropFilter = 'blur(6px)';

      const button = document.createElement('button');
      button.id = 'mute-btn';
      button.type = 'button';
      button.textContent = '🔊';
      button.setAttribute('aria-label', 'Mute sound');
      button.style.border = 'none';
      button.style.background = 'transparent';
      button.style.cursor = 'pointer';
      button.style.fontSize = '22px';
      button.style.padding = '4px';
      button.addEventListener('click', () => this.toggleMute());

      audioToggle.appendChild(button);
      document.body.appendChild(audioToggle);
    }

    syncButton() {
      const button = document.getElementById('mute-btn');
      if (!button) return;
      button.textContent = this.isMuted ? '🔇' : '🔊';
      button.setAttribute('aria-label', this.isMuted ? 'Enable sound' : 'Mute sound');
    }

    applySoundState() {
      const currentState = typeof soundEnabled === 'boolean' ? soundEnabled : true;
      const desiredState = !this.isMuted;
      if (typeof window.toggleSound === 'function' && currentState !== desiredState) {
        window.toggleSound();
      } else if (typeof soundEnabled === 'boolean') {
        soundEnabled = desiredState;
      }
      if (typeof window.updateSoundButton === 'function') {
        window.updateSoundButton();
      }
      this.syncButton();
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.applySoundState();
      try {
        localStorage.setItem('bossBattleIslands_audioMuted', JSON.stringify(this.isMuted));
      } catch (error) {
        console.warn('Audio preference could not be saved.', error);
      }
    }

    loadSettings() {
      try {
        const savedMute = localStorage.getItem('bossBattleIslands_audioMuted');
        if (savedMute !== null) {
          this.isMuted = JSON.parse(savedMute);
        }
      } catch (error) {
        console.warn('Audio preference could not be loaded.', error);
      }
      this.applySoundState();
    }

    playSound(soundName, volume = 1.0) {
      if (this.isMuted) return;
      const currentSoundEnabled = typeof soundEnabled === 'boolean' ? soundEnabled : true;
      if (!currentSoundEnabled) return;

      if (typeof window.playSound === 'function') {
        window.playSound(soundName);
        return;
      }

      if (!this.sounds[soundName]) {
        this.loadSound(soundName, null);
      }

      const sound = this.sounds[soundName];
      if (!sound) return;
      sound.volume = volume * this.soundVolume;
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }

    loadSound(name, url) {
      if (!name) return;
      if (this.sounds[name]) return;
      if (!url) {
        this.sounds[name] = null;
        return;
      }
      try {
        const audio = new Audio(url);
        audio.preload = 'auto';
        this.sounds[name] = audio;
      } catch (error) {
        console.warn(`Sound ${name} could not be loaded.`, error);
        this.sounds[name] = null;
      }
    }
  }

  window.AudioManager = AudioManager;
  window.audioManager = new AudioManager();
})();

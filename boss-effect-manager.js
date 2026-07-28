(function () {
  class BossEffectManager {
    constructor() {
      this.screenShakeIntensity = 0;
      this.shakeDuration = 0;
      this.damageFlash = null;
      this.particleSystems = [];
      this.shaking = false;
    }

    screenShake(intensity = 0.5, duration = 0.5) {
      this.screenShakeIntensity = intensity;
      this.shakeDuration = duration;

      if (typeof camera === 'undefined' || this.shaking) return;

      this.shaking = true;
      const originalPosition = camera.position.clone();
      const startTime = performance.now();

      const shakeInterval = setInterval(() => {
        const elapsed = (performance.now() - startTime) / 1000;
        if (elapsed >= duration) {
          clearInterval(shakeInterval);
          camera.position.copy(originalPosition);
          this.shaking = false;
          return;
        }

        const offsetX = (Math.random() - 0.5) * intensity * 2;
        const offsetY = (Math.random() - 0.5) * intensity * 2;
        camera.position.x = originalPosition.x + offsetX;
        camera.position.y = originalPosition.y + offsetY;
      }, 50);
    }

    damageFlash() {
      if (!this.damageFlash) {
        this.damageFlash = document.createElement('div');
        this.damageFlash.style.position = 'fixed';
        this.damageFlash.style.top = '0';
        this.damageFlash.style.left = '0';
        this.damageFlash.style.width = '100%';
        this.damageFlash.style.height = '100%';
        this.damageFlash.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        this.damageFlash.style.pointerEvents = 'none';
        this.damageFlash.style.opacity = '0';
        this.damageFlash.style.zIndex = '999';
        document.body.appendChild(this.damageFlash);
      }

      this.damageFlash.style.opacity = '0.7';
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => {
        this.damageFlash.style.opacity = '0';
      }, 120);
    }

    createHitParticles(x, y, color = '#ff6b35') {
      const particleCount = 16;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '998';
        particle.style.opacity = '1';
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        let particleTime = 0;
        const particleInterval = setInterval(() => {
          particleTime += 0.05;
          if (particleTime > 1) {
            clearInterval(particleInterval);
            if (particle.parentNode) particle.parentNode.removeChild(particle);
            return;
          }

          particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
          particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
          particle.style.opacity = `${1 - particleTime}`;
        }, 50);
      }
    }
  }

  window.BossEffectManager = BossEffectManager;
  window.bossEffectManager = new BossEffectManager();
})();

(function () {
  class EnhancedMovementController {
    constructor() {
      this.isJumping = false;
      this.jumpHeight = 2;
      this.jumpVelocity = 0;
      this.gravity = 0.5;
      this.onGround = true;
      this.jumpCooldown = 0;
      this.isSprinting = false;
      this.sprintSpeed = 1.5;
      this.baseGroundY = 0;
      this.setupJumpControls();
    }

    getAvatar() {
      if (typeof hero !== 'undefined' && hero) return hero;
      if (typeof player !== 'undefined' && player) return player;
      return null;
    }

    setupJumpControls() {
      document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !this.isJumping && this.onGround && this.jumpCooldown <= 0) {
          event.preventDefault();
          this.jump();
        }
      });

      const jumpButton = document.createElement('button');
      jumpButton.id = 'jump-btn';
      jumpButton.textContent = 'JUMP';
      jumpButton.type = 'button';
      jumpButton.style.position = 'fixed';
      jumpButton.style.bottom = '20px';
      jumpButton.style.right = '20px';
      jumpButton.style.width = '78px';
      jumpButton.style.height = '78px';
      jumpButton.style.borderRadius = '50%';
      jumpButton.style.background = 'rgba(255, 152, 0, 0.85)';
      jumpButton.style.color = '#fff';
      jumpButton.style.zIndex = '1000';
      jumpButton.style.border = 'none';
      jumpButton.style.cursor = 'pointer';
      jumpButton.style.fontSize = '12px';
      jumpButton.style.fontWeight = '800';
      jumpButton.style.display = (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches)
        ? 'flex'
        : 'none';
      jumpButton.style.alignItems = 'center';
      jumpButton.style.justifyContent = 'center';
      jumpButton.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
      jumpButton.style.touchAction = 'manipulation';
      jumpButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (!this.isJumping && this.onGround && this.jumpCooldown <= 0) this.jump();
      });
      jumpButton.addEventListener('mousedown', (event) => {
        event.preventDefault();
        if (!this.isJumping && this.onGround && this.jumpCooldown <= 0) this.jump();
      });
      document.body.appendChild(jumpButton);
    }

    jump() {
      const avatar = this.getAvatar();
      if (!avatar || !this.onGround || this.isJumping || this.jumpCooldown > 0) return;

      this.isJumping = true;
      this.jumpVelocity = 7.2;
      this.onGround = false;
      this.jumpCooldown = 0.6;
      this.baseGroundY = avatar.position.y;

      if (typeof window.audioManager?.playSound === 'function') {
        window.audioManager.playSound('jump');
      } else if (typeof window.playSound === 'function') {
        window.playSound('start');
      }

      this.addJumpEffect();
    }

    addJumpEffect() {
      const avatar = this.getAvatar();
      if (!avatar) return;

      const jumpEffect = document.createElement('div');
      jumpEffect.style.position = 'fixed';
      jumpEffect.style.width = '22px';
      jumpEffect.style.height = '22px';
      jumpEffect.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
      jumpEffect.style.borderRadius = '50%';
      jumpEffect.style.left = '50%';
      jumpEffect.style.top = '50%';
      jumpEffect.style.pointerEvents = 'none';
      jumpEffect.style.zIndex = '100';
      jumpEffect.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(jumpEffect);

      let effectTime = 0;
      const effectInterval = setInterval(() => {
        effectTime += 0.05;
        if (effectTime > 0.5) {
          clearInterval(effectInterval);
          if (jumpEffect.parentNode) jumpEffect.parentNode.removeChild(jumpEffect);
          return;
        }

        jumpEffect.style.width = `${22 + effectTime * 40}px`;
        jumpEffect.style.height = `${22 + effectTime * 40}px`;
        jumpEffect.style.opacity = `${1 - effectTime}`;
      }, 50);
    }

    update(deltaTime) {
      const avatar = this.getAvatar();
      if (!avatar) return;

      if (this.isJumping) {
        this.jumpVelocity -= this.gravity;
        avatar.position.y += this.jumpVelocity * deltaTime;

        if (avatar.position.y <= this.baseGroundY) {
          avatar.position.y = this.baseGroundY;
          this.isJumping = false;
          this.onGround = true;
          this.jumpVelocity = 0;
        }
      } else {
        this.onGround = true;
      }

      if (this.jumpCooldown > 0) {
        this.jumpCooldown -= deltaTime;
      }
    }
  }

  window.EnhancedMovementController = EnhancedMovementController;
  window.movementController = new EnhancedMovementController();
})();

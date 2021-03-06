class Player {

  constructor(level, sound, x = 2, y = 2, direction = 0) {
    this.level = level;
    this.sound = sound;
    this.walking = false;
    this.linearVelocity = 0.05;
    this.angularVelocity = Math.PI / 48;
    this.CIRCLE = 2 * Math.PI;
    this.HALF_PI = Math.PI / 2;
    this.position = { x, y, direction };
  }

  setWalking(state) {
    if (state && !this.walking) {
      this.walking = true;
      this.sound.playFootsteps();
    }

    if (!state && this.walking) {
      this.walking = false;
      this.sound.stopFootsteps();
    }
  }

  moveForward() {
    const x = this.position.x + Math.cos(this.position.direction) * this.linearVelocity;
    const y = this.position.y + Math.sin(this.position.direction) * this.linearVelocity;

    if (this.level.isEmpty(x, y)) Object.assign(this.position, { x, y });
    else if (this.level.isEmpty(x, this.position.y)) Object.assign(this.position, { x });
    else if (this.level.isEmpty(this.position.x, y)) Object.assign(this.position, { y });
  }

  moveBackward() {
    const x = this.position.x - Math.cos(this.position.direction) * this.linearVelocity;
    const y = this.position.y - Math.sin(this.position.direction) * this.linearVelocity;

    if (this.level.isEmpty(x, y)) Object.assign(this.position, { x, y });
    else if (this.level.isEmpty(x, this.position.y)) Object.assign(this.position, { x });
    else if (this.level.isEmpty(this.position.x, y)) Object.assign(this.position, { y });
  }

  turnLeft() {
    this.position.direction += this.angularVelocity + this.CIRCLE;
    this.position.direction %= this.CIRCLE;
  }

  turnRight() {
    this.position.direction -= this.angularVelocity - this.CIRCLE;
    this.position.direction %= this.CIRCLE;
  }

  strafeLeft() {
    const angle = this.position.direction + this.HALF_PI;
    const x = this.position.x + Math.cos(angle) * this.linearVelocity;
    const y = this.position.y + Math.sin(angle) * this.linearVelocity;

    if (this.level.isEmpty(x, y)) Object.assign(this.position, { x, y });
    else if (this.level.isEmpty(x, this.position.y)) Object.assign(this.position, { x });
    else if (this.level.isEmpty(this.position.x, y)) Object.assign(this.position, { y });
  }

  strafeRight() {
    const angle = this.position.direction - this.HALF_PI;
    const x = this.position.x + Math.cos(angle) * this.linearVelocity;
    const y = this.position.y + Math.sin(angle) * this.linearVelocity;

    if (this.level.isEmpty(x, y)) Object.assign(this.position, { x, y });
    else if (this.level.isEmpty(x, this.position.y)) Object.assign(this.position, { x });
    else if (this.level.isEmpty(this.position.x, y)) Object.assign(this.position, { y });
  }

}

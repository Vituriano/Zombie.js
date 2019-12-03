class Player {
  constructor({ PlayerID }) {
    this.player = document.querySelector(`#${PlayerID}`)
    this.controls = this.player.querySelector('.controls')
    this.play = this.controls.querySelector('.play')
    this.pause = this.controls.querySelector('.pause')
    this.next = this.controls.querySelector('.next')
    this.prev = this.controls.querySelector('.prev')
    this.audio = this.player.querySelector('audio')
    this.bar = this.player.querySelector('.progressBar')
    this.barCurrent = this.player.querySelector('.bar-current')
    this.ball = this.player.querySelector('.ball')
    this.time = this.player.querySelector('.time')
    this.handleEventListeners();
  }
  handleEventListeners() {
    this.play.addEventListener('click', () => {
      this.audio.play();
      this.play.style.display = 'none';
      this.pause.style.display = 'inline-block';
    })

    this.pause.addEventListener('click', () => {
      this.audio.pause();
      this.pause.style.display = 'none';
      this.play.style.display = 'inline-block';
    })

    this.next.addEventListener('click', () => {
      this.audio.currentTime += 10;
    })

    this.prev.addEventListener('click', () => {
      this.audio.currentTime -= 10;
    })

    this.audio.addEventListener('timeupdate', () => {
      const {
        currentTime,
        duration
      } = this.audio
      this.barCurrent.style.width = `${(currentTime / duration) * 100}%`
      this.ball.style.marginLeft = `${(currentTime / duration) * 100}%`
      this.time.innerHTML = `${Math.floor(currentTime/60)}:${Math.floor(currentTime%60)} / ${Math.floor(duration/60)}:${Math.floor(duration%60)}`;
    })

    this.bar.addEventListener('click', () => {
      const bar = this.bar.getBoundingClientRect();
      const x = event.clientX;
      const progress = Math.round(((x - bar.left) / (bar.right - bar.left)) * 100);
      console.log(progress);
      this.audio.currentTime = (progress * this.audio.duration) / 100;
    })
  }
}

const zombie = new Player({ PlayerID: 'zombie' });
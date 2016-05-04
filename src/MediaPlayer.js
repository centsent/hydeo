import FullScreenApi from './utils/FullScreenApi';
import Hls from 'hls.js';

const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;

/**
 *
 * Expose api to control media.
 *
 */
export default class MediaPlayer {

  constructor(media, container) {
    this.media = media;
    this.container = container;

    this.togglePlay = this.togglePlay.bind(this);
  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  togglePlay() {
    if (this.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  }

  requestFullScreen() {
    FullScreenApi.request(this.container);
  }

  exitFullScreen() {
    FullScreenApi.exit();
  }

  toggleFullScreen() {
    if (this.isFullScreen) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen();
    }
  }

  mute() {
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }

  seek(time) {
    this.media.currentTime = time;
  }

  changeSource(source) {
    if (this.media.src !== source) {
      this.media.src = source;
    }

    if (HLS_EXTENSIONS.test(source) && Hls.isSupported()) {
      const hls = new Hls({
        defaultAudioCodec: 'avc1.42E01E, mp4a.40.2',
      });
      hls.loadSource(source);
      hls.attachMedia(this.media);
      this._hls = hls;
    }
  }

  _destroyHls() {
    if (this._hls) this._hls.destroy();
  }

  /**
   * Switch the audio/video to muted whether is not muted or vice verse.
   */
  toggleVolume() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  get isMuted() {
    return this.media.muted;
  }

  set volume(volume) {
    this.media.volume = volume;
  }

  get volume() {
    return this.media.volume;
  }

  get isPaused() {
    return this.media.paused;
  }

  get isPlayed() {
    return !this.isPaused;
  }

  get isAutoPlay() {
    return this.media.autoplay;
  }

  get isFullScreen() {
    return FullScreenApi.isFullScreen();
  }

  get isEnded() {
    return this.media.isEnded;
  }

  get buffered() {
    return this.media.buffered;
  }

  _update() {
    const media = this.media;
    const buffered = this.buffered;
    const duration = media.duration;

    this.duration = duration;
    this.currentTime = media.currentTime;
    this.percentagePlayed = this.currentTime / this.duration * 100;
    this.percentageBuffered = buffered.length && buffered.end(buffered.length - 1) / duration * 100;
  }

}

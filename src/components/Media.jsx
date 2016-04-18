import React, { Component } from 'react';
import Hls from 'hls.js';
import { propTypes, defaultProps } from '../props';
import MediaPlayer from '../MediaPlayer';

const AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/;

export default class Media extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    const media = this.refs.media;
    this.MediaPlayer = new MediaPlayer(media, this.props);
    if (HLS_EXTENSIONS.test(this.props.src) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.props.src);
      hls.attachMedia(media);
      // hls.on(Hls.Events.MANIFEST_PARSED, () => media.play());
    }
  }

  render() {
    const Player = AUDIO_EXTENSIONS.test(this.props.src) ? 'audio' : 'video';

    return <Player ref="media" {...this.props} />;
  }
}
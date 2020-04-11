import APP_DEFAULTS from '../constants/defaults';

const Sound = {
  emitSound : () => {
    var utterMessage = new SpeechSynthesisUtterance(APP_DEFAULTS.soundMessage);
    window.speechSynthesis.speak(utterMessage);
  }
}

export default Sound;
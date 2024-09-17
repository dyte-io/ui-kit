declare global {
  interface Document {
    webkitCurrentFullScreenElement: HTMLElement;
    mozExitFullScreen: () => void;
    webkitExitFullscreen: () => void;
    msExitFullscreen: () => void;
  }
  interface HTMLElement {
    webkitRequestFullscreen: () => void;
    mozRequestFullScreen: () => void;
    msRequestFullscreen: () => void;
  }
}

export {};

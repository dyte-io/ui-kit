function getDeniedSteps({ osName, browserName, media }) {
  function getDevice() {
    if (media === 'audio') return 'Microphone';
    if (media === 'video') return 'Camera';
    return 'Screenshare';
  }

  if (browserName === 'Chrome') {
    return [
      'Open Chrome browser settings by clicking the three dots at the top right.',
      'Select Settings, Under Privacy and Security, click Site Settings, navigate to Permissions.',
      `Choose ${getDevice()}, provide the appropriate permission and reload this application.`,
    ];
  }
  if (browserName === 'Safari') {
    return [
      'Open Safari browser settings by clicking on Safari > Preferences at the top left.',
      `Under Websites, select ${getDevice()} from the devices on the left and pick this webiste.`,
      'Allow permissions from the pop-up menu and reload this application.',
    ];
  }
  if (browserName.includes('Opera')) {
    let results = [];
    if (osName === 'macOS' || osName === 'iOS') {
      results.push('To open settings, click Opera in the toolbar (top-left) > Preferences.');
    } else {
      results.push('To open settings, click the Opera icon (top-left) > Settings.');
    }
    results = [
      ...results,
      'Under Privacy and Security, click Site Settings.',
      `Select ${getDevice()}, enable permissions and reload this application.`,
    ];
    return results;
  }
  if (browserName === 'Firefox') {
    let results = [];
    if (osName === 'macOS' || osName === 'iOS') {
      results.push('To open settings, at the top right, click Preferneces');
    } else {
      results.push('To open settings, at the top right, click Options');
    }
    results = [
      ...results,
      'Under Privacy and Security, scroll down to the  Permissions  section',
      `Select Settings for ${getDevice()}`,
      'Enter the website URL in the search field, enable permissions and reload this application.',
    ];
    return results;
  }
  if (browserName.includes('Edge')) {
    return [
      'To open settings, at the top right click Settings & More > Settings.',
      `Under Site Premissions, click ${getDevice()}.`,
      'Use the drop-down menu and select the default device, allow permission and reload this application.',
    ];
  }
}

function getSysDeniedSteps({ osName, media }) {
  function getDevice() {
    if (media === 'audio') return 'Microphone';
    if (media === 'video') return 'Camera';
    return 'Screenshare';
  }

  if (osName === 'macOS') {
    return [
      ' To give ${getDevice()} access to your browser, choose Apple menu  > System Settings, then click Privacy & Security.',
      `From the sidebar select ${getDevice()}`,
      `If you don’t see  ${getDevice()}, upgrade to macOS Mojave or later.`,
      'Allow access to your browser,',
      'Reload this application.',
    ];
  }
  if (osName === 'iOS') {
    return [
      `To give ${getDevice()} access to your browser, go to phone Settings > Privacy.`,
      `Tap on ${getDevice()}. Allow access for your browser.`,
      'Reload this application.',
    ];
  }
  if (osName === 'Windows') {
    return [
      `To give ${getDevice()} access to your browser, go to the Start menu on Windows.`,
      `Select Settings > Privacy > ${getDevice()}`,
      `Allow permissions and reload this application.`,
    ];
  }
  if (osName.includes('Android')) {
    return [
      `To give ${getDevice()} access to your browser, go to phone Settings > Apps.`,
      'Select your browser from the list',
      `Tap Permissions and allow ${getDevice()} permissions.`,
      'Reload this application.',
    ];
  }
  return [];
}

function getDeniedImage({ browserName, isMobile, osName }) {
  if (browserName === 'Chrome') {
    if (!isMobile && osName === 'macOS') return 'Desktop_Chrome.mp4'; //macOS
    if (!isMobile) return ''; //windows
    if (osName === 'iOS') return 'Chrome_ios.mp4'; //iOS
    else return 'Android_Chrome.mp4'; //android
  }
  if (browserName === 'Firefox') {
    if (!isMobile && osName === 'macOs') return 'Desktop_Firefox.mp4'; //macOS
    if (!isMobile) return ''; //windows
    if (osName === 'iOS') return ''; // iOS
    else return 'Android_Firefox.mp4'; //android
  }

  if (browserName === 'Safari') {
    if (!isMobile) return 'Desktop_Safari.mp4'; // macOS
    return 'iOS Safari.mp4'; //iOS
  }

  if (browserName.includes('Edge')) {
    if (!isMobile && osName === 'macOs') return 'Desktop_Edge.mp4'; //macOS
    if (!isMobile) return ''; //windows
    if (osName === 'iOS') return ''; // iOS
    else return ''; //android
  }

  if (browserName === 'Opera') {
    if (!isMobile && osName === 'macOs') return ''; //macOS
    if (!isMobile) return ''; //windows
    if (osName === 'iOS') return ''; // iOS
    else return ''; //android
  }

  if (browserName === 'Opera') {
    if (!isMobile) return ''; // need
    if (osName === 'iOS') return ''; // need
    else return ''; // need
  }
}

function getSysDeniedImage({ osName }) {
  if (osName === 'macOS') return '';
  if (osName === 'iOS') return '';
  if (osName === 'Windows') return '';
  if (osName.includes('Android')) return '';
}

const audioPermissions = {
  ACCEPTED: {
    info: 'Permission granted',
    icon: 'checkmark',
    text: 'Your audio devices, such as microphones and speakers, should work as expected.',
    steps: () => [],
    image: () => '',
  },
  SYSTEM_DENIED: {
    info: 'Permission denied by system',
    icon: 'dismiss',
    text: 'Your browser does not have the required permissions to access your microphone',
    steps: getSysDeniedSteps,
    image: getSysDeniedImage,
  },
  DENIED: {
    info: 'Permission denied by browser',
    icon: 'dismiss',
    text: 'We do not have the required permissions to access your microphone',
    steps: getDeniedSteps,
    image: getDeniedImage,
  },
  COULD_NOT_START: {
    info: 'Could not start device',
    icon: 'dismiss',
    text: 'Access to the microphone may be restricted by a hardware error in the operating system or browser',
    steps: () => [
      'Restart your browser.',
      'Update your browser.',
      'If using an external device, try switching to another device.',
      'Switch to a different browser.',
    ],
    image: () => '',
  },
  NOT_REQUESTED: {
    info: 'You have not yet used your microphone yet',
    icon: 'warning',
    text: 'We cannot access the data to troubleshoot unless you try to use the microphone at least once. Please click on the "Allow Permissions" button to fix this. Others will not be able to hear you.',
    steps: () => [],
    image: () => '',
  },
};
const videoPermissions = {
  ACCEPTED: {
    info: 'Permission granted',
    icon: 'checkmark',
    text: 'Your camera devices should work as expected',
    steps: () => [],
    image: () => '',
  },
  SYSTEM_DENIED: {
    info: 'Permission denied by system',
    icon: 'dismiss',
    text: 'Your browser does not have the required permissions to access your camera',
    steps: getSysDeniedSteps,
    image: getSysDeniedImage,
  },
  DENIED: {
    info: 'Permission denied by browser',
    icon: 'dismiss',
    text: 'We do not not have the required permissions to access your camera',
    steps: getDeniedSteps,
    image: getDeniedImage,
  },
  COULD_NOT_START: {
    info: 'Could not start device',
    icon: 'dismiss',
    text: 'Access to the camera may be restricted by a hardware error in the operating system or browser',
    steps: () => [
      'Restart your browser.',
      'Update your browser.',
      'If using an external device, try switching to another device.',
      'Switch to a different browser.',
    ],
    image: () => '',
  },
  NOT_REQUESTED: {
    info: 'You have not yet used your camera yet',
    icon: 'warning',
    text: 'We cannot access the data to troubleshoot unless you try to use the camera at least once. Please click on the "Allow Permissions" button to fix this. Others will not be able to see you.',
    steps: () => [],
    image: () => '',
  },
};
const screensharePermissions = {
  ACCEPTED: {
    info: 'Permission granted',
    icon: 'checkmark',
    text: 'Your screen share should work as expected',
    steps: () => [],
    image: () => '',
  },
  SYSTEM_DENIED: {
    info: 'Permission denied by system',
    icon: 'dismiss',
    text: 'Your browser does not have the required permissions to share screen',
    steps: getSysDeniedSteps,
    image: getSysDeniedImage,
  },
  DENIED: {
    info: 'Permission denied by browser',
    icon: 'dismiss',
    text: 'We do not have the required permissions to share screen',
    steps: getDeniedSteps,
    image: getDeniedImage,
  },
  COULD_NOT_START: {
    info: 'Could not start screenshare',
    icon: 'dismiss',
    text: 'Access for screen share may be restricted by a hardware error in the operating system or browser',
    steps: () => [
      'Restart your browser.',
      'Update your browser to the latest version.',
      'Try sharing a tab or window instead of the entire screen.',
      'Switch a different browser.',
    ],
    image: () => '',
  },
  NOT_REQUESTED: {
    info: 'You have not yet used shared screen yet',
    icon: 'warning',
    text: 'We cannot access the data to troubleshoot unless you screenshare at least once. You can try screensharing fix this.',
    steps: () => [],
    image: () => '',
  },
};

const audioIssues = [
  {
    index: 0,
    value: 'Please select an issue',
    steps: [],
    troubleshoot: false,
  },
  {
    index: 1,
    value: "Participants can't hear me",
    steps: [
      'Please make sure that your microphone is unmuted. You can do this by clicking on the mic icon from the control bar.',
      'If using an external device, please make sure that you are sitting close to the microphone.',
    ],
    troubleshoot: false,
  },
  {
    index: 2,
    value: "I can't hear participants",
    steps: [
      'Please ensure that the window or tab is not muted.',
      'Please ensure that the volume level of your audio device is not set to 0.',
      'Please ensure you are connected to the correct speaker device.',
    ],
    troubleshoot: false,
  },
  {
    index: 3,
    value: 'My audio is laggy',
    steps: [
      'Please ensure that you have a stable internet connection.',
      'Please try switching to a different audio device.',
      'If your network connection is weak, consider disabling your video to improve the audio bandwidth.',
    ],
    troubleshoot: false,
  },
  {
    index: 4,
    value: 'My audio is unclear',
    steps: [
      'Please make sure you are using a good-quality microphone.',
      'Please make sure you are in close proximity to the microphone.',
    ],
    troubleshoot: false,
  },
  {
    index: 5,
    value: "Participant's audio is laggy",
    steps: [
      'Please ensure that you have a stable internet connection.',
      'Please request the participant to use an alternative audio device.',
      'If your network connection is weak, consider disabling your video to improve the audio bandwidth.',
    ],
    troubleshoot: false,
  },
  {
    index: 6,
    value: 'The audio from a participant is not clear',
    steps: [
      "Please ensure that your system's speaker volume is checked and adjusted if necessary.",
      'Please request the participant to move close to the microphone.',
    ],
    troubleshoot: false,
  },
];
const videoIssues = [
  {
    index: 0,
    value: 'Please select an issue',
    steps: [],
    troubleshoot: false,
  },
  {
    index: 1,
    value: "Participants can't see my video",
    steps: [
      'Please ensure you have turned on your video from the control bar.',
      'If using an external device, please ensure your device is connected and working properly.',
    ],
    troubleshoot: false,
  },
  {
    index: 2,
    value: 'Not able to view participnats video',
    steps: [
      'Please ensure you have a stable internet connection.',
      'If you have a poor network connection, please try moving closer to the Wi-Fi router.',
    ],
    troubleshoot: false,
  },
  {
    index: 3,
    value: 'My video is laggy',
    steps: [
      'Please ensure that you have a stable internet connection.',
      'Please try switching to a different video device.',
    ],
    troubleshoot: false,
  },
  {
    index: 4,
    value: 'My video is unclear',
    steps: [
      'Please ensure you are not using a faulty device.',
      'Please make sure you are in a well-lit area.',
      'Please ensure you have a stable internet connection.',
    ],
    troubleshoot: false,
  },
  {
    index: 5,
    value: "Participant's video is laggy",
    steps: [
      'Please ensure you have a stable internet connection.',
      'Please request the participant to use an alternative video device.',
      'If your network connection is weak, consider disabling your video to improve the audio bandwidth.',
    ],
    troubleshoot: false,
  },
  {
    index: 6,
    value: "Participant's video is unclear",
    steps: [
      'Please ensure you have a stable internet connection.',
      'Please ensure the participant is not using a faulty device.',
      'Please make sure the participant is in a well-lit area.',
    ],
    troubleshoot: false,
  },
];
const screenshareIssues = [
  {
    index: 0,
    value: 'Please select an issue',
    steps: [],
    troubleshoot: false,
  },
  {
    index: 1,
    value: 'There is a delay in my screen sharing',
    steps: ['Please ensure you have a stable internet connection.'],
    troubleshoot: false,
  },
  {
    index: 2,
    value: "There is a delay in participant's screen share",
    steps: ['Please ensure you have a stable internet connection.'],
    troubleshoot: false,
  },
  {
    index: 3,
    value: 'Not able to start or stop screen share',
    steps: [
      'This error is most likely related to the browser or system you are using. Please ensure that your browser is updated to the latest version.',
      'Please try switching to another browser',
      'Please try sharing a tab or a window incase you are unable to share your entire screen.',
    ],
    troubleshoot: false,
  },
  {
    index: 4,
    value: "Not able to view a participant's screen share",
    steps: ['Please ensure you have a stable internet connection.'],
    troubleshoot: false,
  },
];

export const permissionPrompts = {
  audio: audioPermissions,
  video: videoPermissions,
  screenshare: screensharePermissions,
};

export const issueList = {
  audio: audioIssues,
  video: videoIssues,
  screenshare: screenshareIssues,
};

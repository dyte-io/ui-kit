import{d as t}from"./p-02af26e9.js";import{l as o}from"./p-e1ac2003.js";const s={joined:"https://dyte-uploads.s3.ap-south-1.amazonaws.com/notification_join.mp3",left:"https://dyte-uploads.s3.ap-south-1.amazonaws.com/notification_join.mp3",message:"https://dyte-uploads.s3.ap-south-1.amazonaws.com/notification_message.mp3"};class i{constructor(t){this.meeting=t,this.audio=document.createElement("audio"),this.audio.volume=.3}play(t,i=3e3){var a;this.playing||(this.playing=!0,this.audio.src=s[t],this.audio.volume=.3,null===(a=this.audio.play())||void 0===a||a.catch((s=>{o.error("[dyte-notifications] play() failed\n",{sound:t,duration:i},s)})),setTimeout((()=>{this.playing=!1}),i))}async setDevice(s){var i,a,n;t(this.meeting)||await(null===(n=null===(a=null===(i=this.audio)||void 0===i?void 0:i.setSinkId)||void 0===a?void 0:a.call(i,s))||void 0===n?void 0:n.catch((t=>{o.error("[dyte-notifications] setSinkId() error\n",t)})))}}export{i as D}
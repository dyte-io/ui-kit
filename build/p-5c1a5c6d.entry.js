import{r as t,c as e,h as i,H as o}from"./p-69f2ebde.js";import{s as r}from"./p-4de316e3.js";import{d as a}from"./p-ba748e25.js";import{R as s}from"./p-4dfeaf93.js";import{d as n}from"./p-cadf534b.js";import{u as d}from"./p-54de5543.js";import{a as c}from"./p-57e22a58.js";import{s as l}from"./p-1210aa77.js";const p=class{constructor(i){t(this,i),this.stateUpdate=e(this,"dyteStateUpdate",7),this.socketStateUpdate=({state:t})=>{this.connectionState=t,"failed"===t&&(this.isJoining=!1)},this.join=async()=>{var t,e,i;if(""!==(null===(t=this.displayName)||void 0===t?void 0:t.trim())&&!this.isJoining){this.isJoining=!0,null===(e=this.meeting)||void 0===e||e.self.setName(this.displayName),c.setItem("dyte-display-name",this.displayName);try{await(null===(i=this.meeting)||void 0===i?void 0:i.joinRoom())}catch(t){this.isJoining=!1}}},this.meeting=void 0,this.states=l,this.size=void 0,this.config=a,this.iconPack=n,this.t=d(),this.displayName=void 0,this.isJoining=!1,this.canEditName=!0,this.canProduceAudio=!0,this.connectionState=void 0}connectedCallback(){this.meetingChanged(this.meeting)}disconnectedCallback(){this.meeting.meta.removeListener("socketConnectionUpdate",this.socketStateUpdate)}componentDidLoad(){var t;null===(t=this.inputEl)||void 0===t||t.focus()}meetingChanged(t){var e,i,o;null!=t&&(this.connectionState=null===(e=t.meta.socketState)||void 0===e?void 0:e.state,this.canEditName=null===(i=t.self.permissions.canEditDisplayName)||void 0===i||i,this.displayName=(null===(o=t.self.name)||void 0===o?void 0:o.trim())||(this.canEditName?"":"Participant"),l.meeting="setup",t.meta.addListener("socketConnectionUpdate",this.socketStateUpdate))}render(){var t,e,a,n;const d=""===(null===(t=this.displayName)||void 0===t?void 0:t.trim())||"connected"!==this.connectionState||this.isJoining,c={meeting:this.meeting,config:this.config,states:this.states||l,size:this.size,iconPack:this.iconPack,t:this.t};return i(o,null,i("div",{class:"container"},i("div",{class:"container-tile"},i(s,{element:"dyte-participant-tile",defaults:c,props:{participant:null===(e=this.meeting)||void 0===e?void 0:e.self,size:"md",isPreview:!0},childProps:{participant:null===(a=this.meeting)||void 0===a?void 0:a.self,size:"md"},deepProps:!0}),i("div",{class:"media-selectors"},i("dyte-microphone-selector",Object.assign({},c,{variant:"inline"})),i("dyte-camera-selector",Object.assign({},c,{variant:"inline"})),i("dyte-speaker-selector",Object.assign({},c,{variant:"inline"})))),i("div",{class:"metadata"},""===(null===(n=this.displayName)||void 0===n?void 0:n.trim())?i("div",{class:"name"},this.t("setup_screen.join_in_as")):i("div",{class:"label"},i("p",null,this.t("setup_screen.joining_as")),i("div",{class:"name"},!this.canEditName&&r(this.displayName,20))),this.canEditName&&i("input",{placeholder:this.t("setup_screen.your_name"),value:this.displayName,spellcheck:!1,autoFocus:!0,ref:t=>{this.inputEl=t},onInput:t=>{this.displayName=t.target.value},onKeyDown:t=>{"Enter"===t.key&&this.join()}}),i("dyte-button",{size:"lg",kind:"wide",onClick:this.join,disabled:d,iconPack:this.iconPack,t:this.t},this.isJoining?i("dyte-spinner",{iconPack:this.iconPack,t:this.t}):this.t("join")),"connected"!==this.connectionState&&i("div",{class:"no-network-badge"},i("dyte-icon",{size:"md",variant:"danger",icon:this.iconPack.disconnected}),this.t("failed"===this.connectionState?"network.lost_extended":"network.lost")))))}static get watchers(){return{meeting:["meetingChanged"]}}};p.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{box-sizing:border-box;padding:var(--dyte-space-4, 16px);height:100%;min-height:100%;width:100%;display:flex;place-items:center;justify-content:center;--dyte-controlbar-button-background-color:rgb(var(--dyte-colors-background-700, 44 44 44))}.container{width:100%;max-width:1080px;display:flex;align-items:center;justify-content:space-evenly;gap:var(--dyte-space-4, 16px)}.metadata{width:100%;max-width:var(--dyte-space-80, 320px)}.label{display:flex;flex-direction:column;align-items:center;font-size:14px}.label p{margin-top:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-2, 8px);display:inline-block;font-size:16px}.container-tile{display:flex;height:100%;width:100%;max-width:584px;flex-direction:column;gap:var(--dyte-space-2, 8px)}.name{margin:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-6, 24px);text-align:center;font-size:28px;font-weight:500;letter-spacing:-0.025em;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}input{margin-bottom:var(--dyte-space-6, 24px);display:block;height:var(--dyte-space-10, 40px);width:100%;max-width:var(--dyte-space-80, 320px);border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);color:rgb(var(--dyte-colors-text-1000, 255 255 255));box-sizing:border-box;font-size:16px;outline:2px solid transparent;outline-offset:2px;transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}input::-moz-placeholder{color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}input::placeholder{color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}input{border:var(--dyte-border-width-sm, 1px) solid rgb(var(--dyte-colors-background-600, 60 60 60))}input:focus{--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-border-opacity))}dyte-spinner{color:rgb(var(--dyte-colors-text-1000, 255 255 255));--icon-size:var(--dyte-space-8, 32px)}:host([size='sm']) .container,:host([size='md']) .container{height:100%;flex-direction:column;justify-content:space-evenly}:host([size='sm']) .container-tile,:host([size='md']) .container-tile{height:-moz-min-content;height:min-content;flex-direction:column;justify-content:center}dyte-participant-tile{height:auto;width:100%;max-width:584px}.media-selectors{display:flex;flex-direction:column;justify-content:space-between}.media-selectors .row{display:grid;grid-template-columns:repeat(2, minmax(0, 1fr))}.no-network-badge{margin-top:var(--dyte-space-2, 8px);display:flex;width:100%;flex-direction:row;align-items:center;justify-content:flex-start;border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));background-color:rgba(var(--dyte-colors-danger, 255 45 45) / 0.1);padding-top:var(--dyte-space-1, 4px);padding-bottom:var(--dyte-space-1, 4px);font-size:12px;color:rgba(var(--dyte-colors-danger, 255 45 45) / 0.75)}.no-network-badge dyte-icon{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px)}";export{p as dyte_setup_screen}
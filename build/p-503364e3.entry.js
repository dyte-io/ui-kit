import{r as t,c as i,h as s,H as a}from"./p-f3ae5269.js";import{d as e}from"./p-cadf534b.js";import{u as n}from"./p-93bcbced.js";import{o as h,s as o}from"./p-e0d02dd9.js";import{a as r}from"./p-d84fc045.js";import"./p-57e22a58.js";import"./p-83bfbad3.js";const p=class{constructor(s){t(this,s),this.stateUpdate=i(this,"dyteStateUpdate",7),this.updateStageRequests=async t=>{var i,s,a;t||(t=null!==(a=null===(s=null===(i=this.meeting.stage)||void 0===i?void 0:i.getAccessRequests())||void 0===s?void 0:s.stageRequests)&&void 0!==a?a:[]),this.stageRequestedParticipants=t,this.stageRequestedParticipants="REQUESTED_TO_JOIN_STAGE"===this.meeting.stage.status?[this.meeting.self,...t]:t,this.updateBadgeCount()},this.updateBadgeCount=()=>{this.badgeCount=this.waitlistedParticipants.length+this.stageRequestedParticipants.length},this.updateCanView=()=>{this.canViewParticipants=r(this.meeting)},this.variant="button",this.meeting=void 0,this.states=void 0,this.size=void 0,this.iconPack=e,this.t=n(),this.participantsActive=!1,this.waitlistedParticipants=[],this.stageRequestedParticipants=[],this.badgeCount=0,this.canViewParticipants=!1}connectedCallback(){this.meetingChanged(this.meeting),this.statesChanged(this.states),this.removeStateChangeListener=h("sidebar",(()=>this.statesChanged()))}disconnectedCallback(){var t,i,s;this.removeStateChangeListener&&this.removeStateChangeListener(),null!=this.meeting&&(null===(i=null===(t=this.meeting)||void 0===t?void 0:t.stage)||void 0===i||i.removeListener("stageStatusUpdate",this.updateCanView),this.waitlistedParticipantJoinedListener&&this.meeting.participants.waitlisted.removeListener("participantJoined",this.waitlistedParticipantJoinedListener),this.waitlistedParticipantLeftListener&&this.meeting.participants.waitlisted.removeListener("participantLeft",this.waitlistedParticipantLeftListener),null===(s=this.meeting.stage)||void 0===s||s.removeListener("stageAccessRequestUpdate",this.updateStageRequests))}meetingChanged(t){var i;null!=t&&(this.canViewParticipants=r(t),null===(i=null==t?void 0:t.stage)||void 0===i||i.on("stageStatusUpdate",this.updateCanView),t.self.permissions.acceptWaitingRequests&&(this.waitlistedParticipants=t.participants.waitlisted.toArray(),this.waitlistedParticipantJoinedListener=t=>{this.waitlistedParticipants.some((i=>i.id===t.id))||(this.waitlistedParticipants=[...this.waitlistedParticipants,t],this.updateBadgeCount())},this.waitlistedParticipantLeftListener=t=>{this.waitlistedParticipants=this.waitlistedParticipants.filter((i=>i.id!==t.id)),this.updateBadgeCount()},t.participants.waitlisted.addListener("participantJoined",this.waitlistedParticipantJoinedListener),t.participants.waitlisted.addListener("participantLeft",this.waitlistedParticipantLeftListener)),this.meeting.self.permissions.stageEnabled&&this.meeting.self.permissions.acceptStageRequests&&(this.updateStageRequests(),null==t||t.stage.on("stageAccessRequestUpdate",this.updateStageRequests)),this.updateBadgeCount())}statesChanged(t){const i=t||o;null!=i&&(this.participantsActive=!0===i.activeSidebar&&"participants"===i.sidebar)}toggleParticipantsTab(){const t=this.states||o;this.participantsActive=!((null==t?void 0:t.activeSidebar)&&"participants"===(null==t?void 0:t.sidebar)),o.activeSidebar=this.participantsActive,o.sidebar=this.participantsActive?"participants":void 0,o.activeMoreMenu=!1,o.activeAI=!1,this.stateUpdate.emit({activeSidebar:this.participantsActive,sidebar:this.participantsActive?"participants":void 0,activeMoreMenu:!1,activeAI:!1})}render(){if(!this.canViewParticipants)return;const t=this.t("participants");return s(a,{title:t},0!==this.badgeCount&&!this.participantsActive&&s("div",{class:"waiting-participants-count",part:"waiting-participants-count"},s("span",null,this.badgeCount<=100?this.badgeCount:"99+")),s("dyte-controlbar-button",{part:"controlbar-button",size:this.size,iconPack:this.iconPack,t:this.t,class:{active:this.participantsActive},onClick:()=>this.toggleParticipantsTab(),icon:this.iconPack.participants,label:t,variant:this.variant}))}static get watchers(){return{meeting:["meetingChanged"],states:["statesChanged"]}}};p.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{position:relative;display:block}.waiting-participants-count{position:absolute;right:var(--dyte-space-3, 12px);box-sizing:border-box;padding:var(--dyte-space-0\\.5, 2px);-webkit-user-select:none;-moz-user-select:none;user-select:none;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));font-size:12px;display:flex;height:var(--dyte-space-5, 20px);min-width:var(--dyte-space-5, 20px);align-items:center;justify-content:center;border-radius:9999px;z-index:1}:host([variant='horizontal']){display:flex;flex-direction:row-reverse;align-items:center}:host([variant='horizontal']) .waiting-participants-count{right:var(--dyte-space-4, 16px);top:auto}";export{p as dyte_participants_toggle}
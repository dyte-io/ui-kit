import{r as t,c as i,h as s,H as e}from"./p-f3ae5269.js";import{d as a}from"./p-ba748e25.js";import{d as n}from"./p-cadf534b.js";import{u as h}from"./p-93bcbced.js";import{d as r}from"./p-d35cbe2e.js";import{R as d}from"./p-0dd43c7b.js";import{s as o}from"./p-e0d02dd9.js";import{a as p}from"./p-83bfbad3.js";import{d as c}from"./p-f682efe7.js";import"./p-57e22a58.js";const l=class{constructor(s){t(this,s),this.stateUpdate=i(this,"dyteStateUpdate",7),this.hideSelf=!1,this.invalidRoomStates=["init","waitlisted","ended","kicked","rejected"],this.filterParticipants=t=>{var i;if(this.overrides&&(null===(i=this.overrides)||void 0===i?void 0:i.videoUnsubscribed)){const i=this.overrides.videoUnsubscribed.preset;i.length>0&&(t=t.filter((t=>!i.some((i=>void 0!==t.presetName&&t.presetName.match(i))))))}return t},this.onViewModeChanged=()=>{null!=this.meeting&&this.updateActiveParticipants()},this.onParticipantJoined=r((()=>{this.updateActiveParticipants()}),50),this.onParticipantLeft=r((()=>{this.updateActiveParticipants()}),50),this.stageStatusListener=()=>{this.updateActiveParticipants(),this.showLiveStreamPlayer=p(this.meeting),"ON_STAGE"!==this.meeting.stage.status&&this.removeScreenShare(this.meeting.self)},this.peerStageStatusListener=t=>{this.updateActiveParticipants(),"ON_STAGE"!==this.meeting.stage.status&&(this.removePinned(t),this.removeScreenShare(t))},this.onScreenShareUpdate=t=>{t.screenShareEnabled?this.addScreenShare(t):this.removeScreenShare(t)},this.onSelfScreenShareUpdate=({screenShareEnabled:t})=>{t?this.addScreenShare(this.meeting.self):this.removeScreenShare(this.meeting.self)},this.onPluginStateUpdate=(t,{active:i})=>{i?this.plugins.some((i=>i.id===t.id))||(this.plugins=[...this.plugins,t]):this.plugins=this.plugins.filter((i=>i.id!==t.id))},this.onParticipantPinned=()=>{this.updateActiveParticipants()},this.onParticipantUnpinned=()=>{this.updateActiveParticipants()},this.updateRoomStateListener=()=>{this.roomState=this.meeting.self.roomState},this.participants=[],this.pinnedParticipants=[],this.screenShareParticipants=[],this.plugins=[],this.emptyStage=!1,this.showLiveStreamPlayer=!1,this.canCurrentPeerHost=!1,this.pipSupported=!1,this.pipEnabled=!1,this.roomState=void 0,this.layout="row",this.aspectRatio="16:9",this.meeting=void 0,this.gap=8,this.size=void 0,this.states=o,this.config=a,this.iconPack=n,this.t=h(),this.gridSize=c,this.overrides={}}connectedCallback(){this.meetingChanged(this.meeting)}disconnectedCallback(){this.disconnectMeeting(this.meeting)}disconnectMeeting(t){var i;if(null==t)return;this.participants=[],this.plugins=[];const{self:s,participants:e,plugins:a}=t;s.removeListener("pinned",this.onParticipantPinned),s.removeListener("unpinned",this.onParticipantUnpinned),s.removeListener("roomLeft",this.updateRoomStateListener),s.removeListener("roomJoined",this.updateRoomStateListener),s.removeListener("screenShareUpdate",this.onSelfScreenShareUpdate),null==a||a.all.removeListener("stateUpdate",this.onPluginStateUpdate),null===(i=t.stage)||void 0===i||i.removeListener("stageStatusUpdate",this.stageStatusListener),e.removeListener("viewModeChanged",this.onViewModeChanged),e.active.removeListener("participantLeft",this.onParticipantLeft),e.active.removeListener("participantJoined",this.onParticipantJoined),e.pinned.removeListener("participantJoined",this.onParticipantPinned),e.pinned.removeListener("participantLeft",this.onParticipantUnpinned),e.joined.removeListener("screenShareUpdate",this.onScreenShareUpdate),e.joined.removeListener("stageStatusUpdate",this.peerStageStatusListener)}meetingChanged(t,i){var s,e,a,n;if(null!==i&&this.disconnectMeeting(i),null!=t){const{self:i,participants:h,plugins:r,stage:d}=t;this.pipSupported=(null===(s=this.meeting.participants.pip)||void 0===s?void 0:s.isSupported())&&(null===(e=t.self.config)||void 0===e?void 0:e.pipMode),this.pipSupported&&this.meeting.participants.pip.init();const{permissions:o}=i;this.roomState=i.roomState;const p=null==o?void 0:o.isRecorder;this.hideSelf="ON_STAGE"!==this.meeting.stage.status||p||o.hiddenParticipant,this.participants=this.filterParticipants([...h.active.toArray(),...i.isPinned||this.hideSelf?[]:[i]]),this.pinnedParticipants=[...h.pinned.toArray(),...i.isPinned&&!this.hideSelf?[i]:[]],this.screenShareParticipants=h.joined.toArray().filter((t=>t.screenShareEnabled)),this.plugins=(null==r?void 0:r.active.toArray())||[],(null==o?void 0:o.stageEnabled)&&(this.canCurrentPeerHost=o.acceptStageRequests||o.canPresent,this.updateStage()),i.addListener("roomLeft",this.updateRoomStateListener),i.addListener("roomJoined",this.updateRoomStateListener),i.addListener("screenShareUpdate",this.onSelfScreenShareUpdate),i.addListener("pinned",this.onParticipantPinned),i.addListener("unpinned",this.onParticipantUnpinned),null==d||d.addListener("stageStatusUpdate",this.stageStatusListener),null==r||r.all.addListener("stateUpdate",this.onPluginStateUpdate),h.addListener("viewModeChanged",this.onViewModeChanged),h.active.addListener("participantLeft",this.onParticipantLeft),null===(a=null==h?void 0:h.joined)||void 0===a||a.on("stageStatusUpdate",this.peerStageStatusListener),h.joined.addListener("screenShareUpdate",this.onScreenShareUpdate),h.active.addListener("participantJoined",this.onParticipantJoined),h.pinned.addListener("participantJoined",this.onParticipantPinned),h.pinned.addListener("participantLeft",this.onParticipantUnpinned),(null===(n=t.stage)||void 0===n?void 0:n.status)&&this.stageStatusListener()}}overridesChanged(t){this.updateActiveParticipants()}screenShareParticipantsChanged(t){const i=t.length>0;!!o.activeScreenShare!==i&&(this.stateUpdate.emit({activeScreenShare:i}),o.activeScreenShare=i)}pluginsChanged(t){const i=t.length>0;!!o.activePlugin!==i&&(this.stateUpdate.emit({activePlugin:i}),o.activePlugin=i)}pinnedParticipantsChanged(t){const i=t.length>0;!!o.activeSpotlight!==i&&(this.stateUpdate.emit({activeSpotlight:i}),o.activeSpotlight=i)}updateActiveParticipants(){var t;const{self:i,participants:s,stage:e}=this.meeting;this.hideSelf="ON_STAGE"!==e.status||(null===(t=i.permissions)||void 0===t?void 0:t.isRecorder)||i.permissions.hiddenParticipant,this.participants=this.filterParticipants([...s.active.toArray().filter((t=>t.id!==i.id)),..."ACTIVE_GRID"!==s.viewMode||i.isPinned||this.hideSelf?[]:[i]]),this.pinnedParticipants=[...s.pinned.toArray().filter((t=>t.id!==i.id)),...i.isPinned&&!this.hideSelf?[i]:[]],this.screenShareParticipants=s.joined.toArray().filter((t=>t.screenShareEnabled)),i.screenShareEnabled&&(this.screenShareParticipants=this.screenShareParticipants.concat([i])),this.updateStage()}updateStage(){var t;const{self:i}=this.meeting;this.meeting&&(this.emptyStage=!!(null===(t=null==i?void 0:i.permissions)||void 0===t?void 0:t.stageEnabled)&&0===this.participants.length&&0===this.pinnedParticipants.length)}addScreenShare(t){this.screenShareParticipants.some((i=>i.id===t.id))||(this.screenShareParticipants=[...this.screenShareParticipants,t])}removeScreenShare(t){this.screenShareParticipants=this.screenShareParticipants.filter((i=>i.id!==t.id))}removePinned(t){this.pinnedParticipants=this.pinnedParticipants.filter((i=>i.id!==t.id))}render(){const t={meeting:this.meeting,size:this.size,states:this.states||o,config:this.config,iconPack:this.iconPack,t:this.t};return this.invalidRoomStates.includes(this.roomState)?s(e,null,s("div",{class:"offline-grid"},s("dyte-icon",{icon:this.iconPack.join_stage,size:"xl"}),s("h3",null,this.t("disconnected")),s("p",null,this.t("disconnected.description")))):"disconnected"===this.roomState?s(e,null,s("div",{class:"offline-grid"},s("dyte-icon",{icon:this.iconPack.disconnected,size:"xl"}),s("h3",null,this.t("offline")),s("p",null,this.t("offline.description")))):"failed"===this.roomState?s(e,null,s("div",{class:"offline-grid"},s("dyte-icon",{icon:this.iconPack.disconnected,size:"xl"}),s("h3",null,this.t("failed")),s("p",null,this.t("failed.description")))):this.showLiveStreamPlayer?s(e,null,s("dyte-livestream-player",{meeting:this.meeting,size:this.size}),s("dyte-livestream-indicator",{meeting:this.meeting,size:"sm",t:this.t}),s("dyte-viewer-count",{meeting:this.meeting,variant:"embedded",t:this.t})):this.emptyStage?s(e,null,s("div",{class:"webinar-stage"},s("div",{class:"center"},this.canCurrentPeerHost&&s("div",{class:"ctr",part:"container"},s("p",{class:"message",part:"message"},this.t("stage.empty_host")),s("span",{class:"description",part:"description"},this.t("stage.empty_host_summary"))),!this.canCurrentPeerHost&&s("div",{class:"ctr",part:"container"},s("p",{class:"message",part:"message"},this.t("stage.empty_viewer")))))):s(e,null,s(d,{element:"dyte-grid",defaults:t,childProps:{participants:this.participants,screenShareParticipants:this.screenShareParticipants,plugins:this.plugins,pinnedParticipants:this.pinnedParticipants,aspectRatio:this.aspectRatio,gap:this.gap,layout:this.layout,gridSize:this.gridSize},onlyChildren:!0}),s("dyte-livestream-indicator",{meeting:this.meeting,size:"sm",t:this.t}),s("dyte-viewer-count",{meeting:this.meeting,variant:"embedded"}))}static get watchers(){return{meeting:["meetingChanged"],overrides:["overridesChanged"],screenShareParticipants:["screenShareParticipantsChanged"],plugins:["pluginsChanged"],pinnedParticipants:["pinnedParticipantsChanged"]}}};l.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{display:block;height:100%;width:100%}.offline-grid{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center}.offline-grid h3{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);margin-left:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-0, 0px);font-size:20px;font-weight:500;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88))}.offline-grid p{margin-top:var(--dyte-space-1, 4px);margin-bottom:var(--dyte-space-1, 4px);margin-left:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-0, 0px);text-align:center;font-size:16px;font-weight:400;color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.offline-grid dyte-icon{margin-bottom:var(--dyte-space-2, 8px)}.webinar-stage{box-sizing:border-box;height:100%;display:flex;align-content:center;align-items:center;justify-content:center;text-align:center}.webinar-stage h2{margin:var(--dyte-space-0, 0px);font-weight:normal}dyte-viewer-count{display:none}.ctr{display:flex;flex-direction:column;align-items:center}.message{font-size:16px;border-radius:var(--dyte-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding-left:var(--dyte-space-8, 32px);padding-right:var(--dyte-space-8, 32px);padding-top:var(--dyte-space-4, 16px);padding-bottom:var(--dyte-space-4, 16px);color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.description{margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-4, 16px);font-size:14px}dyte-livestream-indicator{display:none}@media only screen and (max-device-height: 480px) and (orientation: landscape){dyte-viewer-count[variant='embedded']{position:absolute;top:var(--dyte-space-0, 0px);right:var(--dyte-space-2, 8px);z-index:20;margin-top:var(--dyte-space-0, 0px);margin-left:var(--dyte-space-0, 0px);display:flex}dyte-livestream-indicator{position:absolute;top:var(--dyte-space-0, 0px);left:var(--dyte-space-2, 8px);z-index:20;margin-top:var(--dyte-space-0, 0px);margin-left:var(--dyte-space-0, 0px);display:flex}}";export{l as dyte_grid}
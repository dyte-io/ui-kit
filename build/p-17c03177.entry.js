import{r as t,h as i}from"./p-69f2ebde.js";import"./p-1210aa77.js";import"./p-26e8d50e.js";import{d as s}from"./p-ba748e25.js";import"./p-799d72ea.js";import{d as e}from"./p-cadf534b.js";import{u as a}from"./p-54de5543.js";import"./p-57e22a58.js";import"./p-aafa2ac8.js";import"./p-19c79157.js";const r=class{constructor(r){t(this,r),this.updateStageViewers=()=>{this.getViewers(this.search)},this.createParticipantNode=t=>i("dyte-participant",{role:"listitem",key:t.id,meeting:this.meeting,participant:t,view:this.view,iconPack:this.iconPack,config:this.config,t:this.t}),this.shouldShowViewers=()=>{var t,i,s;return null===(s=null===(i=null===(t=this.meeting)||void 0===t?void 0:t.self)||void 0===i?void 0:i.permissions)||void 0===s?void 0:s.stageEnabled},this.meeting=void 0,this.config=s,this.size=void 0,this.hideHeader=!1,this.iconPack=e,this.view="sidebar",this.search="",this.t=a(),this.stageViewers=[]}connectedCallback(){this.meetingChanged(this.meeting),this.searchChanged(this.search)}meetingChanged(t){null!=t&&(this.participantJoinedListener=t=>{if("ON_STAGE"===t.stageStatus)return;const i=this.search.toLowerCase();i.length>0&&!t.name.toLowerCase().includes(i)||(this.stageViewers=[...this.stageViewers.filter((i=>i.id!==t.id)),t])},this.participantLeftListener=t=>{this.stageViewers=this.stageViewers.filter((i=>i.id!==t.id))},t.participants.joined.addListener("participantJoined",this.participantJoinedListener),t.participants.joined.addListener("participantLeft",this.participantLeftListener),t.participants.joined.on("stageStatusUpdate",this.updateStageViewers),t.stage.on("stageStatusUpdate",this.updateStageViewers))}searchChanged(t){this.getViewers(t)}disconnectedCallback(){const{participants:t,stage:i}=this.meeting;this.participantJoinedListener&&this.meeting.participants.joined.removeListener("participantJoined",this.participantJoinedListener),this.participantLeftListener&&this.meeting.participants.joined.removeListener("participantLeft",this.participantLeftListener),t.joined.removeListener("stageStatusUpdate",this.updateStageViewers),i.removeListener("stageStatusUpdate",this.updateStageViewers)}getViewers(t){let i="ON_STAGE"===this.meeting.stage.status?[]:[this.meeting.self];i=[...i,...this.meeting.participants.joined.toArray()].filter((t=>"ON_STAGE"!==t.stageStatus)),this.stageViewers=""===t?i:i.filter((i=>{var s;return(null!==(s=i.name)&&void 0!==s?s:i.id).toLowerCase().includes(t.toLowerCase())}))}render(){if("sidebar"===this.view&&this.shouldShowViewers())return i("div",{class:"list"},!this.hideHeader&&i("div",{class:"heading-count",part:"heading-count"},this.t("viewers")," (",this.stageViewers.length,")"),i("dyte-virtualized-participant-list",{items:this.stageViewers,renderItem:this.createParticipantNode,class:"participants",part:"participants",style:{height:"100%"},emptyListElement:i("div",{class:"empty-viewers-list"},this.t(this.search.length>0?"participants.errors.empty_results":"participants.empty_list"))}))}static get watchers(){return{meeting:["meetingChanged"],search:["searchChanged"]}}};r.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{display:flex;height:100%;width:100%;flex-direction:column;font-size:14px}.list{margin-bottom:var(--dyte-space-4, 16px);display:flex;height:100%;flex-direction:column}h3,.heading-count{margin:var(--dyte-space-0, 0px);align-items:center;justify-content:center;padding:var(--dyte-space-0, 0px);font-size:16px;font-weight:400;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));text-align:center}.heading-count{font-size:14px}.participants{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}.empty-viewers-list{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);text-align:center;font-size:12px;color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}";export{r as dyte_participants_viewer_list}
import{r as t,c as a,h as e,H as i}from"./p-69f2ebde.js";import{u as s}from"./p-7e1ebd28.js";import{d as o}from"./p-cadf534b.js";import{s as r}from"./p-1210aa77.js";import"./p-57e22a58.js";const n=class{constructor(e){t(this,e),this.stateUpdate=a(this,"dyteStateUpdate",7),this.keyPressListener=t=>{"Escape"===t.key&&this.close()},this.isBreakoutRoomsActive=!1,this.isChildMeeting=!1,this.canJoinMainRoom=!1,this.permissionsUpdateListener=()=>{this.canEndMeeting=this.meeting.self.permissions.kickParticipant,this.canJoinMainRoom=this.meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting},this.close=()=>{this.stateUpdate.emit({activeLeaveConfirmation:!1}),r.activeLeaveConfirmation=!1},this.handleLeave=()=>{var t;null===(t=this.meeting)||void 0===t||t.leaveRoom(),this.close()},this.handleJoinMainRoom=()=>{this.meeting.connectedMeetings.moveParticipants(this.meeting.meta.meetingId,this.meeting.connectedMeetings.parentMeeting.id,[this.meeting.self.userId]),this.close()},this.handleEndMeeting=()=>{var t;null===(t=this.meeting)||void 0===t||t.participants.kickAll(),this.close()},this.meeting=void 0,this.states=void 0,this.iconPack=o,this.t=s(),this.canEndMeeting=!1}connectedCallback(){this.meetingChanged(this.meeting),document.addEventListener("keydown",this.keyPressListener)}disconnectedCallback(){var t;document.removeEventListener("keydown",this.keyPressListener),null===(t=this.meeting)||void 0===t||t.self.permissions.removeListener("permissionsUpdate",this.permissionsUpdateListener)}meetingChanged(t){null!=t&&(this.isBreakoutRoomsActive=this.meeting.connectedMeetings.supportsConnectedMeetings&&this.meeting.connectedMeetings.isActive,this.isChildMeeting=this.meeting.connectedMeetings.supportsConnectedMeetings&&this.meeting.connectedMeetings.meetings.some((a=>a.id===t.meta.meetingId)),this.meeting.self.permissions.addListener("permissionsUpdate",this.permissionsUpdateListener),this.permissionsUpdateListener())}render(){return e(i,null,e("div",{class:"leave-modal"},e("div",{class:"header"},e("h2",{class:"title"},this.t("leave"))),e("p",{class:"message"},this.t(this.isBreakoutRoomsActive&&this.isChildMeeting?"breakout_rooms.leave_confirmation":"leave_confirmation")),e("div",{class:"content"},e("dyte-button",{variant:"secondary",onClick:this.close,iconPack:this.iconPack,class:"secondary-btn",t:this.t},this.t("cancel")),this.isBreakoutRoomsActive&&this.isChildMeeting&&this.canJoinMainRoom&&e("dyte-button",{variant:"secondary",onClick:this.handleJoinMainRoom,iconPack:this.iconPack,class:"secondary-btn",t:this.t},this.t("breakout_rooms.leave_confirmation.main_room_btn")),e("dyte-button",{variant:this.canEndMeeting?"secondary":"danger",title:this.t("leave"),onClick:this.handleLeave,iconPack:this.iconPack,class:{"secondary-btn":this.canEndMeeting,"secondary-danger-btn":this.canEndMeeting},t:this.t},this.t("leave")),this.canEndMeeting&&e("dyte-button",{variant:"danger",onClick:this.handleEndMeeting,iconPack:this.iconPack,t:this.t},this.t("end.all")))))}static get watchers(){return{meeting:["meetingChanged"]}}};n.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}.leave-modal{width:var(--dyte-space-72, 288px)}@media (min-width: 768px){.leave-modal{width:var(--dyte-space-96, 384px)}}.leave-modal{position:relative;display:flex;flex-direction:column;border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding:var(--dyte-space-8, 32px);color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-3, 12px)}.leave-modal .message{color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}.leave-modal .content{margin-top:var(--dyte-space-4, 16px);font-size:14px;display:flex;flex-wrap:wrap;gap:var(--dyte-space-4, 16px)}.leave-modal .content dyte-button{height:var(--dyte-space-9, 36px);min-width:var(--dyte-space-44, 176px);flex-grow:1}.leave-modal .content .secondary-btn{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.leave-modal .content .secondary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.leave-modal .content .secondary-danger-btn{--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}";export{n as dyte_leave_meeting}
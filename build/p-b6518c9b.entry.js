import{r as t,c as r,h as e,H as a}from"./p-69f2ebde.js";import"./p-1210aa77.js";import"./p-26e8d50e.js";import"./p-799d72ea.js";import{d as o}from"./p-cadf534b.js";import{u as i}from"./p-7e1ebd28.js";import"./p-57e22a58.js";import{T as s}from"./p-e1e833c2.js";import"./p-aafa2ac8.js";import"./p-19c79157.js";import"./p-d0b39589.js";const n=class{constructor(a){t(this,a),this.channelChanged=r(this,"channelChanged",7),this.handleResize=t=>{this.isHidden=!t.matches},this.channelSelected=t=>{this.channelChanged.emit(t),this.onRevealClicked()},this.onSearchInput=t=>{this.searchQuery=t.target.value},this.onRevealClicked=()=>{this.matchMedia.matches||(this.isHidden=!this.isHidden)},this.renderChannelDisplayPic=t=>e("div",{class:"channel-display"},t.isDirectMessage||t.displayPictureUrl&&0!==t.displayPictureUrl.length?e("dyte-avatar",{participant:{name:t.displayName,picture:t.displayPictureUrl}}):e("dyte-icon",{icon:this.iconPack.people,slot:"start"})),this.renderRecentMessage=t=>{if(!t.latestMessage)return e("p",{class:"latest-msg new"},this.t("chat.start_conversation"));let r=t.isDirectMessage?"":`${t.latestMessage.displayName}: `;if("text"===t.latestMessage.type)return e("p",{class:"latest-msg"},r,e(s,{message:t.latestMessage.message}));let a="";return"image"===t.latestMessage.type?a=this.t("image"):"file"===t.latestMessage.type&&(a=this.t("file")),e("p",{class:"latest-msg"},`${r}${a}`)},this.channels=void 0,this.selectedChannelId=void 0,this.iconPack=o,this.t=i(),this.showRecentMessage=!1,this.isHidden=!1,this.searchQuery=""}connectedCallback(){this.matchMedia=window.matchMedia("(orientation: landscape) and (min-width: 400px)"),this.matchMedia.addEventListener("change",this.handleResize),this.isHidden=!this.matchMedia.matches}disconnectedCallback(){this.matchMedia.removeEventListener("change",this.handleResize)}componentDidRender(){this.$el.style.transform=this.isHidden?"translateX(-380px)":"translateX(0)"}getTimeLabel(t){const r=t.time,e=new Date,a=new Date(e);a.setDate(e.getDate()-1);const o=new Date(e);return o.setDate(e.getDate()-e.getDay()-1),r.toDateString()===e.toDateString()?r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):r.toDateString()===a.toDateString()?this.t("date.yesteday"):r>o?this.t(["date.sunday","date.monday","date.tuesday","date.wednesday","date.thursday","date.friday","date.saturday"][r.getDay()]):Intl.DateTimeFormat([],{day:"2-digit",month:"2-digit",year:"2-digit"}).format(r)}render(){return e(a,null,e("div",{class:"container",ref:t=>this.$el=t},this.isHidden&&e("dyte-button",{iconPack:this.iconPack,t:this.t,kind:"icon",variant:"ghost",size:"md",onClick:this.onRevealClicked,class:"sidebar-btn"},e("dyte-icon",{icon:this.isHidden?this.iconPack.chevron_left:this.iconPack.dismiss,iconPack:this.iconPack,t:this.t})),e("slot",{name:"header"}),e("div",{class:"search-wrapper"},e("div",{class:"search"},e("input",{type:"search",autocomplete:"off",placeholder:this.t("chat.search_conversations"),onInput:this.onSearchInput}),e("dyte-icon",{icon:this.iconPack.search,iconPack:this.iconPack,t:this.t,class:"search-icon"}))),e("div",{class:"channel-container scrollbar",role:"list"},this.channels.filter((t=>""===this.searchQuery||t.displayName.includes(this.searchQuery))).map((t=>e("div",{class:{channel:!0,selected:t.id===this.selectedChannelId,highlight:!!t.unreadCount},role:"listitem",onClick:()=>{this.channelSelected(t.id)}},this.renderChannelDisplayPic(t),e("div",{class:"channel-card","is-direct-message":t.isDirectMessage},e("div",{class:"recent-message-row"},e("span",{class:"channel-name"},t.displayName),t.latestMessage&&e("span",{class:"latest-msg-time"},this.getTimeLabel(t.latestMessage))),e("div",{class:"recent-message-row"},this.renderRecentMessage(t),t.unreadCount>0&&t.id!==this.selectedChannelId?e("span",{class:"new-msgs-count"},t.unreadCount<99?t.unreadCount:"99+"):null))))))),!this.isHidden&&e("div",{class:"overlay-container"},e("dyte-button",{iconPack:this.iconPack,t:this.t,kind:"icon",variant:"ghost",size:"md",onClick:this.onRevealClicked,class:"sidebar-btn"},e("dyte-icon",{icon:this.isHidden?this.iconPack.chevron_left:this.iconPack.dismiss,iconPack:this.iconPack,t:this.t}))))}};n.style=".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}:host{display:flex}.container{display:flex;height:100%;width:var(--dyte-space-96, 384px);flex-direction:column;position:absolute;--tw-translate-x:calc(var(--dyte-space-96, 384px) * -1);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-top-width:var(--dyte-border-width-none, 0);border-bottom-width:var(--dyte-border-width-none, 0);border-right-width:var(--dyte-border-width-sm, 1px);border-left-width:var(--dyte-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-right-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-border-opacity));transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}@keyframes fade{0%{opacity:0}100%{opacity:1}}.overlay-container{width:100vw;--tw-translate-x:var(--dyte-space-96, 384px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity));transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;animation:fade 0.8s}.overlay-container .sidebar-btn{position:static;padding:var(--dyte-space-4, 16px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.sidebar-btn{position:absolute;right:calc(var(--dyte-space-9, 36px) * -1);top:var(--dyte-space-4, 16px);height:var(--dyte-space-8, 32px);width:var(--dyte-space-7, 28px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-radius:var(--dyte-border-radius-sm, 4px)}@media (orientation: landscape) and (min-width: 400px){.container{position:static;--tw-translate-x:var(--dyte-space-0, 0px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sidebar-btn,.overlay-container{display:none}}.search-wrapper{display:flex;align-items:center;gap:var(--dyte-space-2, 8px);padding:var(--dyte-space-2, 8px);border-left-width:var(--dyte-border-width-none, 0);border-right-width:var(--dyte-border-width-none, 0);border-bottom-width:var(--dyte-border-width-sm, 1px);border-top-width:var(--dyte-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-border-opacity))}.search{position:sticky;box-sizing:border-box;display:flex;align-items:center;border-radius:var(--dyte-border-radius-sm, 4px);margin-top:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-0, 0px);height:var(--dyte-space-8, 32px);width:100%}.search .search-icon{height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px);padding:var(--dyte-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52));border-top-right-radius:var(--dyte-border-radius-sm, 4px);border-bottom-right-radius:var(--dyte-border-radius-sm, 4px)}.search input{box-sizing:border-box;width:100%;padding-top:var(--dyte-space-2, 8px);padding-bottom:var(--dyte-space-2, 8px);padding-left:var(--dyte-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));border-width:var(--dyte-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;font-size:14px;line-height:1.25rem}.search input::-moz-placeholder{color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.search input::placeholder{color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.search input{border-top-left-radius:var(--dyte-border-radius-sm, 4px);border-bottom-left-radius:var(--dyte-border-radius-sm, 4px)}.channel-container{box-sizing:border-box;display:flex;flex-direction:column;padding-top:var(--dyte-space-2, 8px);padding-bottom:var(--dyte-space-2, 8px);overflow-y:scroll}.channel-container .channel{display:flex;align-items:center;justify-content:space-between;gap:var(--dyte-space-2, 8px);padding:var(--dyte-space-0, 0px);border-left-width:var(--dyte-border-width-none, 0);border-right-width:var(--dyte-border-width-none, 0);border-bottom-width:var(--dyte-border-width-sm, 1px);border-top-width:var(--dyte-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-border-opacity))}.channel-container .channel:hover{cursor:pointer;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-on-brand-900, var(--dyte-colors-text-900, 255 255 255 / 0.88)))}.channel-container .channel:hover .latest-msg-time,.channel-container .channel:hover .latest-msg,.channel-container .channel:hover .latest-msg.new{color:rgb(var(--dyte-colors-text-on-brand-700, var(--dyte-colors-text-700, 255 255 255 / 0.64)))}.channel-container .channel-display{display:flex;gap:var(--dyte-space-2, 8px);align-self:center;padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-0, 0px)}.channel-container .channel-display dyte-avatar{height:var(--dyte-space-9, 36px);width:var(--dyte-space-9, 36px);flex-shrink:0;font-size:12px}.channel-container .channel-display dyte-icon{height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px);flex-shrink:0;padding:var(--dyte-space-2, 8px);border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)))}.channel-container .channel-card{width:100%;padding-top:var(--dyte-space-2, 8px);padding-bottom:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px);padding-left:var(--dyte-space-1, 4px)}.channel-container .channel-card .channel-name{max-width:var(--dyte-space-60, 240px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500}.channel-container .channel-card .latest-msg{margin:var(--dyte-space-0, 0px);max-width:var(--dyte-space-56, 224px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}.channel-container .channel-card .latest-msg.new{font-weight:200;font-style:italic;color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.channel-container .channel-card .latest-msg-time{font-size:12px;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88))}.channel-container .channel-meta{width:var(--dyte-space-12, 48px);display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;gap:var(--dyte-space-1\\.5, 6px);font-size:12px;font-weight:600}.channel-container .new-msgs-count{height:var(--dyte-space-4, 16px);min-width:var(--dyte-space-4, 16px);padding-top:1px;padding-bottom:1px;padding-left:2px;padding-right:2px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-success, 98 165 4) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)));border-radius:var(--dyte-border-radius-sm, 4px);text-align:center;font-size:12px}.channel-container .selected{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-on-brand-900, var(--dyte-colors-text-900, 255 255 255 / 0.88)))}.channel-container .selected .latest-msg-time,.channel-container .selected .latest-msg,.channel-container .selected .latest-msg.new{color:rgb(var(--dyte-colors-text-on-brand-700, var(--dyte-colors-text-700, 255 255 255 / 0.64)))}.channel-container .highlight .channel-title span{font-weight:700}.latest-msg p{margin:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-1, 4px);display:inline-block}.latest-msg blockquote{display:none}.recent-message-row{margin-bottom:var(--dyte-space-2, 8px);display:flex;width:100%;flex-direction:row;justify-content:space-between}";export{n as dyte_channel_selector_ui}
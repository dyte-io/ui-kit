import{r as t,c as r,w as e,f as a,h as i,H as s,a as o}from"./p-69f2ebde.js";import{s as n}from"./p-1210aa77.js";import"./p-26e8d50e.js";import"./p-799d72ea.js";import{d}from"./p-cadf534b.js";import{u as p}from"./p-7e1ebd28.js";import"./p-57e22a58.js";import"./p-aafa2ac8.js";import"./p-19c79157.js";const c=class{constructor(s){t(this,s),this.stateUpdate=r(this,"dyteStateUpdate",7),this.switchChannel=r(this,"switchChannel",7),this.allMembers=new Map,this.inputTextRef=null,this.searchInputTextRef=null,this.focusOnSearch=(t=!1)=>{this.focusedMemberIndex=-1,e((()=>{var r,e;null===(r=this.searchInputTextRef)||void 0===r||r.focus(),t&&(null===(e=this.searchInputTextRef)||void 0===e||e.select())}))},this.onClickHandler=async()=>{if(0!==this.channelName.length){if(1===this.step){const t=this.meeting.participants.all.toArray(),r=this.meeting.self.userId;return t.filter((t=>t.userId!==r)).forEach((t=>this.allMembers.set(t.userId,t))),this.step=2,void this.focusOnSearch()}await this.createChannel()}},this.createChannel=async()=>{const t=Array.from(this.selectedMemberIds),r=await this.meeting.chat.createChannel(this.channelName,t,{displayPictureUrl:"",visibility:"public",isDirectMessage:!1});this.switchChannel.emit(r.id),this.stateUpdate.emit({activeChannelCreator:!1}),n.activeChannelCreator=!1},this.onMemberAdd=t=>{this.showAllMembersList=!1,this.selectedMemberIds.add(t),this.searchQuery="",this.focusOnSearch()},this.keyDownHandler=(t,r)=>{if("ArrowDown"===t.key)this.focusedMemberIndex=Math.min(this.focusedMemberIndex+1,r.length-1);else if("ArrowUp"===t.key){if(-1===this.focusedMemberIndex)return;if(0===this.focusedMemberIndex)return void this.focusOnSearch(!0);this.focusedMemberIndex=Math.max(this.focusedMemberIndex-1,0)}else if("Enter"===t.key)this.onMemberAdd(r[this.focusedMemberIndex].userId);else if("Backspace"===t.key){if(0!==this.searchQuery.length)return;if(0===this.selectedMemberIds.size)return;const t=Array.from(this.selectedMemberIds.values()).at(-1);this.selectedMemberIds.delete(t),a(this.$el)}},this.renderMemberSelector=()=>{const t=Array.from(this.allMembers.values()).filter((t=>!this.selectedMemberIds.has(t.userId)&&t.name.toLowerCase().includes(this.searchQuery.toLowerCase()))),r=Array.from(this.selectedMemberIds.values()).map((t=>this.allMembers.get(t))),s=this.selectedMemberIds.size===this.allMembers.size;return i("div",{class:"input-container"},i("ul",{class:"members scrollbar",onClick:()=>{var t;null===(t=this.searchInputTextRef)||void 0===t||t.focus()}},r.map((t=>i("li",{class:"pill"},i("dyte-avatar",{participant:{name:t.name,picture:t.picture},size:"sm"}),i("span",null,t.name),i("dyte-icon",{icon:this.iconPack.dismiss,iconPack:this.iconPack,t:this.t,onClick:()=>{this.selectedMemberIds.delete(t.userId),a(this.$el),this.focusOnSearch()}})))),!s&&i("input",{type:"text",ref:t=>this.searchInputTextRef=t,value:this.searchQuery,placeholder:0===this.selectedMemberIds.size?this.t("chat.member_name"):"",class:{"wide-input":0===this.selectedMemberIds.size},onInput:t=>{this.searchQuery=t.target.value.trim()},onClick:()=>{this.showAllMembersList=!this.showAllMembersList},onKeyDown:r=>this.keyDownHandler(r,t)})),(0!==this.searchQuery.length||this.showAllMembersList)&&i("ul",{class:"search-results"},t.map(((t,r)=>i("li",{class:{member:!0,selected:r===this.focusedMemberIndex},onClick:()=>this.onMemberAdd(t.userId),ref:t=>{r===this.focusedMemberIndex&&e((()=>{t&&t.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})}))}},i("dyte-avatar",{participant:{name:t.name,picture:t.picture},size:"sm"}),i("span",null,t.name)))),0===t.length&&i("li",{class:"member"},i("span",null,this.t("chat.error.empty_results")))))},this.meeting=void 0,this.t=p(),this.iconPack=d,this.channelName="",this.searchQuery="",this.step=1,this.loading=!1,this.selectedMemberIds=new Set,this.focusedMemberIndex=-1,this.showAllMembersList=!1}componentDidLoad(){var t;null===(t=this.inputTextRef)||void 0===t||t.focus()}render(){return i(s,null,i("header",null,this.t(1===this.step?"chat.new_channel":"chat.add_members")),1===this.step&&i("input",{class:"channel-name-input",type:"text",placeholder:this.t("chat.channel_name"),ref:t=>this.inputTextRef=t,onInput:t=>{this.channelName=t.target.value.trim()}}),2===this.step&&this.renderMemberSelector(),i("footer",null,i("dyte-button",{kind:"button",iconPack:this.iconPack,t:this.t,size:"lg",disabled:0===this.channelName.length,onClick:this.onClickHandler},this.t(1===this.step?"chat.add_members":"create"))))}get $el(){return o(this)}};c.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}:host{border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;flex-direction:column;width:var(--dyte-space-96, 384px);padding-left:var(--dyte-space-9, 36px);padding-right:var(--dyte-space-9, 36px);padding-top:var(--dyte-space-10, 40px);padding-bottom:var(--dyte-space-10, 40px)}header{margin-bottom:var(--dyte-space-8, 32px);display:flex;align-items:center;gap:var(--dyte-space-2, 8px);font-size:24px;font-weight:600}.channel-name-input{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;padding:var(--dyte-space-3, 12px);font-size:16px;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.25;outline:2px solid transparent;outline-offset:2px}.channel-name-input:focus{outline-width:2px;outline-color:rgba(var(--dyte-colors-brand-300, 73 124 253) / 0.5)}footer{margin-top:var(--dyte-space-5, 20px);display:flex;justify-content:flex-end}.member{display:flex;align-items:center;gap:var(--dyte-space-1, 4px);padding:var(--dyte-space-2, 8px)}.member dyte-avatar{height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px);font-size:14px;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.input-container{position:relative;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.25;outline:2px solid transparent;outline-offset:2px;outline-width:2px;outline-color:rgba(var(--dyte-colors-brand-300, 73 124 253) / 0.5);border-radius:var(--dyte-border-radius-sm, 4px)}.input-container .members{margin:var(--dyte-space-0, 0px);max-height:var(--dyte-space-28, 112px);border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-2, 8px);list-style-type:none;display:flex;flex-wrap:wrap;gap:var(--dyte-space-1, 4px);cursor:text;font-size:16px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));overflow-y:auto;min-height:var(--dyte-space-7, 28px)}.input-container .pill{display:flex;align-items:center;gap:var(--dyte-space-1, 4px);border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.input-container .pill dyte-avatar{height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px);font-size:14px;color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)))}.input-container .pill span{max-width:var(--dyte-space-32, 128px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.input-container .pill dyte-icon{height:var(--dyte-space-4, 16px);width:var(--dyte-space-4, 16px);cursor:pointer}.input-container input{width:var(--dyte-space-24, 96px);border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;padding:var(--dyte-space-1, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));outline:2px solid transparent;outline-offset:2px;font-size:16px;line-height:1.25rem}.input-container input.wide-input{width:100%}.search-results{margin:var(--dyte-space-0, 0px);margin-top:var(--dyte-space-1, 4px);max-height:var(--dyte-space-28, 112px);width:100%;padding:var(--dyte-space-0, 0px);position:absolute;list-style-type:none;overflow-y:auto;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-radius:var(--dyte-border-radius-md, 8px);--tw-border-spacing-x:var(--dyte-space-2, 8px);--tw-border-spacing-y:var(--dyte-space-2, 8px);border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-style:solid;border-color:rgba(var(--dyte-colors-brand-300, 73 124 253) / 0.5)}.search-results .member{cursor:pointer}.search-results .member dyte-avatar{color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)))}.search-results .member:hover,.search-results .member.selected{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-700, 2 70 253) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)))}";export{c as dyte_channel_creator}
import{r as t,c as r,h as o,H as e}from"./p-f3ae5269.js";import{d as a}from"./p-cadf534b.js";import{u as i}from"./p-27724701.js";import{s,f as l,g as d}from"./p-4de316e3.js";const n=class{constructor(o){t(this,o),this.onVote=r(this,"dyteVotePoll",7),this.MAX_VOTES_RENDER=10,this.poll=void 0,this.self=void 0,this.permissions=void 0,this.iconPack=a,this.t=i()}vote(t,r){this.poll.voted.includes(this.self)?t.preventDefault():this.onVote.emit({id:this.poll.id,index:r})}render(){const t=this.poll.voted.includes(this.self);return o(e,null,o("div",{class:"ctr"},o("p",{class:"poll-title"},this.t("polls.by")," ",s(l(this.poll.createdBy),20)),o("div",{class:"poll"},o("p",{class:"poll-question"},this.poll.question),o("div",{class:"poll-answers"},o("span",null,this.t("polls.answers")),o("span",null,this.poll.voted.length)),this.poll.options.map(((r,e)=>o("div",{class:{active:r.votes.some((t=>t.id===this.self)),"open-vote":this.permissions.polls.canVote&&!t,"poll-option":!0}},o("div",{class:"poll-option-header","data-disabled":!this.permissions.polls.canVote},o("label",null,!t&&o("input",{disabled:!this.permissions.polls.canVote,readOnly:t,type:"radio",checked:r.votes.some((t=>t.id===this.self)),onClick:t=>this.vote(t,e)}),o("p",null,r.text)),o("span",{class:"counter"},r.count)),o("div",{class:"votes"},r.votes.slice(0,this.MAX_VOTES_RENDER).map((t=>{if(!this.poll.anonymous||this.self===this.poll.createdByUserId)return o("dyte-tooltip",{label:t.name,iconPack:this.iconPack,t:this.t},o("div",{class:"vote"},d(t.name)))})),r.votes.length>this.MAX_VOTES_RENDER&&o("dyte-tooltip",{label:`+${r.votes.length-this.MAX_VOTES_RENDER} more `,iconPack:this.iconPack,t:this.t},o("div",{class:"vote"},"+",r.votes.length-this.MAX_VOTES_RENDER)))))))))}};n.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}.ctr{margin-bottom:var(--dyte-space-3, 12px);display:flex;width:100%;flex-direction:column;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.poll-title{margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);margin-right:var(--dyte-space-4, 16px);font-size:12px}.poll{border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));display:flex;flex-direction:column;padding:var(--dyte-space-4, 16px)}.poll-question{padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px);font-size:14px;overflow-wrap:break-word}.poll-answers{display:flex;flex-direction:row;justify-content:space-between;font-size:12px;margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-1, 4px);padding-left:var(--dyte-space-1, 4px);padding-right:var(--dyte-space-3, 12px)}.poll-option{display:flex;flex-direction:column;margin-top:var(--dyte-space-2, 8px);border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--dyte-space-2, 8px);word-break:break-word}.poll-option.open-vote:hover{cursor:pointer}.poll-option label{display:flex;flex-direction:row;cursor:inherit}.poll-option-header{display:flex;flex-direction:row;justify-content:space-between;padding:var(--dyte-space-1, 4px)}.poll-option-header[data-disabled='true']:hover{cursor:default}.poll-option-header input{margin-top:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-0, 0px);margin-left:var(--dyte-space-0\\.5, 2px);margin-right:var(--dyte-space-2, 8px);cursor:inherit}.poll-option-header .counter{color:rgb(var(--dyte-colors-text-1000, 255 255 255));font-size:12px}.votes{margin-top:var(--dyte-space-1, 4px);display:flex;flex-direction:row;flex-wrap:wrap}.vote{margin-right:var(--dyte-space-1, 4px);height:var(--dyte-space-8, 32px);width:var(--dyte-space-8, 32px);display:flex;align-items:center;justify-content:center;border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-video-bg, 24 24 24) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));border-radius:var(--dyte-border-radius-none, 0);clip-path:circle()}.active{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-on-brand-900, var(--dyte-colors-text-900, 255 255 255 / 0.88)))}.active .counter{color:rgb(var(--dyte-colors-text-on-brand-900, var(--dyte-colors-text-900, 255 255 255 / 0.88)))}";const p=class{constructor(o){t(this,o),this.onCreate=r(this,"dyteCreatePoll",7),this.iconPack=a,this.t=i(),this.options=["",""],this.anonymous=!1,this.hideVotes=!0,this.error=void 0}removeOption(t){var r;this.options=this.options.filter(((r,o)=>o!==t)),1===(null===(r=this.error)||void 0===r?void 0:r.code)&&(this.error=void 0)}addOption(){this.options=[...this.options,""]}updateOption(t,r){var o;this.options[r]=t.target.value,1===(null===(o=this.error)||void 0===o?void 0:o.code)&&(this.error=void 0)}handleSubmit(){const t={question:this.question.value,options:this.options,anonymous:this.anonymous,hideVotes:!!this.anonymous||this.hideVotes};t.question?this.options.filter((t=>""===t.trim())).length>0?this.error={code:1,message:this.t("polls.errors.empty_option")}:this.onCreate.emit(t):this.error={code:0,message:this.t("polls.errors.question_required")}}render(){return o(e,null,o("div",{class:"create-poll"},o("p",null,this.t("polls.question")),o("textarea",{onInput:()=>{this.error&&0===this.error.code&&(this.error=void 0)},ref:t=>this.question=t,placeholder:this.t("polls.question.placeholder")}),this.options.map(((t,r)=>o("div",{class:"option"},o("input",{placeholder:this.t("polls.option.placeholder"),value:t,onInput:t=>this.updateOption(t,r)}),r>1&&o("dyte-button",{kind:"icon",class:"auto remove-option",variant:"secondary",onClick:()=>this.removeOption(r),iconPack:this.iconPack,t:this.t},o("dyte-icon",{icon:this.iconPack.subtract,iconPack:this.iconPack,t:this.t}))))),o("dyte-button",{class:"add-option",variant:"secondary",onClick:()=>this.addOption(),iconPack:this.iconPack,t:this.t},this.t("polls.option")),o("label",null,o("input",{id:"anonymous",type:"checkbox",onChange:t=>this.anonymous=t.target.checked}),this.t("polls.results.anon")),o("label",null,o("input",{id:"hideVotes",type:"checkbox",disabled:this.anonymous,checked:!!this.anonymous||this.hideVotes,onChange:t=>this.hideVotes=t.target.checked}),this.t("polls.results.hide")),o("dyte-button",{kind:"wide",onClick:()=>this.handleSubmit(),iconPack:this.iconPack,t:this.t},this.t("polls.create")),this.error&&o("span",{class:"error-text"},this.error.message)))}};p.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}.create-poll{margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);display:flex;flex:1 1 0%;flex-direction:column;padding:var(--dyte-space-3, 12px);border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.create-poll p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px);text-align:center}.create-poll textarea{display:flex;border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-2, 8px);font-family:var(--dyte-font-family, sans-serif);border-width:var(--dyte-border-width-none, 0);border-style:none;font-weight:500;outline:2px solid transparent;outline-offset:2px;margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);resize:vertical;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.create-poll textarea:focus{outline-style:solid;outline-offset:2px;outline-color:rgb(var(--dyte-colors-background-600, 60 60 60))}.option{display:flex;flex-direction:row;align-items:center;margin-bottom:var(--dyte-space-3, 12px);width:100%}.option input{width:100%;border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-2, 8px);border-width:var(--dyte-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.remove-option{margin-left:var(--dyte-space-2, 8px);width:var(--dyte-space-10, 40px);border-radius:var(--dyte-border-radius-sm, 4px)}.add-option{margin-bottom:var(--dyte-space-3, 12px)}label{margin-bottom:var(--dyte-space-3, 12px)}.error-text{margin-top:var(--dyte-space-3, 12px);text-align:center;font-size:12px;--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}";export{n as dyte_poll,p as dyte_poll_form}
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@dytesdk/ui-kit';



import type { States as IDyteAiStates } from '@dytesdk/ui-kit';
export declare interface DyteAi extends Components.DyteAi {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteAiStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'defaultSection', 'iconPack', 'meeting', 'size', 'states', 't', 'view']
})
@Component({
  selector: 'dyte-ai',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'defaultSection', 'iconPack', 'meeting', 'size', 'states', 't', 'view']
})
export class DyteAi {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteAiChat extends Components.DyteAiChat {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['t']
})
@Component({
  selector: 'dyte-ai-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['t']
})
export class DyteAiChat {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAiHome extends Components.DyteAiHome {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['initialMessages', 'meeting']
})
@Component({
  selector: 'dyte-ai-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['initialMessages', 'meeting']
})
export class DyteAiHome {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteAiToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteAiToggle extends Components.DyteAiToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteAiToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-ai-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteAiToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteAiTranscriptions extends Components.DyteAiTranscriptions {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['initialTranscriptions', 'meeting', 't']
})
@Component({
  selector: 'dyte-ai-transcriptions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['initialTranscriptions', 'meeting', 't']
})
export class DyteAiTranscriptions {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAudioGrid extends Components.DyteAudioGrid {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'hideSelf', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-audio-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'hideSelf', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteAudioGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAudioTile extends Components.DyteAudioTile {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'participant', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-audio-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'participant', 'size', 'states', 't']
})
export class DyteAudioTile {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAudioVisualizer extends Components.DyteAudioVisualizer {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['hideMuted', 'iconPack', 'isScreenShare', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-audio-visualizer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['hideMuted', 'iconPack', 'isScreenShare', 'participant', 'size', 't', 'variant']
})
export class DyteAudioVisualizer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAvatar extends Components.DyteAvatar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'participant', 'size', 't', 'variant']
})
export class DyteAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteBreakoutRoomManager extends Components.DyteBreakoutRoomManager {
  /**
   * Event for adding a participant 
   */
  participantsAdd: EventEmitter<CustomEvent<null>>;
  /**
   * On Delete event emitter 
   */
  participantDelete: EventEmitter<CustomEvent<{ customParticipantId: string; }>>;
  /**
   * Event for joining a room 
   */
  roomJoin: EventEmitter<CustomEvent<null>>;
  /**
   * Event for deleting room 
   */
  delete: EventEmitter<CustomEvent<string>>;
  /**
   * Event for updating room details 
   */
  update: EventEmitter<CustomEvent<{ title: string | undefined; id: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['allowDelete', 'assigningParticipants', 'defaultExpanded', 'iconPack', 'isDragMode', 'meeting', 'mode', 'room', 'states', 't']
})
@Component({
  selector: 'dyte-breakout-room-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowDelete', 'assigningParticipants', 'defaultExpanded', 'iconPack', 'isDragMode', 'meeting', 'mode', 'room', 'states', 't']
})
export class DyteBreakoutRoomManager {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['participantsAdd', 'participantDelete', 'roomJoin', 'delete', 'update']);
  }
}


export declare interface DyteBreakoutRoomParticipants extends Components.DyteBreakoutRoomParticipants {
  /**
   * Emits an event when selected participants are updated 
   */
  selectedParticipantsUpdate: EventEmitter<CustomEvent<string[]>>;
  /**
   * Emits an event when all participants are selected or deselected 
   */
  allParticipantsToggleUpdate: EventEmitter<CustomEvent<string[]>>;
  /**
   * Emits an event when participants are dragged 
   */
  participantsDragging: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'participantIds', 'selectedParticipantIds', 't']
})
@Component({
  selector: 'dyte-breakout-room-participants',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'participantIds', 'selectedParticipantIds', 't']
})
export class DyteBreakoutRoomParticipants {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selectedParticipantsUpdate', 'allParticipantsToggleUpdate', 'participantsDragging']);
  }
}

import type { States as IDyteBreakoutRoomsManagerStates } from '@dytesdk/ui-kit';
export declare interface DyteBreakoutRoomsManager extends Components.DyteBreakoutRoomsManager {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<Partial<IDyteBreakoutRoomsManagerStates>>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-breakout-rooms-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DyteBreakoutRoomsManager {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteBreakoutRoomsToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteBreakoutRoomsToggle extends Components.DyteBreakoutRoomsToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<Partial<IDyteBreakoutRoomsToggleStates>>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-breakout-rooms-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteBreakoutRoomsToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteBroadcastMessageModalStates } from '@dytesdk/ui-kit';
export declare interface DyteBroadcastMessageModal extends Components.DyteBroadcastMessageModal {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteBroadcastMessageModalStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-broadcast-message-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DyteBroadcastMessageModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteButton extends Components.DyteButton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'iconPack', 'kind', 'reverse', 'size', 't', 'type', 'variant']
})
@Component({
  selector: 'dyte-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'iconPack', 'kind', 'reverse', 'size', 't', 'type', 'variant']
})
export class DyteButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteCameraSelector extends Components.DyteCameraSelector {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-camera-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteCameraSelector {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteCameraToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteCameraToggle extends Components.DyteCameraToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteCameraToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-camera-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteCameraToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteCaptionToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteCaptionToggle extends Components.DyteCaptionToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteCaptionToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-caption-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteCaptionToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteChannelCreatorStates } from '@dytesdk/ui-kit';
export declare interface DyteChannelCreator extends Components.DyteChannelCreator {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteChannelCreatorStates>>;
  /**
   * Emits event to switch channel 
   */
  switchChannel: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-channel-creator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 't']
})
export class DyteChannelCreator {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'switchChannel']);
  }
}


export declare interface DyteChannelDetails extends Components.DyteChannelDetails {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['channel', 'iconPack', 'members', 't']
})
@Component({
  selector: 'dyte-channel-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['channel', 'iconPack', 'members', 't']
})
export class DyteChannelDetails {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteChannelHeader extends Components.DyteChannelHeader {
  /**
   * event triggered for search 
   */
  search: EventEmitter<CustomEvent<string>>;
  /**
   * event triggered for search 
   */
  searchDismissed: EventEmitter<CustomEvent<any>>;
  /**
   * Event emitted when back button is clicked 
   */
  back: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['channel', 'iconPack', 'meeting', 'showBackButton', 't']
})
@Component({
  selector: 'dyte-channel-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['channel', 'iconPack', 'meeting', 'showBackButton', 't']
})
export class DyteChannelHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['search', 'searchDismissed', 'back']);
  }
}


export declare interface DyteChannelSelectorUi extends Components.DyteChannelSelectorUi {
  /**
   * On channel changed 
   */
  channelChanged: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['channels', 'iconPack', 'selectedChannelId', 'showRecentMessage', 't']
})
@Component({
  selector: 'dyte-channel-selector-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['channels', 'iconPack', 'selectedChannelId', 'showRecentMessage', 't']
})
export class DyteChannelSelectorUi {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['channelChanged']);
  }
}

import type { IconPack as IDyteChannelSelectorViewIconPack } from '@dytesdk/ui-kit';
export declare interface DyteChannelSelectorView extends Components.DyteChannelSelectorView {
  /**
   * Event emitted when selected channel changes 
   */
  channelChange: EventEmitter<CustomEvent<{ id: string; name: string; avatarUrl?: string; icon?: keyof IDyteChannelSelectorViewIconPack; latestMessage?: string; latestMessageTime?: Date; unreadCount?: number; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['channels', 'disableSearch', 'hideAvatar', 'iconPack', 'selectedChannelId', 't', 'viewAs']
})
@Component({
  selector: 'dyte-channel-selector-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['channels', 'disableSearch', 'hideAvatar', 'iconPack', 'selectedChannelId', 't', 'viewAs']
})
export class DyteChannelSelectorView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['channelChange']);
  }
}

import type { States as IDyteChatStates } from '@dytesdk/ui-kit';
export declare interface DyteChat extends Components.DyteChat {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteChatStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'disablePrivateChat', 'displayFilter', 'iconPack', 'meeting', 'privatePresetFilter', 'size', 't']
})
@Component({
  selector: 'dyte-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'disablePrivateChat', 'displayFilter', 'iconPack', 'meeting', 'privatePresetFilter', 'size', 't']
})
export class DyteChat {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { DyteNewMessageEvent as IDyteChatComposerUiDyteNewMessageEvent } from '@dytesdk/ui-kit';
export declare interface DyteChatComposerUi extends Components.DyteChatComposerUi {
  /**
   * Event emitted when new message is submitted 
   */
  dyteNewMessage: EventEmitter<CustomEvent<IDyteChatComposerUiDyteNewMessageEvent>>;
  /**
   * Event emitted when message is edited 
   */
  dyteEditMessage: EventEmitter<CustomEvent<{ id: string; message: string; channelId?: string; }>>;
  /**
   * Event emitted when message editing is cancelled 
   */
  dyteEditCancelled: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['canSendFiles', 'canSendTextMessage', 'channelId', 'disableEmojiPicker', 'iconPack', 'members', 'prefill', 'size', 't']
})
@Component({
  selector: 'dyte-chat-composer-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['canSendFiles', 'canSendTextMessage', 'channelId', 'disableEmojiPicker', 'iconPack', 'members', 'prefill', 'size', 't']
})
export class DyteChatComposerUi {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteNewMessage', 'dyteEditMessage', 'dyteEditCancelled']);
  }
}

import type { NewMessageEvent as IDyteChatComposerViewNewMessageEvent } from '@dytesdk/ui-kit';
export declare interface DyteChatComposerView extends Components.DyteChatComposerView {
  /**
   * Event emitted when new message is submitted 
   */
  newMessage: EventEmitter<CustomEvent<IDyteChatComposerViewNewMessageEvent>>;
  /**
   * Event emitted when message is edited 
   */
  editMessage: EventEmitter<CustomEvent<string>>;
  /**
   * Event emitted when message editing is cancelled 
   */
  editCancel: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when quoted message is dismissed 
   */
  quotedMessageDismiss: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['canSendFiles', 'canSendTextMessage', 'disableEmojiPicker', 'iconPack', 'inputTextPlaceholder', 'isEditing', 'maxLength', 'message', 'quotedMessage', 'rateLimits', 'storageKey', 't']
})
@Component({
  selector: 'dyte-chat-composer-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['canSendFiles', 'canSendTextMessage', 'disableEmojiPicker', 'iconPack', 'inputTextPlaceholder', 'isEditing', 'maxLength', 'message', 'quotedMessage', 'rateLimits', 'storageKey', 't']
})
export class DyteChatComposerView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['newMessage', 'editMessage', 'editCancel', 'quotedMessageDismiss']);
  }
}

import type { Message as IDyteChatMessageMessage } from '@dytesdk/ui-kit';
export declare interface DyteChatMessage extends Components.DyteChatMessage {
  /**
   * Event for when edit is clicked on a message 
   */
  edit: EventEmitter<CustomEvent<IDyteChatMessageMessage>>;
  /**
   * Event for when reply is clicked on a message 
   */
  reply: EventEmitter<CustomEvent<IDyteChatMessageMessage>>;
  /**
   * Event for when pin is clicked on a message 
   */
  pin: EventEmitter<CustomEvent<IDyteChatMessageMessage>>;
  /**
   * Event for when edit is clicked on a message 
   */
  delete: EventEmitter<CustomEvent<IDyteChatMessageMessage>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['alignRight', 'canDelete', 'canEdit', 'canPin', 'canReply', 'child', 'disableControls', 'hideAvatar', 'iconPack', 'isContinued', 'isSelf', 'isUnread', 'leftAlign', 'message', 'senderDisplayPicture', 'size', 't']
})
@Component({
  selector: 'dyte-chat-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['alignRight', 'canDelete', 'canEdit', 'canPin', 'canReply', 'child', 'disableControls', 'hideAvatar', 'iconPack', 'isContinued', 'isSelf', 'isUnread', 'leftAlign', 'message', 'senderDisplayPicture', 'size', 't']
})
export class DyteChatMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['edit', 'reply', 'pin', 'delete']);
  }
}

import type { Message as IDyteChatMessagesUiMessage } from '@dytesdk/ui-kit';
import type { States as IDyteChatMessagesUiStates } from '@dytesdk/ui-kit';
export declare interface DyteChatMessagesUi extends Components.DyteChatMessagesUi {
  /**
   * Event emitted when a message is pinned or unpinned 
   */
  pinMessage: EventEmitter<CustomEvent<IDyteChatMessagesUiMessage>>;
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteChatMessagesUiStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['canPinMessages', 'iconPack', 'messages', 'selectedGroup', 'selfUserId', 'size', 't']
})
@Component({
  selector: 'dyte-chat-messages-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['canPinMessages', 'iconPack', 'messages', 'selectedGroup', 'selfUserId', 'size', 't']
})
export class DyteChatMessagesUi {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pinMessage', 'dyteStateUpdate']);
  }
}

import type { TextMessage as IDyteChatMessagesUiPaginatedTextMessage } from '@dytesdk/ui-kit';
import type { Message as IDyteChatMessagesUiPaginatedMessage } from '@dytesdk/ui-kit';
import type { States as IDyteChatMessagesUiPaginatedStates } from '@dytesdk/ui-kit';
export declare interface DyteChatMessagesUiPaginated extends Components.DyteChatMessagesUiPaginated {
  /**
   * Event for editing a message 
   */
  editMessageInit: EventEmitter<CustomEvent<{ payload: IDyteChatMessagesUiPaginatedTextMessage; flags: { isReply?: boolean; isEdit?: boolean }; }>>;
  /**
   * Event emitted when a message is pinned or unpinned 
   */
  pinMessage: EventEmitter<CustomEvent<IDyteChatMessagesUiPaginatedMessage>>;
  /**
   * Event emitted when a message is deleted 
   */
  deleteMessage: EventEmitter<CustomEvent<IDyteChatMessagesUiPaginatedMessage>>;
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteChatMessagesUiPaginatedStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'leftAlign', 'meeting', 'selectedChannel', 'selectedChannelId', 'size', 't']
})
@Component({
  selector: 'dyte-chat-messages-ui-paginated',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'leftAlign', 'meeting', 'selectedChannel', 'selectedChannelId', 'size', 't']
})
export class DyteChatMessagesUiPaginated {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['editMessageInit', 'pinMessage', 'deleteMessage', 'dyteStateUpdate']);
  }
}


export declare interface DyteChatSearchResults extends Components.DyteChatSearchResults {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['channelId', 'iconPack', 'meeting', 'query', 't']
})
@Component({
  selector: 'dyte-chat-search-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['channelId', 'iconPack', 'meeting', 'query', 't']
})
export class DyteChatSearchResults {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { ChatGroupChangedType as IDyteChatSelectorUiChatGroupChangedType } from '@dytesdk/ui-kit';
export declare interface DyteChatSelectorUi extends Components.DyteChatSelectorUi {
  /**
   * Event emitted when chat scope is changed 
   */
  dyteChatGroupChanged: EventEmitter<CustomEvent<IDyteChatSelectorUiChatGroupChangedType>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['groups', 'iconPack', 'selectedGroupId', 'selfUserId', 't', 'unreadCounts']
})
@Component({
  selector: 'dyte-chat-selector-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['groups', 'iconPack', 'selectedGroupId', 'selfUserId', 't', 'unreadCounts']
})
export class DyteChatSelectorUi {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteChatGroupChanged']);
  }
}

import type { States as IDyteChatToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteChatToggle extends Components.DyteChatToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteChatToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-chat-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteChatToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteClock extends Components.DyteClock {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 't']
})
export class DyteClock {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteConfirmationModalStates } from '@dytesdk/ui-kit';
export declare interface DyteConfirmationModal extends Components.DyteConfirmationModal {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteConfirmationModalStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-confirmation-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DyteConfirmationModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteControlbar extends Components.DyteControlbar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-controlbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteControlbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteControlbarButton extends Components.DyteControlbarButton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['brandIcon', 'disabled', 'icon', 'iconPack', 'isLoading', 'label', 'showWarning', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-controlbar-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['brandIcon', 'disabled', 'icon', 'iconPack', 'isLoading', 'label', 'showWarning', 'size', 't', 'variant']
})
export class DyteControlbarButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteCounter extends Components.DyteCounter {
  /**
   * On change event emitter 
   */
  valueChange: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'minValue', 'size', 't', 'value']
})
@Component({
  selector: 'dyte-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'minValue', 'size', 't', 'value']
})
export class DyteCounter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}

import type { States as IDyteDebuggerStates } from '@dytesdk/ui-kit';
export declare interface DyteDebugger extends Components.DyteDebugger {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteDebuggerStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteDebugger {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteDebuggerAudio extends Components.DyteDebuggerAudio {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteDebuggerAudio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDebuggerScreenshare extends Components.DyteDebuggerScreenshare {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-screenshare',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteDebuggerScreenshare {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDebuggerSystem extends Components.DyteDebuggerSystem {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-system',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteDebuggerSystem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteDebuggerToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteDebuggerToggle extends Components.DyteDebuggerToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteDebuggerToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-debugger-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteDebuggerToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteDebuggerVideo extends Components.DyteDebuggerVideo {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteDebuggerVideo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDialog extends Components.DyteDialog {
  /**
   * Event emitted when dialog is closed 
   */
  dyteDialogClose: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'disableEscapeKey', 'hideCloseButton', 'iconPack', 'meeting', 'open', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'disableEscapeKey', 'hideCloseButton', 'iconPack', 'meeting', 'open', 'size', 'states', 't']
})
export class DyteDialog {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteDialogClose']);
  }
}

import type { States as IDyteDialogManagerStates } from '@dytesdk/ui-kit';
export declare interface DyteDialogManager extends Components.DyteDialogManager {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteDialogManagerStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-dialog-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteDialogManager {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteDraftAttachmentView extends Components.DyteDraftAttachmentView {
  /**
   * Event triggered when the attachment is deleted 
   */
  deleteAttachment: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attachment', 'iconPack', 't']
})
@Component({
  selector: 'dyte-draft-attachment-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attachment', 'iconPack', 't']
})
export class DyteDraftAttachmentView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['deleteAttachment']);
  }
}


export declare interface DyteEmojiPicker extends Components.DyteEmojiPicker {
  /**
   * Close event 
   */
  pickerClose: EventEmitter<CustomEvent<void>>;
  /**
   * Event which is emitted when an Emoji is clicked 
   */
  dyteEmojiClicked: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-emoji-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 't']
})
export class DyteEmojiPicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pickerClose', 'dyteEmojiClicked']);
  }
}


export declare interface DyteEmojiPickerButton extends Components.DyteEmojiPickerButton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'isActive', 't']
})
@Component({
  selector: 'dyte-emoji-picker-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'isActive', 't']
})
export class DyteEmojiPickerButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteEndedScreen extends Components.DyteEndedScreen {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-ended-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteEndedScreen {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteFileDropzone extends Components.DyteFileDropzone {
  /**
   * drop event callback 
   */
  dropCallback: EventEmitter<CustomEvent<DragEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['hostEl', 'iconPack', 't']
})
@Component({
  selector: 'dyte-file-dropzone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['hostEl', 'iconPack', 't']
})
export class DyteFileDropzone {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dropCallback']);
  }
}


export declare interface DyteFileMessage extends Components.DyteFileMessage {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
@Component({
  selector: 'dyte-file-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
export class DyteFileMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteFileMessageView extends Components.DyteFileMessageView {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'name', 'size', 't', 'url']
})
@Component({
  selector: 'dyte-file-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'name', 'size', 't', 'url']
})
export class DyteFileMessageView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteFilePickerButton extends Components.DyteFilePickerButton {
  /**
   * Event when a file is selected for upload 
   */
  fileChange: EventEmitter<CustomEvent<File>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['filter', 'icon', 'iconPack', 'label', 't']
})
@Component({
  selector: 'dyte-file-picker-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['filter', 'icon', 'iconPack', 'label', 't']
})
export class DyteFilePickerButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['fileChange']);
  }
}

import type { States as IDyteFullscreenToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteFullscreenToggle extends Components.DyteFullscreenToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteFullscreenToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'size', 'states', 't', 'targetElement', 'variant']
})
@Component({
  selector: 'dyte-fullscreen-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'size', 'states', 't', 'targetElement', 'variant']
})
export class DyteFullscreenToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteGridStates } from '@dytesdk/ui-kit';
export declare interface DyteGrid extends Components.DyteGrid {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteGridStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'overrides', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'overrides', 'size', 'states', 't']
})
export class DyteGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteGridPagination extends Components.DyteGridPagination {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-grid-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteGridPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteHeader extends Components.DyteHeader {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteIcon extends Components.DyteIcon {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['icon', 'iconPack', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['icon', 'iconPack', 'size', 't', 'variant']
})
export class DyteIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteIdleScreen extends Components.DyteIdleScreen {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-idle-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 't']
})
export class DyteIdleScreen {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteImageMessageStates } from '@dytesdk/ui-kit';
export declare interface DyteImageMessage extends Components.DyteImageMessage {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteImageMessageStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
@Component({
  selector: 'dyte-image-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
export class DyteImageMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteImageMessageView extends Components.DyteImageMessageView {
  /**
   * preview event 
   */
  preview: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 't', 'url']
})
@Component({
  selector: 'dyte-image-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 't', 'url']
})
export class DyteImageMessageView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['preview']);
  }
}


export declare interface DyteImageViewer extends Components.DyteImageViewer {
  /**
   * Emitted when viewer should be closed 
   */
  close: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'image', 'size', 't']
})
@Component({
  selector: 'dyte-image-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'image', 'size', 't']
})
export class DyteImageViewer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['close']);
  }
}


export declare interface DyteInformationTooltip extends Components.DyteInformationTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack']
})
@Component({
  selector: 'dyte-information-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack']
})
export class DyteInformationTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteJoinStageStates } from '@dytesdk/ui-kit';
export declare interface DyteJoinStage extends Components.DyteJoinStage {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteJoinStageStates>>;
  /**
   * Event which is emitted when user confirms joining stage 
   */
  dyteJoinStage: EventEmitter<CustomEvent<void>>;
  /**
   * Event which is emitted when user cancel joining stage 
   */
  dyteLeaveStage: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'dataConfig', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-join-stage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'dataConfig', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteJoinStage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'dyteJoinStage', 'dyteLeaveStage']);
  }
}

import type { States as IDyteLeaveButtonStates } from '@dytesdk/ui-kit';
export declare interface DyteLeaveButton extends Components.DyteLeaveButton {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteLeaveButtonStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-leave-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'size', 't', 'variant']
})
export class DyteLeaveButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteLeaveMeetingStates } from '@dytesdk/ui-kit';
export declare interface DyteLeaveMeeting extends Components.DyteLeaveMeeting {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteLeaveMeetingStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-leave-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DyteLeaveMeeting {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteLivestreamIndicator extends Components.DyteLivestreamIndicator {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-livestream-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't']
})
export class DyteLivestreamIndicator {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteLivestreamPlayer extends Components.DyteLivestreamPlayer {
  /**
   * Emit API error events 
   */
  dyteAPIError: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-livestream-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't']
})
export class DyteLivestreamPlayer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteAPIError']);
  }
}

import type { States as IDyteLivestreamToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteLivestreamToggle extends Components.DyteLivestreamToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteLivestreamToggleStates>>;
  /**
   * Emit API error events 
   */
  dyteAPIError: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-livestream-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteLivestreamToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'dyteAPIError']);
  }
}


export declare interface DyteLogo extends Components.DyteLogo {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'logoUrl', 'meeting', 't']
})
@Component({
  selector: 'dyte-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'logoUrl', 'meeting', 't']
})
export class DyteLogo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMarkdownView extends Components.DyteMarkdownView {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['maxLength', 'text']
})
@Component({
  selector: 'dyte-markdown-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['maxLength', 'text']
})
export class DyteMarkdownView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteMeetingStates } from '@dytesdk/ui-kit';
export declare interface DyteMeeting extends Components.DyteMeeting {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<Partial<IDyteMeetingStates>>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['applyDesignSystem', 'config', 'gridLayout', 'iconPackUrl', 'leaveOnUnmount', 'loadConfigFromPreset', 'meeting', 'mode', 'showSetupScreen', 'size', 't']
})
@Component({
  selector: 'dyte-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['applyDesignSystem', 'config', 'gridLayout', 'iconPackUrl', 'leaveOnUnmount', 'loadConfigFromPreset', 'meeting', 'mode', 'showSetupScreen', 'size', 't']
})
export class DyteMeeting {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteMeetingTitle extends Components.DyteMeetingTitle {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-meeting-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 't']
})
export class DyteMeetingTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMenu extends Components.DyteMenu {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'offset', 'placement', 'size', 't']
})
@Component({
  selector: 'dyte-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'offset', 'placement', 'size', 't']
})
export class DyteMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMenuItem extends Components.DyteMenuItem {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'size', 't']
})
@Component({
  selector: 'dyte-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'size', 't']
})
export class DyteMenuItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMenuList extends Components.DyteMenuList {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-menu-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 't']
})
export class DyteMenuList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMessageListView extends Components.DyteMessageListView {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['estimateItemSize', 'iconPack', 'loadMore', 'messages', 'renderer', 'visibleItemsCount']
})
@Component({
  selector: 'dyte-message-list-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['estimateItemSize', 'iconPack', 'loadMore', 'messages', 'renderer', 'visibleItemsCount']
})
export class DyteMessageListView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMessageView extends Components.DyteMessageView {
  /**
   * action event 
   */
  action: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['actions', 'authorName', 'avatarUrl', 'hideAuthorName', 'hideAvatar', 'hideMetadata', 'iconPack', 'time', 'variant', 'viewType']
})
@Component({
  selector: 'dyte-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['actions', 'authorName', 'avatarUrl', 'hideAuthorName', 'hideAvatar', 'hideMetadata', 'iconPack', 'time', 'variant', 'viewType']
})
export class DyteMessageView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['action']);
  }
}

import type { States as IDyteMicToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteMicToggle extends Components.DyteMicToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteMicToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-mic-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteMicToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteMicrophoneSelector extends Components.DyteMicrophoneSelector {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-microphone-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteMicrophoneSelector {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMixedGrid extends Components.DyteMixedGrid {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'plugins', 'screenShareParticipants', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-mixed-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'plugins', 'screenShareParticipants', 'size', 'states', 't']
})
export class DyteMixedGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteMoreToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteMoreToggle extends Components.DyteMoreToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteMoreToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-more-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'size', 'states', 't']
})
export class DyteMoreToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteMuteAllButtonStates } from '@dytesdk/ui-kit';
export declare interface DyteMuteAllButton extends Components.DyteMuteAllButton {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteMuteAllButtonStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-mute-all-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteMuteAllButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteMuteAllConfirmationStates } from '@dytesdk/ui-kit';
export declare interface DyteMuteAllConfirmation extends Components.DyteMuteAllConfirmation {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteMuteAllConfirmationStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-mute-all-confirmation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DyteMuteAllConfirmation {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteNameTag extends Components.DyteNameTag {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-name-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 'size', 't', 'variant']
})
export class DyteNameTag {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteNetworkIndicator extends Components.DyteNetworkIndicator {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 't']
})
@Component({
  selector: 'dyte-network-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 't']
})
export class DyteNetworkIndicator {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteNotification extends Components.DyteNotification {
  /**
   * Dismiss event 
   */
  dyteNotificationDismiss: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'notification', 'size', 't']
})
@Component({
  selector: 'dyte-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'notification', 'size', 't']
})
export class DyteNotification {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteNotificationDismiss']);
  }
}


export declare interface DyteNotifications extends Components.DyteNotifications {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-notifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteNotifications {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteOverlayModalStates } from '@dytesdk/ui-kit';
export declare interface DyteOverlayModal extends Components.DyteOverlayModal {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteOverlayModalStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-overlay-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DyteOverlayModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DytePaginatedList extends Components.DytePaginatedList {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['autoScroll', 'createNodes', 'emptyListLabel', 'fetchData', 'iconPack', 'pageSize', 'pagesAllowed', 'selectedItemId', 't'],
  methods: ['onNewNode', 'onNodeDelete', 'onNodeUpdate']
})
@Component({
  selector: 'dyte-paginated-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoScroll', 'createNodes', 'emptyListLabel', 'fetchData', 'iconPack', 'pageSize', 'pagesAllowed', 'selectedItemId', 't']
})
export class DytePaginatedList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipant extends Components.DyteParticipant {
  /**
   * Emit dyte notifications 
   */
  dyteSendNotification: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'participant', 't', 'view']
})
@Component({
  selector: 'dyte-participant',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'participant', 't', 'view']
})
export class DyteParticipant {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteSendNotification']);
  }
}


export declare interface DyteParticipantCount extends Components.DyteParticipantCount {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-participant-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't']
})
export class DyteParticipantCount {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantSetup extends Components.DyteParticipantSetup {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'isPreview', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-participant-setup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'isPreview', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant']
})
export class DyteParticipantSetup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { Peer as IDyteParticipantTilePeer } from '@dytesdk/ui-kit';
export declare interface DyteParticipantTile extends Components.DyteParticipantTile {
  /**
   * Event triggered when tile is loaded 
   */
  tileLoad: EventEmitter<CustomEvent<{ participant: IDyteParticipantTilePeer; videoElement: HTMLVideoElement }>>;
  /**
   * Event triggered when tile is unloaded 
   */
  tileUnload: EventEmitter<CustomEvent<IDyteParticipantTilePeer>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'isPreview', 'meeting', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-participant-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'isPreview', 'meeting', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant']
})
export class DyteParticipantTile {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tileLoad', 'tileUnload']);
  }
}

import type { States as IDyteParticipantsStates } from '@dytesdk/ui-kit';
export declare interface DyteParticipants extends Components.DyteParticipants {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteParticipantsStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'defaultParticipantsTabId', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-participants',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'defaultParticipantsTabId', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteParticipants {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteParticipantsAudio extends Components.DyteParticipantsAudio {
  /**
   * Callback to execute when the dialog is closed 
   */
  dialogClose: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-participants-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 't']
})
export class DyteParticipantsAudio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dialogClose']);
  }
}


export declare interface DyteParticipantsStageList extends Components.DyteParticipantsStageList {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-stage-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view']
})
export class DyteParticipantsStageList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantsStageQueue extends Components.DyteParticipantsStageQueue {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-stage-queue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view']
})
export class DyteParticipantsStageQueue {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteParticipantsToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteParticipantsToggle extends Components.DyteParticipantsToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteParticipantsToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-participants-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteParticipantsToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteParticipantsViewerList extends Components.DyteParticipantsViewerList {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-viewer-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view']
})
export class DyteParticipantsViewerList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantsWaitingList extends Components.DyteParticipantsWaitingList {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-waiting-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view']
})
export class DyteParticipantsWaitingList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDytePermissionsMessageStates } from '@dytesdk/ui-kit';
export declare interface DytePermissionsMessage extends Components.DytePermissionsMessage {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDytePermissionsMessageStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-permissions-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'states', 't']
})
export class DytePermissionsMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDytePipToggleStates } from '@dytesdk/ui-kit';
export declare interface DytePipToggle extends Components.DytePipToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDytePipToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-pip-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DytePipToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DytePluginMain extends Components.DytePluginMain {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'plugin', 't']
})
@Component({
  selector: 'dyte-plugin-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'plugin', 't']
})
export class DytePluginMain {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDytePluginsStates } from '@dytesdk/ui-kit';
export declare interface DytePlugins extends Components.DytePlugins {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDytePluginsStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-plugins',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 't']
})
export class DytePlugins {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDytePluginsToggleStates } from '@dytesdk/ui-kit';
export declare interface DytePluginsToggle extends Components.DytePluginsToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDytePluginsToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-plugins-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DytePluginsToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DytePoll extends Components.DytePoll {
  /**
   * Event which is emitted when a poll is voted on 
   */
  dyteVotePoll: EventEmitter<CustomEvent<{ id: string; index: number; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'permissions', 'poll', 'self', 't']
})
@Component({
  selector: 'dyte-poll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'permissions', 'poll', 'self', 't']
})
export class DytePoll {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteVotePoll']);
  }
}

import type { PollObject as IDytePollPollObject } from '@dytesdk/ui-kit';
export declare interface DytePollForm extends Components.DytePollForm {
  /**
   * Event which is emitted when a poll is created 
   */
  dyteCreatePoll: EventEmitter<CustomEvent<IDytePollPollObject>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-poll-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 't']
})
export class DytePollForm {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteCreatePoll']);
  }
}


export declare interface DytePolls extends Components.DytePolls {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-polls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 't']
})
export class DytePolls {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDytePollsToggleStates } from '@dytesdk/ui-kit';
export declare interface DytePollsToggle extends Components.DytePollsToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDytePollsToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-polls-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DytePollsToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteRecordingIndicator extends Components.DyteRecordingIndicator {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-recording-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't']
})
export class DyteRecordingIndicator {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteRecordingToggle extends Components.DyteRecordingToggle {
  /**
   * Emit api error events 
   */
  dyteAPIError: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-recording-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteRecordingToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteAPIError']);
  }
}

import type { States as IDyteScreenShareToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteScreenShareToggle extends Components.DyteScreenShareToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteScreenShareToggleStates>>;
  /**
   * Emit api error events 
   */
  dyteAPIError: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-screen-share-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteScreenShareToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'dyteAPIError']);
  }
}

import type { States as IDyteScreenshareViewStates } from '@dytesdk/ui-kit';
import type { Peer as IDyteScreenshareViewPeer } from '@dytesdk/ui-kit';
export declare interface DyteScreenshareView extends Components.DyteScreenshareView {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteScreenshareViewStates>>;
  /**
   * Emits when video playback happens successfully 
   */
  screensharePlay: EventEmitter<CustomEvent<{ participant: IDyteScreenshareViewPeer; screenshareParticipant: IDyteScreenshareViewPeer; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['hideFullScreenButton', 'iconPack', 'meeting', 'nameTagPosition', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-screenshare-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['hideFullScreenButton', 'iconPack', 'meeting', 'nameTagPosition', 'participant', 'size', 't', 'variant']
})
export class DyteScreenshareView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'screensharePlay']);
  }
}

import type { States as IDyteSettingsStates } from '@dytesdk/ui-kit';
export declare interface DyteSettings extends Components.DyteSettings {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteSettingsStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteSettings {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteSettingsAudioStates } from '@dytesdk/ui-kit';
export declare interface DyteSettingsAudio extends Components.DyteSettingsAudio {
  /**
   * Event updated state 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteSettingsAudioStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-settings-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteSettingsAudio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteSettingsToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteSettingsToggle extends Components.DyteSettingsToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteSettingsToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-settings-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'size', 'states', 't', 'variant']
})
export class DyteSettingsToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteSettingsVideoStates } from '@dytesdk/ui-kit';
export declare interface DyteSettingsVideo extends Components.DyteSettingsVideo {
  /**
   * Emits updated state 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteSettingsVideoStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-settings-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteSettingsVideo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteSetupScreenStates } from '@dytesdk/ui-kit';
export declare interface DyteSetupScreen extends Components.DyteSetupScreen {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteSetupScreenStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-setup-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
export class DyteSetupScreen {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteSidebarStates } from '@dytesdk/ui-kit';
export declare interface DyteSidebar extends Components.DyteSidebar {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteSidebarStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'defaultSection', 'enabledSections', 'iconPack', 'meeting', 'size', 'states', 't', 'view']
})
@Component({
  selector: 'dyte-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'defaultSection', 'enabledSections', 'iconPack', 'meeting', 'size', 'states', 't', 'view']
})
export class DyteSidebar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteSidebarUi extends Components.DyteSidebarUi {
  /**
   * Tab change event 
   */
  tabChange: EventEmitter<CustomEvent<string>>;
  /**
   * Tab change event 
   */
  sidebarClose: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['currentTab', 'hideCloseAction', 'hideHeader', 'iconPack', 't', 'tabs', 'view']
})
@Component({
  selector: 'dyte-sidebar-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['currentTab', 'hideCloseAction', 'hideHeader', 'iconPack', 't', 'tabs', 'view']
})
export class DyteSidebarUi {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange', 'sidebarClose']);
  }
}


export declare interface DyteSimpleGrid extends Components.DyteSimpleGrid {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['aspectRatio', 'config', 'gap', 'iconPack', 'meeting', 'participants', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-simple-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['aspectRatio', 'config', 'gap', 'iconPack', 'meeting', 'participants', 'size', 'states', 't']
})
export class DyteSimpleGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpeakerSelector extends Components.DyteSpeakerSelector {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-speaker-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
export class DyteSpeakerSelector {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpinner extends Components.DyteSpinner {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'size', 't']
})
@Component({
  selector: 'dyte-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'size', 't']
})
export class DyteSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpotlightGrid extends Components.DyteSpotlightGrid {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-spotlight-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'size', 'states', 't']
})
export class DyteSpotlightGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpotlightIndicator extends Components.DyteSpotlightIndicator {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-spotlight-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't']
})
export class DyteSpotlightIndicator {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { States as IDyteStageStates } from '@dytesdk/ui-kit';
export declare interface DyteStage extends Components.DyteStage {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteStageStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-stage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 't']
})
export class DyteStage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}

import type { States as IDyteStageToggleStates } from '@dytesdk/ui-kit';
export declare interface DyteStageToggle extends Components.DyteStageToggle {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteStageToggleStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-stage-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
export class DyteStageToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteSwitch extends Components.DyteSwitch {
  /**
   * Event when switch value is changed 
   */
  dyteChange: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'iconPack', 'readonly', 't']
})
@Component({
  selector: 'dyte-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'iconPack', 'readonly', 't']
})
export class DyteSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteChange']);
  }
}

import type { Tab as IDyteTabBarTab } from '@dytesdk/ui-kit';
export declare interface DyteTabBar extends Components.DyteTabBar {
  /**
   * Set active tab 
   */
  tabChange: EventEmitter<CustomEvent<IDyteTabBarTab>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['activeTab', 'config', 'iconPack', 'layout', 'meeting', 'size', 'states', 't', 'tabs']
})
@Component({
  selector: 'dyte-tab-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activeTab', 'config', 'iconPack', 'layout', 'meeting', 'size', 'states', 't', 'tabs']
})
export class DyteTabBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}


export declare interface DyteTextComposerView extends Components.DyteTextComposerView {
  /**
   * Event emitted when text changes 
   */
  textChange: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'iconPack', 'keyDownHandler', 'maxLength', 'placeholder', 'rateLimitBreached', 't', 'value'],
  methods: ['setText']
})
@Component({
  selector: 'dyte-text-composer-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'iconPack', 'keyDownHandler', 'maxLength', 'placeholder', 'rateLimitBreached', 't', 'value']
})
export class DyteTextComposerView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['textChange']);
  }
}

import type { States as IDyteTextFieldStates } from '@dytesdk/ui-kit';
export declare interface DyteTextField extends Components.DyteTextField {
  /**
   * Emits updated state data 
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteTextFieldStates>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'iconPack', 'placeholder', 't', 'type']
})
@Component({
  selector: 'dyte-text-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'iconPack', 'placeholder', 't', 'type']
})
export class DyteTextField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


export declare interface DyteTextMessage extends Components.DyteTextMessage {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
@Component({
  selector: 'dyte-text-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
export class DyteTextMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteTextMessageView extends Components.DyteTextMessageView {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['isMarkdown', 'text']
})
@Component({
  selector: 'dyte-text-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['isMarkdown', 'text']
})
export class DyteTextMessageView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteTooltip extends Components.DyteTooltip {
  /**
   * Event handler called when the open state of the tooltip changes. 
   */
  dyteOpenChange: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['delay', 'disabled', 'iconPack', 'kind', 'label', 'open', 'placement', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['delay', 'disabled', 'iconPack', 'kind', 'label', 'open', 'placement', 'size', 't', 'variant']
})
export class DyteTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteOpenChange']);
  }
}


export declare interface DyteTranscript extends Components.DyteTranscript {
  /**
   * Dismiss event 
   */
  dyteTranscriptDismiss: EventEmitter<CustomEvent<{ id: string; renderedId: string; }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['t', 'transcript']
})
@Component({
  selector: 'dyte-transcript',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['t', 'transcript']
})
export class DyteTranscript {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteTranscriptDismiss']);
  }
}


export declare interface DyteTranscripts extends Components.DyteTranscripts {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-transcripts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'meeting', 'states', 't']
})
export class DyteTranscripts {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteUiProvider extends Components.DyteUiProvider {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['applyDesignSystem', 'config', 'iconPackUrl', 'joinRoom', 'loadConfigFromPreset', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-ui-provider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['applyDesignSystem', 'config', 'iconPackUrl', 'joinRoom', 'loadConfigFromPreset', 'meeting', 'size', 't']
})
export class DyteUiProvider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteViewerCount extends Components.DyteViewerCount {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['iconPack', 'meeting', 't', 'variant']
})
@Component({
  selector: 'dyte-viewer-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['iconPack', 'meeting', 't', 'variant']
})
export class DyteViewerCount {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteVirtualizedParticipantList extends Components.DyteVirtualizedParticipantList {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['bufferedItemsCount', 'emptyListElement', 'itemHeight', 'items', 'renderItem']
})
@Component({
  selector: 'dyte-virtualized-participant-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['bufferedItemsCount', 'emptyListElement', 'itemHeight', 'items', 'renderItem']
})
export class DyteVirtualizedParticipantList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteWaitingScreen extends Components.DyteWaitingScreen {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['config', 'iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-waiting-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['config', 'iconPack', 'meeting', 't']
})
export class DyteWaitingScreen {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@dytesdk/ui-kit';


@ProxyCmp({
  inputs: ['config', 'defaultSection', 'iconPack', 'meeting', 'size', 'states', 't', 'view']
})
@Component({
  selector: 'dyte-ai',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'defaultSection', 'iconPack', 'meeting', 'size', 'states', 't', 'view'],
})
export class DyteAi {
  protected el: HTMLDyteAiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


import type { States as IDyteAiStates } from '@dytesdk/ui-kit';

export declare interface DyteAi extends Components.DyteAi {
  /**
   * Emits updated state data
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteAiStates>>;
}


@ProxyCmp({
  inputs: ['t']
})
@Component({
  selector: 'dyte-ai-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['t'],
})
export class DyteAiChat {
  protected el: HTMLDyteAiChatElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAiChat extends Components.DyteAiChat {}


@ProxyCmp({
  inputs: ['initialMessages', 'meeting']
})
@Component({
  selector: 'dyte-ai-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['initialMessages', 'meeting'],
})
export class DyteAiHome {
  protected el: HTMLDyteAiHomeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAiHome extends Components.DyteAiHome {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-ai-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteAiToggle {
  protected el: HTMLDyteAiToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['initialTranscriptions', 'meeting', 't']
})
@Component({
  selector: 'dyte-ai-transcriptions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['initialTranscriptions', 'meeting', 't'],
})
export class DyteAiTranscriptions {
  protected el: HTMLDyteAiTranscriptionsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAiTranscriptions extends Components.DyteAiTranscriptions {}


@ProxyCmp({
  inputs: ['config', 'hideSelf', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-audio-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'hideSelf', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteAudioGrid {
  protected el: HTMLDyteAudioGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAudioGrid extends Components.DyteAudioGrid {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'participant', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-audio-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'participant', 'size', 'states', 't'],
})
export class DyteAudioTile {
  protected el: HTMLDyteAudioTileElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAudioTile extends Components.DyteAudioTile {}


@ProxyCmp({
  inputs: ['hideMuted', 'iconPack', 'isScreenShare', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-audio-visualizer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hideMuted', 'iconPack', 'isScreenShare', 'participant', 'size', 't', 'variant'],
})
export class DyteAudioVisualizer {
  protected el: HTMLDyteAudioVisualizerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAudioVisualizer extends Components.DyteAudioVisualizer {}


@ProxyCmp({
  inputs: ['iconPack', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'participant', 'size', 't', 'variant'],
})
export class DyteAvatar {
  protected el: HTMLDyteAvatarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteAvatar extends Components.DyteAvatar {}


@ProxyCmp({
  inputs: ['allowDelete', 'assigningParticipants', 'defaultExpanded', 'iconPack', 'isDragMode', 'meeting', 'mode', 'room', 'states', 't']
})
@Component({
  selector: 'dyte-breakout-room-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowDelete', 'assigningParticipants', 'defaultExpanded', 'iconPack', 'isDragMode', 'meeting', 'mode', 'room', 'states', 't'],
})
export class DyteBreakoutRoomManager {
  protected el: HTMLDyteBreakoutRoomManagerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['participantsAdd', 'participantDelete', 'roomJoin', 'delete', 'update']);
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
  inputs: ['iconPack', 'meeting', 'participantIds', 'selectedParticipantIds', 't']
})
@Component({
  selector: 'dyte-breakout-room-participants',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'participantIds', 'selectedParticipantIds', 't'],
})
export class DyteBreakoutRoomParticipants {
  protected el: HTMLDyteBreakoutRoomParticipantsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selectedParticipantsUpdate', 'allParticipantsToggleUpdate', 'participantsDragging']);
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
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-breakout-rooms-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DyteBreakoutRoomsManager {
  protected el: HTMLDyteBreakoutRoomsManagerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


import type { PartialStateEvent as IDyteBreakoutRoomsManagerPartialStateEvent } from '@dytesdk/ui-kit';

export declare interface DyteBreakoutRoomsManager extends Components.DyteBreakoutRoomsManager {
  /**
   * Emits updated state data
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteBreakoutRoomsManagerPartialStateEvent>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-breakout-rooms-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteBreakoutRoomsToggle {
  protected el: HTMLDyteBreakoutRoomsToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


import type { PartialStateEvent as IDyteBreakoutRoomsTogglePartialStateEvent } from '@dytesdk/ui-kit';

export declare interface DyteBreakoutRoomsToggle extends Components.DyteBreakoutRoomsToggle {
  /**
   * Emits updated state data
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteBreakoutRoomsTogglePartialStateEvent>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-broadcast-message-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DyteBroadcastMessageModal {
  protected el: HTMLDyteBroadcastMessageModalElement;
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
  inputs: ['disabled', 'iconPack', 'kind', 'reverse', 'size', 't', 'type', 'variant']
})
@Component({
  selector: 'dyte-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'iconPack', 'kind', 'reverse', 'size', 't', 'type', 'variant'],
})
export class DyteButton {
  protected el: HTMLDyteButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteButton extends Components.DyteButton {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-camera-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteCameraSelector {
  protected el: HTMLDyteCameraSelectorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteCameraSelector extends Components.DyteCameraSelector {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-camera-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteCameraToggle {
  protected el: HTMLDyteCameraToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-caption-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteCaptionToggle {
  protected el: HTMLDyteCaptionToggleElement;
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
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-channel-creator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 't'],
})
export class DyteChannelCreator {
  protected el: HTMLDyteChannelCreatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'switchChannel']);
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
  inputs: ['channel', 'iconPack', 'members', 't']
})
@Component({
  selector: 'dyte-channel-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['channel', 'iconPack', 'members', 't'],
})
export class DyteChannelDetails {
  protected el: HTMLDyteChannelDetailsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteChannelDetails extends Components.DyteChannelDetails {}


@ProxyCmp({
  inputs: ['channel', 'iconPack', 'meeting', 'showBackButton', 't']
})
@Component({
  selector: 'dyte-channel-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['channel', 'iconPack', 'meeting', 'showBackButton', 't'],
})
export class DyteChannelHeader {
  protected el: HTMLDyteChannelHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['search', 'searchDismissed', 'back']);
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
  inputs: ['channels', 'iconPack', 'selectedChannelId', 'showRecentMessage', 't']
})
@Component({
  selector: 'dyte-channel-selector-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['channels', 'iconPack', 'selectedChannelId', 'showRecentMessage', 't'],
})
export class DyteChannelSelectorUi {
  protected el: HTMLDyteChannelSelectorUiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['channelChanged']);
  }
}


export declare interface DyteChannelSelectorUi extends Components.DyteChannelSelectorUi {
  /**
   * On channel changed
   */
  channelChanged: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['channels', 'disableSearch', 'hideAvatar', 'iconPack', 'selectedChannelId', 't', 'viewAs']
})
@Component({
  selector: 'dyte-channel-selector-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['channels', 'disableSearch', 'hideAvatar', 'iconPack', 'selectedChannelId', 't', 'viewAs'],
})
export class DyteChannelSelectorView {
  protected el: HTMLDyteChannelSelectorViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['channelChange']);
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
  inputs: ['config', 'disablePrivateChat', 'displayFilter', 'iconPack', 'meeting', 'privatePresetFilter', 'size', 't']
})
@Component({
  selector: 'dyte-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'disablePrivateChat', 'displayFilter', 'iconPack', 'meeting', 'privatePresetFilter', 'size', 't'],
})
export class DyteChat {
  protected el: HTMLDyteChatElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['canSendFiles', 'canSendTextMessage', 'channelId', 'disableEmojiPicker', 'iconPack', 'members', 'prefill', 'size', 't']
})
@Component({
  selector: 'dyte-chat-composer-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['canSendFiles', 'canSendTextMessage', 'channelId', 'disableEmojiPicker', 'iconPack', 'members', 'prefill', 'size', 't'],
})
export class DyteChatComposerUi {
  protected el: HTMLDyteChatComposerUiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteNewMessage', 'dyteEditMessage', 'dyteEditCancelled']);
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
  inputs: ['canSendFiles', 'canSendTextMessage', 'disableEmojiPicker', 'iconPack', 'inputTextPlaceholder', 'isEditing', 'maxLength', 'message', 'quotedMessage', 'rateLimits', 'storageKey', 't']
})
@Component({
  selector: 'dyte-chat-composer-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['canSendFiles', 'canSendTextMessage', 'disableEmojiPicker', 'iconPack', 'inputTextPlaceholder', 'isEditing', 'maxLength', 'message', 'quotedMessage', 'rateLimits', 'storageKey', 't'],
})
export class DyteChatComposerView {
  protected el: HTMLDyteChatComposerViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['newMessage', 'editMessage', 'editCancel', 'quotedMessageDismiss']);
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
  inputs: ['alignRight', 'canDelete', 'canEdit', 'canPin', 'canReply', 'child', 'disableControls', 'hideAvatar', 'iconPack', 'isContinued', 'isSelf', 'isUnread', 'leftAlign', 'message', 'senderDisplayPicture', 'size', 't']
})
@Component({
  selector: 'dyte-chat-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignRight', 'canDelete', 'canEdit', 'canPin', 'canReply', 'child', 'disableControls', 'hideAvatar', 'iconPack', 'isContinued', 'isSelf', 'isUnread', 'leftAlign', 'message', 'senderDisplayPicture', 'size', 't'],
})
export class DyteChatMessage {
  protected el: HTMLDyteChatMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['edit', 'reply', 'pin', 'delete']);
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
  inputs: ['canPinMessages', 'iconPack', 'messages', 'selectedGroup', 'selfUserId', 'size', 't']
})
@Component({
  selector: 'dyte-chat-messages-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['canPinMessages', 'iconPack', 'messages', 'selectedGroup', 'selfUserId', 'size', 't'],
})
export class DyteChatMessagesUi {
  protected el: HTMLDyteChatMessagesUiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pinMessage', 'dyteStateUpdate']);
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
  inputs: ['iconPack', 'leftAlign', 'meeting', 'selectedChannel', 'selectedChannelId', 'size', 't']
})
@Component({
  selector: 'dyte-chat-messages-ui-paginated',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'leftAlign', 'meeting', 'selectedChannel', 'selectedChannelId', 'size', 't'],
})
export class DyteChatMessagesUiPaginated {
  protected el: HTMLDyteChatMessagesUiPaginatedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['editMessageInit', 'pinMessage', 'deleteMessage', 'dyteStateUpdate']);
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
  inputs: ['channelId', 'iconPack', 'meeting', 'query', 't']
})
@Component({
  selector: 'dyte-chat-search-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['channelId', 'iconPack', 'meeting', 'query', 't'],
})
export class DyteChatSearchResults {
  protected el: HTMLDyteChatSearchResultsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteChatSearchResults extends Components.DyteChatSearchResults {}


@ProxyCmp({
  inputs: ['groups', 'iconPack', 'selectedGroupId', 'selfUserId', 't', 'unreadCounts']
})
@Component({
  selector: 'dyte-chat-selector-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['groups', 'iconPack', 'selectedGroupId', 'selfUserId', 't', 'unreadCounts'],
})
export class DyteChatSelectorUi {
  protected el: HTMLDyteChatSelectorUiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteChatGroupChanged']);
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-chat-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteChatToggle {
  protected el: HTMLDyteChatToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 't'],
})
export class DyteClock {
  protected el: HTMLDyteClockElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteClock extends Components.DyteClock {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-confirmation-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DyteConfirmationModal {
  protected el: HTMLDyteConfirmationModalElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-controlbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteControlbar {
  protected el: HTMLDyteControlbarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteControlbar extends Components.DyteControlbar {}


@ProxyCmp({
  inputs: ['brandIcon', 'disabled', 'icon', 'iconPack', 'isLoading', 'label', 'showWarning', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-controlbar-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['brandIcon', 'disabled', 'icon', 'iconPack', 'isLoading', 'label', 'showWarning', 'size', 't', 'variant'],
})
export class DyteControlbarButton {
  protected el: HTMLDyteControlbarButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteControlbarButton extends Components.DyteControlbarButton {}


@ProxyCmp({
  inputs: ['iconPack', 'minValue', 'size', 't', 'value']
})
@Component({
  selector: 'dyte-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'minValue', 'size', 't', 'value'],
})
export class DyteCounter {
  protected el: HTMLDyteCounterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}


export declare interface DyteCounter extends Components.DyteCounter {
  /**
   * On change event emitter
   */
  valueChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteDebugger {
  protected el: HTMLDyteDebuggerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteDebuggerAudio {
  protected el: HTMLDyteDebuggerAudioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDebuggerAudio extends Components.DyteDebuggerAudio {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-screenshare',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteDebuggerScreenshare {
  protected el: HTMLDyteDebuggerScreenshareElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDebuggerScreenshare extends Components.DyteDebuggerScreenshare {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-system',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteDebuggerSystem {
  protected el: HTMLDyteDebuggerSystemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDebuggerSystem extends Components.DyteDebuggerSystem {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-debugger-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteDebuggerToggle {
  protected el: HTMLDyteDebuggerToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-debugger-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteDebuggerVideo {
  protected el: HTMLDyteDebuggerVideoElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteDebuggerVideo extends Components.DyteDebuggerVideo {}


@ProxyCmp({
  inputs: ['config', 'disableEscapeKey', 'hideCloseButton', 'iconPack', 'meeting', 'open', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'disableEscapeKey', 'hideCloseButton', 'iconPack', 'meeting', 'open', 'size', 'states', 't'],
})
export class DyteDialog {
  protected el: HTMLDyteDialogElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteDialogClose']);
  }
}


export declare interface DyteDialog extends Components.DyteDialog {
  /**
   * Event emitted when dialog is closed
   */
  dyteDialogClose: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-dialog-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteDialogManager {
  protected el: HTMLDyteDialogManagerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['attachment', 'iconPack', 't']
})
@Component({
  selector: 'dyte-draft-attachment-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['attachment', 'iconPack', 't'],
})
export class DyteDraftAttachmentView {
  protected el: HTMLDyteDraftAttachmentViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['deleteAttachment']);
  }
}


export declare interface DyteDraftAttachmentView extends Components.DyteDraftAttachmentView {
  /**
   * Event triggered when the attachment is deleted
   */
  deleteAttachment: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-emoji-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 't'],
})
export class DyteEmojiPicker {
  protected el: HTMLDyteEmojiPickerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pickerClose', 'dyteEmojiClicked']);
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
  inputs: ['iconPack', 'isActive', 't']
})
@Component({
  selector: 'dyte-emoji-picker-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'isActive', 't'],
})
export class DyteEmojiPickerButton {
  protected el: HTMLDyteEmojiPickerButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteEmojiPickerButton extends Components.DyteEmojiPickerButton {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-ended-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteEndedScreen {
  protected el: HTMLDyteEndedScreenElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteEndedScreen extends Components.DyteEndedScreen {}


@ProxyCmp({
  inputs: ['hostEl', 'iconPack', 't']
})
@Component({
  selector: 'dyte-file-dropzone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hostEl', 'iconPack', 't'],
})
export class DyteFileDropzone {
  protected el: HTMLDyteFileDropzoneElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dropCallback']);
  }
}


export declare interface DyteFileDropzone extends Components.DyteFileDropzone {
  /**
   * drop event callback
   */
  dropCallback: EventEmitter<CustomEvent<DragEvent>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
@Component({
  selector: 'dyte-file-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't'],
})
export class DyteFileMessage {
  protected el: HTMLDyteFileMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteFileMessage extends Components.DyteFileMessage {}


@ProxyCmp({
  inputs: ['iconPack', 'name', 'size', 't', 'url']
})
@Component({
  selector: 'dyte-file-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'name', 'size', 't', 'url'],
})
export class DyteFileMessageView {
  protected el: HTMLDyteFileMessageViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteFileMessageView extends Components.DyteFileMessageView {}


@ProxyCmp({
  inputs: ['filter', 'icon', 'iconPack', 'label', 't']
})
@Component({
  selector: 'dyte-file-picker-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['filter', 'icon', 'iconPack', 'label', 't'],
})
export class DyteFilePickerButton {
  protected el: HTMLDyteFilePickerButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['fileChange']);
  }
}


export declare interface DyteFilePickerButton extends Components.DyteFilePickerButton {
  /**
   * Event when a file is selected for upload
   */
  fileChange: EventEmitter<CustomEvent<File>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'size', 'states', 't', 'targetElement', 'variant']
})
@Component({
  selector: 'dyte-fullscreen-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'size', 'states', 't', 'targetElement', 'variant'],
})
export class DyteFullscreenToggle {
  protected el: HTMLDyteFullscreenToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'overrides', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'overrides', 'size', 'states', 't'],
})
export class DyteGrid {
  protected el: HTMLDyteGridElement;
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-grid-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteGridPagination {
  protected el: HTMLDyteGridPaginationElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteGridPagination extends Components.DyteGridPagination {}


@ProxyCmp({
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'disableRender', 'iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteHeader {
  protected el: HTMLDyteHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteHeader extends Components.DyteHeader {}


@ProxyCmp({
  inputs: ['icon', 'iconPack', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'iconPack', 'size', 't', 'variant'],
})
export class DyteIcon {
  protected el: HTMLDyteIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteIcon extends Components.DyteIcon {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-idle-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 't'],
})
export class DyteIdleScreen {
  protected el: HTMLDyteIdleScreenElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteIdleScreen extends Components.DyteIdleScreen {}


@ProxyCmp({
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
@Component({
  selector: 'dyte-image-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't'],
})
export class DyteImageMessage {
  protected el: HTMLDyteImageMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 't', 'url']
})
@Component({
  selector: 'dyte-image-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 't', 'url'],
})
export class DyteImageMessageView {
  protected el: HTMLDyteImageMessageViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['preview']);
  }
}


export declare interface DyteImageMessageView extends Components.DyteImageMessageView {
  /**
   * preview event
   */
  preview: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'image', 'size', 't']
})
@Component({
  selector: 'dyte-image-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'image', 'size', 't'],
})
export class DyteImageViewer {
  protected el: HTMLDyteImageViewerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['close']);
  }
}


export declare interface DyteImageViewer extends Components.DyteImageViewer {
  /**
   * Emitted when viewer should be closed
   */
  close: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['iconPack']
})
@Component({
  selector: 'dyte-information-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack'],
})
export class DyteInformationTooltip {
  protected el: HTMLDyteInformationTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteInformationTooltip extends Components.DyteInformationTooltip {}


@ProxyCmp({
  inputs: ['config', 'dataConfig', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-join-stage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'dataConfig', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteJoinStage {
  protected el: HTMLDyteJoinStageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'dyteJoinStage', 'dyteLeaveStage']);
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
  inputs: ['iconPack', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-leave-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'size', 't', 'variant'],
})
export class DyteLeaveButton {
  protected el: HTMLDyteLeaveButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-leave-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DyteLeaveMeeting {
  protected el: HTMLDyteLeaveMeetingElement;
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
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-livestream-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't'],
})
export class DyteLivestreamIndicator {
  protected el: HTMLDyteLivestreamIndicatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteLivestreamIndicator extends Components.DyteLivestreamIndicator {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-livestream-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't'],
})
export class DyteLivestreamPlayer {
  protected el: HTMLDyteLivestreamPlayerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteAPIError']);
  }
}


export declare interface DyteLivestreamPlayer extends Components.DyteLivestreamPlayer {
  /**
   * Emit API error events
   */
  dyteAPIError: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-livestream-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteLivestreamToggle {
  protected el: HTMLDyteLivestreamToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'dyteAPIError']);
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
  inputs: ['config', 'logoUrl', 'meeting', 't']
})
@Component({
  selector: 'dyte-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'logoUrl', 'meeting', 't'],
})
export class DyteLogo {
  protected el: HTMLDyteLogoElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteLogo extends Components.DyteLogo {}


@ProxyCmp({
  inputs: ['maxLength', 'text']
})
@Component({
  selector: 'dyte-markdown-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['maxLength', 'text'],
})
export class DyteMarkdownView {
  protected el: HTMLDyteMarkdownViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMarkdownView extends Components.DyteMarkdownView {}


@ProxyCmp({
  inputs: ['applyDesignSystem', 'config', 'gridLayout', 'iconPack', 'leaveOnUnmount', 'loadConfigFromPreset', 'meeting', 'mode', 'showSetupScreen', 'size', 't']
})
@Component({
  selector: 'dyte-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['applyDesignSystem', 'config', 'gridLayout', 'iconPack', 'leaveOnUnmount', 'loadConfigFromPreset', 'meeting', 'mode', 'showSetupScreen', 'size', 't'],
})
export class DyteMeeting {
  protected el: HTMLDyteMeetingElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
  }
}


import type { PartialStateEvent as IDyteMeetingPartialStateEvent } from '@dytesdk/ui-kit';

export declare interface DyteMeeting extends Components.DyteMeeting {
  /**
   * Emits updated state data
   */
  dyteStateUpdate: EventEmitter<CustomEvent<IDyteMeetingPartialStateEvent>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-meeting-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 't'],
})
export class DyteMeetingTitle {
  protected el: HTMLDyteMeetingTitleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMeetingTitle extends Components.DyteMeetingTitle {}


@ProxyCmp({
  inputs: ['iconPack', 'offset', 'placement', 'size', 't']
})
@Component({
  selector: 'dyte-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'offset', 'placement', 'size', 't'],
})
export class DyteMenu {
  protected el: HTMLDyteMenuElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMenu extends Components.DyteMenu {}


@ProxyCmp({
  inputs: ['iconPack', 'size', 't']
})
@Component({
  selector: 'dyte-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'size', 't'],
})
export class DyteMenuItem {
  protected el: HTMLDyteMenuItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMenuItem extends Components.DyteMenuItem {}


@ProxyCmp({
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-menu-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 't'],
})
export class DyteMenuList {
  protected el: HTMLDyteMenuListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMenuList extends Components.DyteMenuList {}


@ProxyCmp({
  inputs: ['estimateItemSize', 'iconPack', 'loadMore', 'messages', 'renderer', 'visibleItemsCount']
})
@Component({
  selector: 'dyte-message-list-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['estimateItemSize', 'iconPack', 'loadMore', 'messages', 'renderer', 'visibleItemsCount'],
})
export class DyteMessageListView {
  protected el: HTMLDyteMessageListViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMessageListView extends Components.DyteMessageListView {}


@ProxyCmp({
  inputs: ['actions', 'authorName', 'avatarUrl', 'hideAuthorName', 'hideAvatar', 'hideMetadata', 'iconPack', 'time', 'variant', 'viewType']
})
@Component({
  selector: 'dyte-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'authorName', 'avatarUrl', 'hideAuthorName', 'hideAvatar', 'hideMetadata', 'iconPack', 'time', 'variant', 'viewType'],
})
export class DyteMessageView {
  protected el: HTMLDyteMessageViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['action']);
  }
}


export declare interface DyteMessageView extends Components.DyteMessageView {
  /**
   * action event
   */
  action: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-mic-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteMicToggle {
  protected el: HTMLDyteMicToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-microphone-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteMicrophoneSelector {
  protected el: HTMLDyteMicrophoneSelectorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMicrophoneSelector extends Components.DyteMicrophoneSelector {}


@ProxyCmp({
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'plugins', 'screenShareParticipants', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-mixed-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'plugins', 'screenShareParticipants', 'size', 'states', 't'],
})
export class DyteMixedGrid {
  protected el: HTMLDyteMixedGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteMixedGrid extends Components.DyteMixedGrid {}


@ProxyCmp({
  inputs: ['iconPack', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-more-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'size', 'states', 't'],
})
export class DyteMoreToggle {
  protected el: HTMLDyteMoreToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-mute-all-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteMuteAllButton {
  protected el: HTMLDyteMuteAllButtonElement;
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
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-mute-all-confirmation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DyteMuteAllConfirmation {
  protected el: HTMLDyteMuteAllConfirmationElement;
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
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-name-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 'size', 't', 'variant'],
})
export class DyteNameTag {
  protected el: HTMLDyteNameTagElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteNameTag extends Components.DyteNameTag {}


@ProxyCmp({
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 't']
})
@Component({
  selector: 'dyte-network-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'isScreenShare', 'meeting', 'participant', 't'],
})
export class DyteNetworkIndicator {
  protected el: HTMLDyteNetworkIndicatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteNetworkIndicator extends Components.DyteNetworkIndicator {}


@ProxyCmp({
  inputs: ['iconPack', 'notification', 'size', 't']
})
@Component({
  selector: 'dyte-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'notification', 'size', 't'],
})
export class DyteNotification {
  protected el: HTMLDyteNotificationElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteNotificationDismiss']);
  }
}


export declare interface DyteNotification extends Components.DyteNotification {
  /**
   * Dismiss event
   */
  dyteNotificationDismiss: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-notifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteNotifications {
  protected el: HTMLDyteNotificationsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteNotifications extends Components.DyteNotifications {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-overlay-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DyteOverlayModal {
  protected el: HTMLDyteOverlayModalElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['autoScroll', 'createNodes', 'emptyListLabel', 'fetchData', 'iconPack', 'pageSize', 'pagesAllowed', 'selectedItemId', 't'],
  methods: ['onNewNode', 'onNodeDelete', 'onNodeUpdate']
})
@Component({
  selector: 'dyte-paginated-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoScroll', 'createNodes', 'emptyListLabel', 'fetchData', 'iconPack', 'pageSize', 'pagesAllowed', 'selectedItemId', 't'],
})
export class DytePaginatedList {
  protected el: HTMLDytePaginatedListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DytePaginatedList extends Components.DytePaginatedList {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'participant', 't', 'view']
})
@Component({
  selector: 'dyte-participant',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'participant', 't', 'view'],
})
export class DyteParticipant {
  protected el: HTMLDyteParticipantElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteSendNotification']);
  }
}


export declare interface DyteParticipant extends Components.DyteParticipant {
  /**
   * Emit dyte notifications
   */
  dyteSendNotification: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-participant-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't'],
})
export class DyteParticipantCount {
  protected el: HTMLDyteParticipantCountElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantCount extends Components.DyteParticipantCount {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'isPreview', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-participant-setup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'isPreview', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant'],
})
export class DyteParticipantSetup {
  protected el: HTMLDyteParticipantSetupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantSetup extends Components.DyteParticipantSetup {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'isPreview', 'meeting', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-participant-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'isPreview', 'meeting', 'nameTagPosition', 'participant', 'size', 'states', 't', 'variant'],
})
export class DyteParticipantTile {
  protected el: HTMLDyteParticipantTileElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tileLoad', 'tileUnload']);
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
  inputs: ['config', 'defaultParticipantsTabId', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-participants',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'defaultParticipantsTabId', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteParticipants {
  protected el: HTMLDyteParticipantsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'preloadedAudioElem', 't']
})
@Component({
  selector: 'dyte-participants-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'preloadedAudioElem', 't'],
})
export class DyteParticipantsAudio {
  protected el: HTMLDyteParticipantsAudioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dialogClose']);
  }
}


export declare interface DyteParticipantsAudio extends Components.DyteParticipantsAudio {
  /**
   * Callback to execute when the dialog is closed
   */
  dialogClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-stage-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view'],
})
export class DyteParticipantsStageList {
  protected el: HTMLDyteParticipantsStageListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantsStageList extends Components.DyteParticipantsStageList {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-stage-queue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view'],
})
export class DyteParticipantsStageQueue {
  protected el: HTMLDyteParticipantsStageQueueElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantsStageQueue extends Components.DyteParticipantsStageQueue {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-participants-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteParticipantsToggle {
  protected el: HTMLDyteParticipantsToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-viewer-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'hideHeader', 'iconPack', 'meeting', 'search', 'size', 't', 'view'],
})
export class DyteParticipantsViewerList {
  protected el: HTMLDyteParticipantsViewerListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantsViewerList extends Components.DyteParticipantsViewerList {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view']
})
@Component({
  selector: 'dyte-participants-waiting-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 't', 'view'],
})
export class DyteParticipantsWaitingList {
  protected el: HTMLDyteParticipantsWaitingListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteParticipantsWaitingList extends Components.DyteParticipantsWaitingList {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-permissions-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'states', 't'],
})
export class DytePermissionsMessage {
  protected el: HTMLDytePermissionsMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-pip-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DytePipToggle {
  protected el: HTMLDytePipToggleElement;
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
  inputs: ['iconPack', 'meeting', 'plugin', 't']
})
@Component({
  selector: 'dyte-plugin-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'plugin', 't'],
})
export class DytePluginMain {
  protected el: HTMLDytePluginMainElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DytePluginMain extends Components.DytePluginMain {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-plugins',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 't'],
})
export class DytePlugins {
  protected el: HTMLDytePluginsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-plugins-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DytePluginsToggle {
  protected el: HTMLDytePluginsToggleElement;
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
  inputs: ['iconPack', 'permissions', 'poll', 'self', 't']
})
@Component({
  selector: 'dyte-poll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'permissions', 'poll', 'self', 't'],
})
export class DytePoll {
  protected el: HTMLDytePollElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteVotePoll']);
  }
}


export declare interface DytePoll extends Components.DytePoll {
  /**
   * Event which is emitted when a poll is voted on
   */
  dyteVotePoll: EventEmitter<CustomEvent<{ id: string; index: number; }>>;
}


@ProxyCmp({
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-poll-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 't'],
})
export class DytePollForm {
  protected el: HTMLDytePollFormElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteCreatePoll']);
  }
}


import type { PollObject as IDytePollFormPollObject } from '@dytesdk/ui-kit';

export declare interface DytePollForm extends Components.DytePollForm {
  /**
   * Event which is emitted when a poll is created
   */
  dyteCreatePoll: EventEmitter<CustomEvent<IDytePollFormPollObject>>;
}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-polls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 't'],
})
export class DytePolls {
  protected el: HTMLDytePollsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DytePolls extends Components.DytePolls {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-polls-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DytePollsToggle {
  protected el: HTMLDytePollsToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-recording-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't'],
})
export class DyteRecordingIndicator {
  protected el: HTMLDyteRecordingIndicatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteRecordingIndicator extends Components.DyteRecordingIndicator {}


@ProxyCmp({
  inputs: ['disabled', 'iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-recording-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteRecordingToggle {
  protected el: HTMLDyteRecordingToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteAPIError']);
  }
}


export declare interface DyteRecordingToggle extends Components.DyteRecordingToggle {
  /**
   * Emit api error events
   */
  dyteAPIError: EventEmitter<CustomEvent<{ trace: string; message: string; }>>;
}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-screen-share-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteScreenShareToggle {
  protected el: HTMLDyteScreenShareToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'dyteAPIError']);
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
  inputs: ['hideFullScreenButton', 'iconPack', 'meeting', 'nameTagPosition', 'participant', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-screenshare-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hideFullScreenButton', 'iconPack', 'meeting', 'nameTagPosition', 'participant', 'size', 't', 'variant'],
})
export class DyteScreenshareView {
  protected el: HTMLDyteScreenshareViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate', 'screensharePlay']);
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteSettings {
  protected el: HTMLDyteSettingsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-settings-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteSettingsAudio {
  protected el: HTMLDyteSettingsAudioElement;
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
  inputs: ['iconPack', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-settings-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'size', 'states', 't', 'variant'],
})
export class DyteSettingsToggle {
  protected el: HTMLDyteSettingsToggleElement;
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
  inputs: ['iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-settings-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteSettingsVideo {
  protected el: HTMLDyteSettingsVideoElement;
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
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-setup-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 'size', 'states', 't'],
})
export class DyteSetupScreen {
  protected el: HTMLDyteSetupScreenElement;
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
  inputs: ['config', 'defaultSection', 'enabledSections', 'iconPack', 'meeting', 'size', 'states', 't', 'view']
})
@Component({
  selector: 'dyte-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'defaultSection', 'enabledSections', 'iconPack', 'meeting', 'size', 'states', 't', 'view'],
})
export class DyteSidebar {
  protected el: HTMLDyteSidebarElement;
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
  inputs: ['currentTab', 'hideCloseAction', 'hideHeader', 'iconPack', 't', 'tabs', 'view']
})
@Component({
  selector: 'dyte-sidebar-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['currentTab', 'hideCloseAction', 'hideHeader', 'iconPack', 't', 'tabs', 'view'],
})
export class DyteSidebarUi {
  protected el: HTMLDyteSidebarUiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange', 'sidebarClose']);
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
  inputs: ['aspectRatio', 'config', 'gap', 'iconPack', 'meeting', 'participants', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-simple-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aspectRatio', 'config', 'gap', 'iconPack', 'meeting', 'participants', 'size', 'states', 't'],
})
export class DyteSimpleGrid {
  protected el: HTMLDyteSimpleGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSimpleGrid extends Components.DyteSimpleGrid {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant']
})
@Component({
  selector: 'dyte-speaker-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 'states', 't', 'variant'],
})
export class DyteSpeakerSelector {
  protected el: HTMLDyteSpeakerSelectorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpeakerSelector extends Components.DyteSpeakerSelector {}


@ProxyCmp({
  inputs: ['iconPack', 'size', 't']
})
@Component({
  selector: 'dyte-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'size', 't'],
})
export class DyteSpinner {
  protected el: HTMLDyteSpinnerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpinner extends Components.DyteSpinner {}


@ProxyCmp({
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'size', 'states', 't']
})
@Component({
  selector: 'dyte-spotlight-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aspectRatio', 'config', 'gap', 'gridSize', 'iconPack', 'layout', 'meeting', 'participants', 'pinnedParticipants', 'size', 'states', 't'],
})
export class DyteSpotlightGrid {
  protected el: HTMLDyteSpotlightGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpotlightGrid extends Components.DyteSpotlightGrid {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'size', 't']
})
@Component({
  selector: 'dyte-spotlight-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't'],
})
export class DyteSpotlightIndicator {
  protected el: HTMLDyteSpotlightIndicatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteSpotlightIndicator extends Components.DyteSpotlightIndicator {}


@ProxyCmp({
  inputs: ['iconPack', 't']
})
@Component({
  selector: 'dyte-stage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 't'],
})
export class DyteStage {
  protected el: HTMLDyteStageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-stage-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'size', 't', 'variant'],
})
export class DyteStageToggle {
  protected el: HTMLDyteStageToggleElement;
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
  inputs: ['checked', 'disabled', 'iconPack', 'readonly', 't']
})
@Component({
  selector: 'dyte-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'iconPack', 'readonly', 't'],
})
export class DyteSwitch {
  protected el: HTMLDyteSwitchElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteChange']);
  }
}


export declare interface DyteSwitch extends Components.DyteSwitch {
  /**
   * Event when switch value is changed
   */
  dyteChange: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['activeTab', 'config', 'iconPack', 'layout', 'meeting', 'size', 'states', 't', 'tabs']
})
@Component({
  selector: 'dyte-tab-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTab', 'config', 'iconPack', 'layout', 'meeting', 'size', 'states', 't', 'tabs'],
})
export class DyteTabBar {
  protected el: HTMLDyteTabBarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
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
  inputs: ['disabled', 'iconPack', 'keyDownHandler', 'maxLength', 'placeholder', 'rateLimitBreached', 't', 'value'],
  methods: ['setText']
})
@Component({
  selector: 'dyte-text-composer-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'iconPack', 'keyDownHandler', 'maxLength', 'placeholder', 'rateLimitBreached', 't', 'value'],
})
export class DyteTextComposerView {
  protected el: HTMLDyteTextComposerViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['textChange']);
  }
}


export declare interface DyteTextComposerView extends Components.DyteTextComposerView {
  /**
   * Event emitted when text changes
   */
  textChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['disabled', 'iconPack', 'placeholder', 't', 'type']
})
@Component({
  selector: 'dyte-text-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'iconPack', 'placeholder', 't', 'type'],
})
export class DyteTextField {
  protected el: HTMLDyteTextFieldElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteStateUpdate']);
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
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't']
})
@Component({
  selector: 'dyte-text-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'isContinued', 'message', 'now', 'showBubble', 't'],
})
export class DyteTextMessage {
  protected el: HTMLDyteTextMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteTextMessage extends Components.DyteTextMessage {}


@ProxyCmp({
  inputs: ['isMarkdown', 'text']
})
@Component({
  selector: 'dyte-text-message-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['isMarkdown', 'text'],
})
export class DyteTextMessageView {
  protected el: HTMLDyteTextMessageViewElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteTextMessageView extends Components.DyteTextMessageView {}


@ProxyCmp({
  inputs: ['delay', 'disabled', 'iconPack', 'kind', 'label', 'open', 'placement', 'size', 't', 'variant']
})
@Component({
  selector: 'dyte-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['delay', 'disabled', 'iconPack', 'kind', 'label', 'open', 'placement', 'size', 't', 'variant'],
})
export class DyteTooltip {
  protected el: HTMLDyteTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteOpenChange']);
  }
}


export declare interface DyteTooltip extends Components.DyteTooltip {
  /**
   * Event handler called when the open state of the tooltip changes.
   */
  dyteOpenChange: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['t', 'transcript']
})
@Component({
  selector: 'dyte-transcript',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['t', 'transcript'],
})
export class DyteTranscript {
  protected el: HTMLDyteTranscriptElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dyteTranscriptDismiss']);
  }
}


export declare interface DyteTranscript extends Components.DyteTranscript {
  /**
   * Dismiss event
   */
  dyteTranscriptDismiss: EventEmitter<CustomEvent<{ id: string; renderedId: string; }>>;
}


@ProxyCmp({
  inputs: ['config', 'meeting', 'states', 't']
})
@Component({
  selector: 'dyte-transcripts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'meeting', 'states', 't'],
})
export class DyteTranscripts {
  protected el: HTMLDyteTranscriptsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteTranscripts extends Components.DyteTranscripts {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 'noRenderUntilMeeting', 't']
})
@Component({
  selector: 'dyte-ui-provider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 'noRenderUntilMeeting', 't'],
})
export class DyteUiProvider {
  protected el: HTMLDyteUiProviderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteUiProvider extends Components.DyteUiProvider {}


@ProxyCmp({
  inputs: ['iconPack', 'meeting', 't', 'variant']
})
@Component({
  selector: 'dyte-viewer-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconPack', 'meeting', 't', 'variant'],
})
export class DyteViewerCount {
  protected el: HTMLDyteViewerCountElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteViewerCount extends Components.DyteViewerCount {}


@ProxyCmp({
  inputs: ['bufferedItemsCount', 'emptyListElement', 'itemHeight', 'items', 'renderItem']
})
@Component({
  selector: 'dyte-virtualized-participant-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bufferedItemsCount', 'emptyListElement', 'itemHeight', 'items', 'renderItem'],
})
export class DyteVirtualizedParticipantList {
  protected el: HTMLDyteVirtualizedParticipantListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteVirtualizedParticipantList extends Components.DyteVirtualizedParticipantList {}


@ProxyCmp({
  inputs: ['config', 'iconPack', 'meeting', 't']
})
@Component({
  selector: 'dyte-waiting-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config', 'iconPack', 'meeting', 't'],
})
export class DyteWaitingScreen {
  protected el: HTMLDyteWaitingScreenElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DyteWaitingScreen extends Components.DyteWaitingScreen {}



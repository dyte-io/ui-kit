import type Meeting from '@dytesdk/web-core';
import type {
  DyteSelf as Self,
  DyteParticipant as Participant,
  leaveRoomState,
} from '@dytesdk/web-core';

// TODO (@tushar): maybe move this to @dytesdk/web-core
type WaitlistedParticipant = Readonly<
  Omit<Participant, 'audioTrack' | 'videoTrack' | 'screenShareTracks'>
>;
type Peer = Self | Participant;

export type { Meeting as DyteClient, Peer, Self, Participant, WaitlistedParticipant };

export type RoomLeftState = leaveRoomState;

export type MediaPermission =
  | 'NOT_REQUESTED'
  | 'ACCEPTED'
  | 'DENIED'
  | 'SYSTEM_DENIED'
  | 'COULD_NOT_START'
  | 'CANCELED'
  | 'NO_DEVICES_AVAILABLE';

export type { RemoteUpdatePayload } from '@dytesdk/web-core';

// eslint-disable-next-line @stencil-community/ban-exported-const-enums
export enum RemoteUpdateType {
  REQUEST_RECEIVED = 'REQUEST_RECEIVED',
  REQUEST_SENT = 'REQUEST_SENT',
  INCOMING_REQUEST_ACCEPTED = 'INCOMING_REQUEST_ACCEPTED',
  OUTGOING_REQUEST_ACCEPTED = 'OUTGOING_REQUEST_ACCEPTED',
  INCOMING_REQUEST_ENDED = 'INCOMING_REQUEST_ENDED',
  OUTGOING_REQUEST_ENDED = 'OUTGOING_REQUEST_ENDED',
}

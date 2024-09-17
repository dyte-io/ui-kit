type MediaKind = 'audio' | 'video';

export interface MediaScoreUpdateParams {
  kind: MediaKind;
  isScreenshare: boolean;
  score: number;
  /** The peerId */
  participantId?: string;
}

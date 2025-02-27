import DyteClient from '@dytesdk/web-core';

type Listener = () => void;
export class DyteUpdates {
  private meeting: DyteClient;

  private l: Set<Listener>;

  constructor(meeting: DyteClient) {
    this.meeting = meeting;
    this.l = new Set();

    this.meeting.self?.addListener('*', this.onUpdate);
    this.meeting.meta?.addListener('*', this.onUpdate);
    this.meeting.participants?.addListener('*', this.onUpdate);
    this.meeting.participants?.joined?.addListener('*', this.onUpdate);
    this.meeting.participants?.active?.addListener('*', this.onUpdate);
    this.meeting.participants?.waitlisted?.addListener('*', this.onUpdate);
    this.meeting.stage?.addListener('*', this.onUpdate);
    this.meeting.livestream?.addListener('*', this.onUpdate);
    this.meeting.chat?.addListener('*', this.onUpdate);
    this.meeting.plugins?.all.addListener('*', this.onUpdate);
    this.meeting.recording?.addListener('*', this.onUpdate);
    this.meeting.connectedMeetings?.addListener('*', this.onUpdate);
    this.meeting.polls?.addListener('*', this.onUpdate);
  }

  clean() {
    this.meeting.self?.removeListener('*', this.onUpdate);
    this.meeting.meta?.removeListener('*', this.onUpdate);
    this.meeting.participants?.removeListener('*', this.onUpdate);
    this.meeting.participants?.joined?.removeListener('*', this.onUpdate);
    this.meeting.participants?.active?.removeListener('*', this.onUpdate);
    this.meeting.participants?.waitlisted?.removeListener('*', this.onUpdate);
    this.meeting.stage?.removeListener('*', this.onUpdate);
    this.meeting.livestream?.removeListener('*', this.onUpdate);
    this.meeting.chat?.removeListener('*', this.onUpdate);
    this.meeting.plugins?.all.removeListener('*', this.onUpdate);
    this.meeting.recording?.removeListener('*', this.onUpdate);
    this.meeting.connectedMeetings?.removeListener('*', this.onUpdate);
    this.meeting.polls?.removeListener('*', this.onUpdate);
  }

  addListener(listener: Listener) {
    this.l.add(listener);
  }

  removeListener(listener: Listener) {
    this.l.delete(listener);
  }

  private onUpdate = () => {
    this.l.forEach((l) => {
      l();
    });
  };
}

/**
 * Utility function which determines whether to trigger update or not
 */
export const shouldUpdate = <StateSlice>(slice: StateSlice, newSlice: StateSlice): boolean => {
  if (slice !== newSlice) {
    return true;
  }
  if (Array.isArray(slice) && Array.isArray(newSlice)) {
    if (slice.length !== newSlice.length) {
      return true;
    }
  }

  return false;
};

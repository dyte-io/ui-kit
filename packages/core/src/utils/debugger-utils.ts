import { MediaKind } from '@dytesdk/web-core';

export type StatsHealth = 'Good' | 'Normal' | 'Worst';

export interface FormattedStatsObj {
  name: string;
  value: string;
  description: string;
  verdict: StatsHealth;
}

/** Method to return media health based on the media & network stats */
export function getNetworkBasedMediaHealth({
  stats,
}: {
  kind: MediaKind;
  isScreenshare: boolean;
  stats: FormattedStatsObj[];
}): StatsHealth {
  if (!stats || !stats.length) {
    return null;
  }

  let networkHealth: StatsHealth = 'Good';

  const allStatsHealths = stats.map((statsObj) => statsObj.verdict);
  if (allStatsHealths.includes('Worst')) {
    networkHealth = 'Worst';
  } else if (allStatsHealths.includes('Normal')) {
    networkHealth = 'Normal';
  }
  return networkHealth;
}

/** Gives verdict based on the packet loss */
export function getPacketLossVerdict({
  packetLossPercentage,
}: {
  packetLossPercentage: number;
}): StatsHealth {
  let verdict: StatsHealth = 'Good';

  if (packetLossPercentage > 5) {
    verdict = 'Worst';
  } else if (packetLossPercentage > 0) {
    verdict = 'Normal';
  }

  return verdict;
}

/** Gives verdict based on the jitter */
export function getJitterVerdict({ jitterInMS }: { jitterInMS: number }): StatsHealth {
  let verdict: StatsHealth = 'Good';

  if (jitterInMS > 300) {
    verdict = 'Worst';
  } else if (jitterInMS > 0) {
    verdict = 'Normal';
  }

  return verdict;
}

/** Gives verdict based on the jitter */
export function getBitrateVerdict({
  bitrate,
}: {
  kind: MediaKind;
  isScreenshare: boolean;
  bitrate: number;
}): StatsHealth {
  let verdict: StatsHealth = 'Good';
  const bitrateInKbps = Math.round(bitrate / 1024); // it is Kilo bits

  if (bitrateInKbps === 0) {
    verdict = 'Worst';
  }

  return verdict;
}

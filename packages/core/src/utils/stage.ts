import DyteClient from '@dytesdk/web-core';

export const canJoinStage = (meeting: DyteClient) => {
  return (
    meeting?.self?.permissions.stageEnabled && meeting?.self?.permissions.stageAccess === 'ALLOWED'
  );
};

export const canRequestToJoinStage = (meeting: DyteClient) => {
  return (
    meeting?.self?.permissions.stageEnabled &&
    meeting?.self?.permissions.stageAccess !== 'NOT_ALLOWED'
  );
};

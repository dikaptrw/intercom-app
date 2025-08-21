import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChimeSDKMeetings } from '@aws-sdk/client-chime-sdk-meetings';
import { DEFAULT_REGION } from './utils/constants.js';
import { buildResponse } from './utils/functions.js';

const chime = new ChimeSDKMeetings({ region: DEFAULT_REGION });

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    // Handle both string and object bodies
    let body: Record<string, unknown> = {};
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (typeof event.body === 'object' && event.body !== null) {
      body = event.body as Record<string, unknown>;
    }

    const meetingId = body.meetingId as string | undefined;
    const attendeeName = body.attendeeName as string | undefined;

    if (!meetingId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'meetingId is required' }),
      };
    }

    let meeting;
    try {
      meeting = await chime.getMeeting({ MeetingId: meetingId });
    } catch (err: any) {
      return buildResponse(event, 400, {
        code: 'MEETING_NOT_FOUND',
        message: err.message || `Meeting with id "${meetingId}" does not exist`,
      });
    }

    // Create an attendee
    const attendee = await chime.createAttendee({
      MeetingId: meetingId,
      ExternalUserId: attendeeName ?? `user-${Date.now()}`,
    });

    return buildResponse(event, 200, {
      message: 'Joined meeting successfully',
      meeting: meeting.Meeting,
      attendee: attendee.Attendee,
    });
  } catch (err) {
    console.error('Error joining meeting:', err);

    return buildResponse(event, 500, {
      error:
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : JSON.stringify(err),
    });
  }
};

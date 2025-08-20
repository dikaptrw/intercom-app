import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChimeSDKMeetings } from '@aws-sdk/client-chime-sdk-meetings';
import { DEFAULT_REGION } from './constants.js';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
        body: JSON.stringify({
          code: 'MEETING_NOT_FOUND',
          message:
            err.message || `Meeting with id "${meetingId}" does not exist`,
        }),
      };
    }

    // Create an attendee
    const attendee = await chime.createAttendee({
      MeetingId: meetingId,
      ExternalUserId: attendeeName ?? `user-${Date.now()}`,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
      body: JSON.stringify({
        meeting: meeting.Meeting,
        attendee: attendee.Attendee,
      }),
    };
  } catch (err) {
    console.error('Error joining meeting:', err);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
      body: JSON.stringify({
        error:
          err instanceof Error
            ? err.message
            : typeof err === 'string'
              ? err
              : JSON.stringify(err),
      }),
    };
  }
};

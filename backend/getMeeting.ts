import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChimeSDKMeetings } from '@aws-sdk/client-chime-sdk-meetings';
import { DEFAULT_REGION } from './constants.js';

const chime = new ChimeSDKMeetings({ region: DEFAULT_REGION });

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    // Handle both local (object) and API Gateway (string) bodies
    let body: Record<string, unknown> = {};
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (typeof event.body === 'object' && event.body !== null) {
      body = event.body as Record<string, unknown>;
    }

    const meetingId = body.meetingId as string | undefined;
    if (!meetingId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
        body: JSON.stringify({ error: 'meetingId is required' }),
      };
    }

    let meetingResponse;
    try {
      meetingResponse = await chime.getMeeting({
        MeetingId: meetingId,
      });
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
      body: JSON.stringify({
        message: 'Meeting fetched successfully',
        meeting: meetingResponse.Meeting,
      }),
    };
  } catch (err) {
    console.error('Error fetching meeting:', err);

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

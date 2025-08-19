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

    const meetingId =
      (body.meetingId as string | undefined) ?? `meeting-${Date.now()}`;

    const meetingResponse = await chime.createMeeting({
      ClientRequestToken: meetingId,
      MediaRegion: 'ap-southeast-2',
      ExternalMeetingId: meetingId,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Meeting created successfully',
        meeting: meetingResponse.Meeting,
      }),
    };
  } catch (err) {
    console.error('Error creating meeting:', err);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
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

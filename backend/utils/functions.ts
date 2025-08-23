import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ALLOWED_ORIGINS } from './constants.js';

// Helper to build response with correct headers
export function buildResponse(
  event: APIGatewayProxyEvent,
  statusCode: number,
  body: Record<string, unknown>,
): APIGatewayProxyResult {
  const origin = event.headers?.origin || event.headers?.Origin || '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (origin) {
    try {
      const url = new URL(origin);

      // allow any origin with port 5173
      if (url.port === '5173' && url.protocol === 'http:') {
        headers['Access-Control-Allow-Origin'] = origin;
      }

      // also allow specific deployed domains
      if (ALLOWED_ORIGINS.includes(origin)) {
        headers['Access-Control-Allow-Origin'] = origin;
      }
    } catch (err) {
      console.error('Error:', err);
      // ignore invalid origin header
    }
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

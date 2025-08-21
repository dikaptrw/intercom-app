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

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

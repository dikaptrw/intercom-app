import { JoinForm } from '@/components/forms/join-form';
import {
  lightTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';

function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ThemeProvider theme={lightTheme}>
          <MeetingProvider>
            <JoinForm />
          </MeetingProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default LoginPage;

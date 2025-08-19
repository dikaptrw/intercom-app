import { GalleryVerticalEnd } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/functions';
import FormGroupInput from '../form-groups/form-group-input';
import { useCallback, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import {
  CREATE_MEETING_ENDPOINT,
  JOIN_MEETING_ENDPOINT,
} from '@/utils/constants';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { ERROR_MESSAGE } from '@/utils/constants/errorMessages';

interface JoinFormInput {
  meetingId: string;
  attendeeName: string;
}

export function JoinForm({ className, ...props }: React.ComponentProps<'div'>) {
  const meetingManager = useMeetingManager();
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    control,
    trigger,
    handleSubmit,
    // setError,
  } = useForm<JoinFormInput>({
    defaultValues: {
      meetingId: '',
      attendeeName: '',
    },
  });

  const onSubmit: SubmitHandler<JoinFormInput> = useCallback(
    async ({ meetingId, attendeeName }) => {
      setIsLoading(true);

      // Call your Lambda API Gateway endpoint
      const resCreateMeeting = await fetch(CREATE_MEETING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingId }),
      });
      const jsonCreateMeeting = await resCreateMeeting.json();

      const resJoinMeeting = await fetch(JOIN_MEETING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: jsonCreateMeeting.meeting.MeetingId,
          attendeeName,
        }),
      });
      const jsonJoinMeeting = await resJoinMeeting.json();

      const configuration = new MeetingSessionConfiguration(
        jsonJoinMeeting.meeting,
        jsonJoinMeeting.attendee,
      );

      // Pass JoinInfo to Chime meetingManager
      await meetingManager.join(configuration);

      // Start session (needed to actually connect media)
      await meetingManager.start();

      setIsLoading(false);
    },
    [meetingManager],
  );

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Intercom.</h1>
            <div className="text-center text-sm">
              Let’s get started — enter your meeting info below.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Controller
                name="meetingId"
                control={control}
                rules={{
                  required: ERROR_MESSAGE.REQUIRED,
                }}
                render={({ field }) => {
                  return (
                    <FormGroupInput
                      type="text"
                      label="Meeting Id"
                      placeholder="Input meeting id here"
                      errorMessage={errors.meetingId?.message}
                      inputAttrs={{
                        id: 'meetingId',
                        value: field.value || '',
                        onBlur: () => trigger('meetingId'),
                        onChange: (e) => {
                          const value = e.target.value;
                          field.onChange(value);
                        },
                      }}
                    />
                  );
                }}
              />

              <Controller
                name="attendeeName"
                control={control}
                rules={{
                  required: ERROR_MESSAGE.REQUIRED,
                }}
                render={({ field }) => {
                  return (
                    <FormGroupInput
                      type="text"
                      label="User name"
                      placeholder="Input your name here"
                      errorMessage={errors.attendeeName?.message}
                      inputAttrs={{
                        id: 'attendeeName',
                        value: field.value || '',
                        onBlur: () => trigger('attendeeName'),
                        onChange: (e) => {
                          const value = e.target.value;
                          field.onChange(value);
                        },
                      }}
                    />
                  );
                }}
              />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Start
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By continuing, you agree to our <br /> <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

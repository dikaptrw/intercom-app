import { Button } from '@/components/ui/button';
import { cn } from '@/utils/functions';
import FormGroupInput from '../form-groups/form-group-input';
import { useCallback, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { ERROR_MESSAGE } from '@/utils/constants/errorMessages';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/utils/constants/routes';
import { generateRouteParams } from '@/utils/functions/routes';
import { AWS_CHIME_API } from '@/utils/constants/api';
import { useSessionQuery } from '@/graphql/api.graphql';
import { Headset } from 'lucide-react';

interface JoinFormInput {
  attendeeName: string;
}

export function JoinForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    control,
    trigger,
    handleSubmit,
    // setError,
  } = useForm<JoinFormInput>({
    defaultValues: {
      attendeeName: '',
    },
  });

  const { data: dataSessionQuery } = useSessionQuery(
    {
      id: unitId || '',
    },
    {
      refetchInterval: (data) => {
        return !!data.state.data?.session ? false : 3000; // keep polling until data exists
      },
    },
  );

  const onSubmit: SubmitHandler<JoinFormInput> = useCallback(
    async ({ attendeeName }) => {
      setIsLoading(true);

      // Call your Lambda API Gateway endpoint
      const resCreateMeeting = await fetch(AWS_CHIME_API.meeting.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonCreateMeeting = await resCreateMeeting.json();

      localStorage.setItem(
        'chimeMeeting',
        JSON.stringify({
          meetingId: jsonCreateMeeting.meeting.MeetingId,
          attendeeName,
        }),
      );

      navigate(
        generateRouteParams(ROUTES.MEETING_ROOM, {
          meetingId: jsonCreateMeeting.meeting.MeetingId,
        }),
      );

      setIsLoading(false);
    },
    [navigate],
  );

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Headset className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Getting Ready for Your Call</h1>
            <div className="text-center text-sm">
              While we connect you with the other person, please enter your name
              so they know who’s calling.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
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
                      label="Name"
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
            <Button
              disabled={isLoading || !dataSessionQuery?.session}
              type="submit"
              className="w-full"
            >
              {!dataSessionQuery?.session
                ? 'Waiting for the other person…'
                : 'Join Call'}
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

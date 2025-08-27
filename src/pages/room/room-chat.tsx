import FormGroupInput from '@/components/form-groups/form-group-input';
import { Button } from '@/components/ui/button';
import { useRoom } from '@/hooks/useRoom';
import { useRoomChat } from '@/hooks/useRoomChat';
import { ERROR_MESSAGE } from '@/utils/constants/errorMessages';
import { cn } from '@/utils/functions';
import { SendHorizontal, X } from 'lucide-react';
import { useCallback } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

interface RoomChatProps {
  className?: string;
}

interface MessageFormInput {
  message: string;
}

function RoomChat({ className }: RoomChatProps) {
  const { messages, sendMessage } = useRoomChat();
  const { setSideMenu } = useRoom();

  const {
    formState: { isValid },
    control,
    trigger,
    handleSubmit,
    setValue,
  } = useForm<MessageFormInput>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<MessageFormInput> = useCallback(
    ({ message }) => {
      sendMessage(message);
      setValue('message', '');
    },
    [],
  );

  return (
    <div
      className={cn(
        'flex flex-col bg-white rounded-xl w-full h-full flex-1',
        className,
      )}
    >
      <div className="px-4 py-4 flex items-center justify-between gap-4">
        <div className="font-medium text-lg">In-call messages</div>

        <Button
          onClick={() => setSideMenu(undefined)}
          variant={'ghost'}
          size={'icon'}
          className="rounded-full"
        >
          <X className="w-5 h-5 size-6" />
        </Button>
      </div>

      <div className="px-4">
        <div className="rounded-xl bg-neutral-100 py-2 px-3 text-xs">
          Once you leave the call, you’ll no longer have access to this chat or
          its messages.
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pt-0 text-sm">
        {messages.map((m, i) => {
          const prev = messages[i - 1];
          const showName = !prev || prev.senderId !== m.senderId;

          return (
            <div key={i} className="flex flex-col">
              {showName && (
                <div className="font-semibold text-sm mt-4">
                  {m.senderName}{' '}
                  <span className="text-xs text-black/50 font-normal">
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
              <div className="text-sm text-black/80">{m.text}</div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 pt-0">
        <Controller
          name="message"
          control={control}
          rules={{
            required: ERROR_MESSAGE.REQUIRED,
          }}
          render={({ field }) => {
            return (
              <FormGroupInput
                placeholder="Send a message"
                suffix={
                  <Button
                    disabled={!isValid}
                    variant={'ghost'}
                    size={'icon'}
                    className="rounded-full text-black/60"
                  >
                    <SendHorizontal className="size-4" />
                  </Button>
                }
                inputAttrs={{
                  wrapperClassName:
                    'rounded-full py-1 !pr-1 px-4 border-black/20',
                  id: 'message',
                  value: field.value || '',
                  onBlur: () => trigger('message'),
                  onChange: (e) => {
                    const value = e.target.value;
                    field.onChange(value);
                  },
                }}
              />
            );
          }}
        />
      </form>
    </div>
  );
}

export default RoomChat;

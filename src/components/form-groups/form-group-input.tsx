import {
  type HTMLInputTypeAttribute,
  isValidElement,
  useMemo,
  useState,
} from 'react';
import { cn, truncateString } from '@/utils/functions';
import {
  TooltipGroup as Tooltip,
  type TooltipGroupProps as TooltipProps,
} from '@/components/ui/tooltip';
import {
  type RemixiconComponentType,
  RiEyeOffLine,
  RiEyeLine,
  RiInformationLine,
} from '@remixicon/react';
import FormErrorMessage from '@/components/form-error-message';
import { Input } from '../ui/input';

type CustomTooltipProps = Omit<TooltipProps, 'children'> & {
  iconClassName?: string;
};

type CounterProps = {
  maxLength: number;
};

export interface FormGroupInputProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelLineClamp?: number;
  required?: boolean;
  errorMessage?: string;
  customErrorMessageElement?:
    | React.ReactNode
    | ((props: {
        counter: CounterProps & {
          currentLength: number;
          defaultElement: React.ReactElement;
        };
      }) => React.ReactNode);
  counter?:
    | (CounterProps & {
        hide?: boolean;
      })
    | boolean;
  note?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  noteClassName?: string;
  name?: string;
  showTogglePasswordButton?: boolean;
  inputAttrs?: Omit<
    React.ComponentProps<typeof Input>,
    'prefix' | 'suffix' | 'placeholder' | 'type' | 'name'
  > & {
    ref?: React.Ref<HTMLInputElement>;
    wrapperClassName?: string;
    dataTestId?: string;
  };
  prefix?: React.ReactNode;
  suffix?:
    | ((props: {
        counter: CounterProps & {
          currentLength: number;
        };
      }) => React.ReactNode)
    | React.ReactNode;
  disabled?: boolean;
  tooltip?: CustomTooltipProps;
}

function FormGroupInput({
  label,
  labelClassName,
  labelLineClamp,
  required = false,
  errorMessage = '',
  customErrorMessageElement,
  note = '',
  type = 'text',
  placeholder,
  className,
  name,
  showTogglePasswordButton = false,
  inputAttrs,
  disabled,
  tooltip,
  noteClassName,
  counter,
  prefix,
  suffix,
}: FormGroupInputProps) {
  const { iconClassName: tooltipIconClassName, ...tooltipConfig } = (tooltip ||
    {}) as CustomTooltipProps;
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const EyeIcon = useMemo<RemixiconComponentType>(() => {
    if (inputType === 'password') {
      return RiEyeLine;
    } else {
      return RiEyeOffLine;
    }
  }, [inputType]);

  const DefaultCounterElement = () =>
    ((typeof counter === 'object' && !counter.hide) ||
      typeof counter === 'boolean') && (
      <div
        className={cn('text-2xs text-gray-10', errorMessage && 'text-red-500')}
      >
        {inputAttrs?.value?.toString().length}
        {typeof counter === 'object' && `/${counter.maxLength || 0}`}
      </div>
    );

  const { onChange, wrapperClassName, ...restInputAttrs } = inputAttrs || {};

  return (
    <div className={className}>
      <label>
        {isValidElement(label)
          ? label
          : !!label && (
              <div
                className={cn(
                  'mb-2 flex flex-nowrap gap-1 text-sm font-medium',
                  labelClassName,
                )}
              >
                {required && <span className="text-red-500">*</span>}
                <span
                  style={
                    labelLineClamp &&
                    ({
                      wordBreak: 'break-all',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: labelLineClamp,
                      // eslint-disable-next-line
                    } as any)
                  }
                  title={`${label}`}
                >
                  {label}
                </span>
                {!!tooltip && (
                  <Tooltip
                    {...tooltipConfig}
                    config={{
                      ...tooltip.config,
                      trigger: {
                        ...tooltip.config?.trigger,
                        asChild: true,
                      },
                    }}
                  >
                    <div className="inline-block">
                      <RiInformationLine
                        className={cn(
                          'w-4.5 h-4.5 text-gray-11 inline-block ml-1 -mt-0.5',
                          tooltipIconClassName,
                        )}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            )}

        <div
          className={cn(
            'relative border border-gray-3 bg-white rounded-md flex items-center px-3 py-3 gap-3 min-h-[45px] text-sm',
            'focus-within:border-ring focus-within:ring-ring/30 focus-within:ring-[3px]',
            errorMessage && 'border-red-700',
            disabled && 'cursor-not-allowed opacity-50',
            wrapperClassName,
          )}
        >
          {!!prefix && (isValidElement(prefix) ? prefix : <div>{prefix}</div>)}
          <Input
            {...restInputAttrs}
            type={inputType}
            placeholder={placeholder}
            onChange={(e) => {
              const value = e.target.value;

              if (
                counter &&
                typeof counter === 'object' &&
                value.length > counter.maxLength
              ) {
                // Truncate the value if it exceeds maxLength
                e.target.value = truncateString(
                  value,
                  counter.maxLength,
                  false,
                );
              }

              // Ensure the modified event is passed down to the onChange handler
              onChange?.(e);
            }}
            name={name}
            className={cn(
              'border-none px-0 py-0 p-0 h-auto min-h-0 bg-transparent rounded-none shadow-none focus-visible:ring-0',
              showTogglePasswordButton ? 'pr-10' : '',
              !!prefix && 'pr-3',
              inputAttrs?.className,
            )}
            disabled={disabled}
            data-testid={inputAttrs?.dataTestId}
          />

          {showTogglePasswordButton && (
            <button
              tabIndex={1}
              onClick={() => {
                setInputType(inputType === 'password' ? 'text' : 'password');
              }}
              type="button"
              className="absolute right-3 top-50% -translate-y-1/2 text-gray-3"
            >
              <EyeIcon className="block w-4.5"></EyeIcon>
            </button>
          )}

          {!!suffix &&
            (isValidElement(suffix) ? (
              suffix
            ) : typeof suffix === 'function' ? (
              suffix({
                counter: {
                  currentLength: inputAttrs?.value?.toString().length || 0,
                  maxLength:
                    typeof counter === 'object' ? counter.maxLength : 0,
                },
              })
            ) : (
              <div className="text-black/60">{suffix}</div>
            ))}
        </div>
      </label>

      {customErrorMessageElement &&
        (typeof customErrorMessageElement === 'function'
          ? customErrorMessageElement({
              counter: {
                currentLength: inputAttrs?.value?.toString().length || 0,
                maxLength: typeof counter === 'object' ? counter.maxLength : 0,
                defaultElement: <DefaultCounterElement />,
              },
            })
          : customErrorMessageElement)}

      {(errorMessage || counter) && !customErrorMessageElement && (
        <div
          className={cn(
            'flex justify-end mt-1',
            errorMessage && 'justify-between',
          )}
        >
          {/* error message */}
          <FormErrorMessage>{errorMessage}</FormErrorMessage>

          {/* counter */}
          {counter && <DefaultCounterElement />}
        </div>
      )}

      {isValidElement(note)
        ? note
        : note && (
            <div className={cn('text-neutral-500', noteClassName)}>{note}</div>
          )}
    </div>
  );
}

export default FormGroupInput;

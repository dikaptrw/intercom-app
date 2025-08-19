import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/functions/index';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export interface TooltipGroupProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'content'> {
  config?: {
    provider?: Omit<TooltipPrimitive.TooltipProviderProps, 'children'>;
    root?: Omit<TooltipPrimitive.TooltipProps, 'children'>;
    trigger?: Omit<
      TooltipPrimitive.TooltipTriggerProps,
      'children' | 'className'
    >;
    content?: Omit<
      TooltipPrimitive.TooltipContentProps,
      'children' | 'className'
    >;
    portal?: Omit<TooltipPrimitive.TooltipPortalProps, 'children'>;
    arrow?: Omit<TooltipPrimitive.TooltipArrowProps, 'className'>;
  };
  children: React.ReactNode;
  content: React.ReactNode;
  contentClassName?: string;
  arrowClassName?: string;
  className?: string;
}

// default value for config provider
const CONFIG_PROVIDER: Omit<TooltipPrimitive.TooltipProviderProps, 'children'> =
  {
    delayDuration: 150,
  };

const TooltipGroup = ({
  children,
  content,
  className,
  contentClassName,
  arrowClassName,
  config = {
    provider: {
      delayDuration: 150,
    },
  },
  ...triggerProps
}: TooltipGroupProps) => {
  return (
    <TooltipPrimitive.Provider {...{ ...CONFIG_PROVIDER, ...config?.provider }}>
      <TooltipPrimitive.Root {...config?.root}>
        <TooltipPrimitive.Trigger
          {...config?.trigger}
          {...triggerProps}
          className={cn('', className)}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal {...config?.portal}>
          <TooltipPrimitive.Content
            {...config?.content}
            className={cn(
              'z-[100] max-w-[250px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-white select-none rounded-[4px] bg-black-3/90 px-[12px] py-[6px] text-[15px] leading-normal shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]',
              contentClassName,
            )}
          >
            {content}
            <TooltipPrimitive.Arrow
              {...config?.arrow}
              className={cn('fill-black-3/90', arrowClassName)}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipGroup,
};

import { GalleryVerticalEnd } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/functions';
import FormGroupInput from './form-groups/form-group-input';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
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
              Let’s get started — what’s your name?
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <FormGroupInput
                type="text"
                label="Name"
                placeholder="Input your name here"
              />
            </div>
            <Button type="submit" className="w-full">
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

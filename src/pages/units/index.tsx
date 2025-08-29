import { Button } from '@/components/ui/button';
import { useScrollShadows } from '@/hooks/useScrollShadows';
import { getInitials } from '@/utils/functions';
import { HouseWifi, Phone } from 'lucide-react';

function UnitsPage() {
  const { ref, showBottomShadow, showTopShadow } =
    useScrollShadows<HTMLDivElement>();

  return (
    <div className="bg-background flex h-svh max-h-svh justify-center gap-6 p-6">
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <HouseWifi className="size-6" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </a>
          <h1 className="text-xl font-bold">Select a Unit Below</h1>
          <div className="text-center text-sm">
            Choose the unit you’d like to interact with to continue.
          </div>
        </div>

        <div className="relative flex-1 h-full mt-5">
          {/* Top shadow */}
          {showTopShadow && (
            <div className="pointer-events-none absolute z-[2] top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent" />
          )}

          <div
            ref={ref}
            className="absolute z-[1] inset-0 flex overflow-y-auto flex-col gap-4 max-h-full no-scrollbar"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
              return (
                <div
                  key={i}
                  className="border rounded-md px-3 py-2 text-sm flex items-center gap-4"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold bg-primary/10 text-sm">
                    {getInitials('Unit 1')}
                  </div>
                  <div className="flex-1 flex-col sm:flex-row flex sm:items-center sm:gap-2">
                    <div className="shrink-0 font-semibold text-sm line-clamp-1 break-all">
                      Unit 1
                    </div>
                    <div className="text-xs sm:text-sm line-clamp-1 break-all">
                      (Dika Putra)
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size={'xs'}>
                      <Phone />
                      <span>Call</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom shadow */}
          {showBottomShadow && (
            <div className="pointer-events-none absolute z-[2] bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/5 to-transparent" />
          )}
        </div>

        <div className="pt-4 md:pt-5 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By continuing, you agree to our <br />{' '}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

export default UnitsPage;

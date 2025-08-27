import { cn } from '@/utils/functions';
import RoomChat from './room-chat';
import { useRoom } from '@/hooks/useRoom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useCallback } from 'react';

interface RoomSideMenuProps {
  className?: string;
}

function RoomSideMenu({ className }: RoomSideMenuProps) {
  const { sideMenu, setSideMenu } = useRoom();

  const getMenuName = useCallback(() => {
    switch (sideMenu) {
      case 'chat':
        return 'In-call messages';
      case 'info':
        return 'Meeting details';
      case 'participants':
        return 'Participants';
      default:
        break;
    }
  }, [sideMenu]);

  return (
    <AnimatePresence>
      {!!sideMenu && (
        <motion.div
          initial={{
            translateX: 400,
            maxWidth: 0,
          }}
          animate={{
            translateX: 0,
            maxWidth: 400,
          }}
          exit={{
            translateX: 400,
            maxWidth: 0,
          }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.3,
          }}
          className={cn(
            'hidden lg:flex pr-4 lg:pt-4 w-[400px] flex-col items-center justify-center',
            className,
          )}
        >
          <div className="flex flex-col bg-white rounded-xl w-full h-full flex-1">
            <div className="px-4 py-4 flex items-center justify-between gap-4">
              <div className="font-medium text-lg">{getMenuName()}</div>

              <Button
                onClick={() => setSideMenu(undefined)}
                variant={'ghost'}
                size={'icon'}
                className="rounded-full"
              >
                <X className="w-5 h-5 size-6" />
              </Button>
            </div>

            {sideMenu === 'chat' && <RoomChat className="min-w-[385px]" />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RoomSideMenu;

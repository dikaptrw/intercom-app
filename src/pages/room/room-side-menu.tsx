import { cn } from '@/utils/functions';
import RoomChat from './room-chat';
import { useRoom } from '@/hooks/useRoom';
import { motion, AnimatePresence } from 'motion/react';

interface RoomSideMenuProps {
  className?: string;
}

function RoomSideMenu({ className }: RoomSideMenuProps) {
  const { sideMenu } = useRoom();

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
          {sideMenu === 'chat' && <RoomChat className="min-w-[385px]" />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RoomSideMenu;

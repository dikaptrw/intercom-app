import type { Participant } from '@/utils/types/meeting';
import { cn, getInitials } from '@/utils/functions';
import {
  LocalVideo,
  RemoteVideo,
  useLocalVideo,
} from 'amazon-chime-sdk-component-library-react';
import RosterAttendee from './roster-attendee';
import { motion, AnimatePresence } from 'motion/react';
import { usePictureInPicture } from '@/hooks/usePictureInPicture';
import TileActions from './tile-actions';

export interface ParticipantTileProps {
  participant?: Participant;
  className?: string;
  simpleUi?: boolean;
}

const FallbackInitials = ({ name }: { name: string }) => {
  const initials = getInitials(name);
  return (
    <div className="shadow-[0_0_200px_40px_rgba(255,255,255,0.05)] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[5] text-white p-1 rounded-full shrink-0 w-[35%] sm:w-auto sm:h-[20%] md:h-[30%] aspect-square flex items-center justify-center font-medium uppercase [container-type:inline-size] bg-room-background/60">
      <span className="!text-[35cqw] md:!text-[40cqw]">{initials}</span>
    </div>
  );
};

const ParticipantTile = ({
  participant,
  className,
  simpleUi = false,
}: ParticipantTileProps) => {
  const { isVideoEnabled } = useLocalVideo();

  const { isPiP, togglePiP } = usePictureInPicture({
    attendeeId: participant?.attendeeId,
  });

  return (
    <div
      className={cn(
        'relative group/participant w-full h-full bg-room-secondary rounded-xl overflow-hidden flex items-center justify-center',
        className,
      )}
    >
      <div className="absolute inset-0 w-full h-full bg-black/10"></div>

      <div className="flex items-center justify-center w-full h-full">
        {/* tile actions */}
        {!simpleUi && false && (
          <div className="absolute opacity-0 group-hover/participant:opacity-100 transition-opacity duration-300 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[9]">
            <TileActions
              attendeeId={participant?.attendeeId || ''}
              togglePiP={togglePiP}
            />
          </div>
        )}

        <AnimatePresence>
          {isPiP && (
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="absolute inset-0 bg-room-secondary z-10 flex items-center justify-center"
            >
              <span className="text-white text-lg">
                Picture-in-Picture Mode
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Aspect ratio video inside */}
        <div className="w-full h-full max-w-full max-h-full">
          {participant?.isLocal ? (
            isVideoEnabled ? (
              <LocalVideo className="!bg-room-background [&>.ch-video]:!aspect-video [&>.ch-video]:!object-contain w-full h-full" />
            ) : (
              <FallbackInitials name={participant?.name || 'You'} />
            )
          ) : participant?.tileId ? (
            <RemoteVideo
              tileId={participant?.tileId}
              className="!bg-room-background [&>.ch-video]:!aspect-video [&>.ch-video]:!object-contain w-full h-full"
            />
          ) : (
            <FallbackInitials name={participant?.name || 'Anonymous'} />
          )}
        </div>
      </div>

      <div className="[&_.ch-subtitle]:!text-sm absolute z-[11] bottom-0.5 md:bottom-1.5 left-3 md:left-5 right-2 md:right-3 bg-opacity-50 text-white p-1 font-medium">
        <RosterAttendee
          simpleUi={simpleUi}
          attendeeId={participant?.attendeeId || ''}
        />
      </div>
    </div>
  );
};

export default ParticipantTile;

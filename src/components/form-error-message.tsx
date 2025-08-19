import { cn } from '@/utils/functions';

export interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

function FormErrorMessage({ children, className }: FormErrorMessageProps) {
  return (
    <div className={cn('text-red-700 text-xs', className)}>{children}</div>
  );
}

export default FormErrorMessage;

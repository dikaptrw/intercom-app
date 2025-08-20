import { Toaster } from '@/components/ui/sonner';

export interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Toaster />

      {children}
    </>
  );
}

export default MainLayout;

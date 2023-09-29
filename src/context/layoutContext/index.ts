import { createContext } from 'react';

interface ILayoutContext {
  showAdminSidebar: boolean,
  setShowAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export const layoutContext = createContext<ILayoutContext>({
  showAdminSidebar: false,
  setShowAdminSidebar: () => null
});
import type { ReactNode } from 'react';

export interface ModalProps {
  open?: boolean;
  modalState?: boolean;
  errorModal?: boolean;
  onClose?: () => void;
  onExit?: () => void;
  children: ReactNode;
  width?: string;
  ariaLabel: string;
}

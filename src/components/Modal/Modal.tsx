import React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { theme } from '@/design-system/theme';
import type { ModalProps } from '@/types/ui/modal';

const ModalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const ModalBgShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalContainer = styled.dialog`
  position: fixed;
  inset: 0;
  z-index: 99;
  width: min(100vw, 100%);
  height: min(100vh, 100%);
  padding: 0;
  border: none;
  margin: 0;
  background: transparent;
  overflow: hidden;
  max-width: none;
  max-height: none;

  &::backdrop {
    background-color: ${theme.colors.overlay};
    backdrop-filter: blur(10px);
    animation: ${ModalBgShow} 0.3s;
  }
`;

const ModalContent = styled.div<{ width?: string }>`
  width: ${({ width }) => width || '470px'};
  height: auto;
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  border-radius: ${theme.radii.xl};
  background: ${theme.colors.surfaceElevated};
  box-shadow: ${theme.shadow.medium};
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

const ModalShell = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 16px;
`;

const Modal = ({ open, modalState, errorModal, onClose, onExit, children, width = '540px', ariaLabel }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const wasOpenRef = useRef(false);
  const visible = useMemo(() => open ?? modalState ?? errorModal ?? false, [open, modalState, errorModal]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (visible) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (wasOpenRef.current && dialog.open) {
      dialog.close();
    }

    wasOpenRef.current = visible;
  }, [visible]);

  useEffect(() => {
    if (!visible && wasOpenRef.current) {
      const timer = window.setTimeout(() => {
        onExit?.();
      }, 0);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [visible, onExit]);

  const handleRequestClose = () => {
    onClose?.();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      handleRequestClose();
    }
  };

  return (
    <ModalContainer
      ref={dialogRef}
      aria-label={ariaLabel}
      onCancel={(event) => {
        event.preventDefault();
        handleRequestClose();
      }}
      onClick={handleBackdropClick}
    >
      <ModalShell>
        <ModalContent width={width}>{children}</ModalContent>
      </ModalShell>
    </ModalContainer>
  );
};

export default Modal;

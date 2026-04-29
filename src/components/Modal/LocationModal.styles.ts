import styled from '@emotion/styled';
import { theme } from '@/design-system/theme';

export const LocationResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  max-height: 320px;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
`;

export const LocationSearchEmptyWrap = styled.div`
  border: 1px dashed ${theme.colors.borderStrong};
  border-radius: ${theme.radii.lg};
  background: ${theme.colors.backgroundSoft};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
`;

export const LocationSearchFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`;

const LocationSearchFooterButtonBase = styled.button`
  min-width: 108px;
  height: 44px;
  padding: 0 ${theme.spacing.lg};
  border-radius: ${theme.radii.round};
  box-shadow: ${theme.shadow.inset};
  font-weight: 700;
  transition: transform ${theme.motion.base}, box-shadow ${theme.motion.base}, opacity ${theme.motion.base};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.soft};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const LocationSearchFooterPrimaryButton = styled(LocationSearchFooterButtonBase)`
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.surfaceElevated};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover});
`;

export const LocationSearchFooterSecondaryButton = styled(LocationSearchFooterButtonBase)`
  border: 1px solid ${theme.colors.borderStrong};
  color: ${theme.colors.text};
  background: ${theme.colors.surfaceElevated};
`;

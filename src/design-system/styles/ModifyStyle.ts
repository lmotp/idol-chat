import styled from '@emotion/styled';
import { theme } from '@/design-system/theme';
import type { HeightProp, PaddingProp, TextAlignProp, WidthProp } from '@/types/ui/styled-props';

export const ModifyInfoTextArea = styled.textarea<HeightProp>`
  width: 100%;
  height: ${({ height }) => height || '96px'};
  padding: 14px 16px;
  border-radius: ${theme.radii.sm};
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.typography.small};
  color: ${theme.colors.text};
  resize: none;
  outline: none;
  background: ${theme.colors.surfaceElevated};
  box-shadow: ${theme.shadow.inset};
  transition: border-color ${theme.motion.base}, box-shadow ${theme.motion.base};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(36, 87, 214, 0.12);
  }

  &::placeholder {
    color: ${theme.colors.textSoft};
    font-size: ${theme.typography.small};
  }
`;

export const ModifyInfoInput = styled.input<WidthProp & PaddingProp & TextAlignProp>`
  width: ${({ width }) => width || '100%'};
  padding: ${({ pd }) => pd || '12px 14px'};
  border-radius: ${theme.radii.sm};
  border: 1px solid ${theme.colors.border};
  outline: none;
  text-align: ${({ al }) => al || 'left'};
  position: relative;
  background: ${theme.colors.surfaceElevated};
  color: ${theme.colors.text};
  box-shadow: ${theme.shadow.inset};
  transition: border-color ${theme.motion.base}, box-shadow ${theme.motion.base};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(36, 87, 214, 0.12);
  }

  &:last-child {
    border: none;
    padding: 0;
  }

  &::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

export const ButtonWrap = styled.div`
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg} 0;
  text-align: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent);
`;

export const ModifyButton = styled.button<PaddingProp>`
  margin-right: ${theme.spacing.sm};
  padding: ${({ pd }) => pd || '10px 16px'};
  color: ${theme.colors.surfaceElevated};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover});
  border-radius: ${theme.radii.round};
  box-shadow: ${theme.shadow.soft};
  transition: transform ${theme.motion.base}, box-shadow ${theme.motion.base};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.medium};
  }

  &:last-child {
    margin-right: 0;
  }
`;

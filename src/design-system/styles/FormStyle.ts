import styled from "@emotion/styled";
import { theme } from "@/design-system/theme";
import type {
  BorderProp,
  ColorProp,
  CursorProp,
  FontSizeProp,
  MarginLeftProp,
  MarginProp,
  MarginTopProp,
  PaddingProp,
  TextAlignProp,
  WidthProp,
} from "@/types/ui/styled-props";

export const Form = styled.form<PaddingProp>`
  width: 100%;
  padding: ${({ pd }) => pd || `clamp(${theme.spacing.lg}, 4vw, ${theme.spacing.xl})`};
`;

export const InputWrap = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const Input = styled.input<WidthProp & MarginLeftProp & BorderProp & FontSizeProp & CursorProp>`
  width: ${({ width }) => width || "100%"};
  flex: 1;
  padding: 14px 0;
  outline: none;
  border: none;
  margin-left: ${({ ml }) => ml || "0"};
  border-bottom: ${({ border }) => border || `1px solid ${theme.colors.border}`};
  font-size: ${({ fz }) => fz || theme.typography.body};
  font-weight: 600;
  cursor: ${({ cursor }) => cursor || "auto"};
  color: ${theme.colors.text};
  background: transparent;
  transition:
    border-color ${theme.motion.base},
    box-shadow ${theme.motion.base};

  &::placeholder {
    color: ${theme.colors.textSoft};
    font-weight: 500;
  }

  &:focus {
    border-bottom-color: ${theme.colors.primary};
    box-shadow: 0 1px 0 0 ${theme.colors.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.typography.small};
  font-weight: 600;
  color: ${theme.colors.textMuted};
  letter-spacing: -0.01em;
`;

export const AuthButton = styled.button<{ color?: string; margin?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  width: 100%;
  height: 52px;
  padding: 0 ${theme.spacing.lg};
  color: ${theme.colors.surfaceElevated};
  background: ${({ color }) =>
    color || `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover})`};
  border-radius: ${theme.radii.round};
  margin: ${({ margin }) => margin || `${theme.spacing.lg} 0`};
  box-shadow: ${theme.shadow.soft};
  transition:
    transform ${theme.motion.base},
    box-shadow ${theme.motion.base},
    opacity ${theme.motion.base};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.medium};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadow.soft};
  }
`;

export const AuthButtonWrap = styled.div<MarginTopProp>`
  margin-top: ${({ mt }) => mt || theme.spacing.xl};
  text-align: center;
`;

export const ErrorValue = styled.div`
  margin-top: ${theme.spacing.xs};
  font-size: 12px;
  color: ${theme.colors.danger};
`;

export const SignUpItemBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
  flex-wrap: wrap;
`;

export const Icon = styled.div`
  margin-right: ${theme.spacing.xs};
`;

export const Line = styled.div<MarginProp & WidthProp>`
  position: relative;
  margin: ${({ margin }) => margin || "0"};
  text-align: center;
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.small};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: ${({ width }) => width || "40%"};
    height: 1px;
    background: ${theme.colors.border};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const LocationButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: ${theme.radii.sm};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surfaceElevated};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.primary};
  box-shadow: ${theme.shadow.inset};
  transition:
    border-color ${theme.motion.base},
    transform ${theme.motion.base};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const ClassMemberCountWrap = styled.div<MarginTopProp>`
  width: 100%;
  margin-top: ${({ mt }) => mt || theme.spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const ClassMemberCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text};
`;

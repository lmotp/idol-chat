import styled from '@emotion/styled';
import { theme } from '@/design-system/theme';
import type { SelectProp } from '@/types/ui/styled-props';

export const SelectCategoryText = styled.span<SelectProp>`
  display: inline-flex;
  align-items: center;
  margin-right: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  padding: 8px 14px;
  border-radius: ${theme.radii.round};
  border: 1px solid ${({ select }) => (select ? theme.colors.primary : theme.colors.border)};
  cursor: pointer;
  background: ${({ select }) =>
    select ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover})` : theme.colors.surfaceElevated};
  color: ${({ select }) => (select ? theme.colors.surfaceElevated : theme.colors.textMuted)};
  box-shadow: ${({ select }) => (select ? theme.shadow.soft : 'none')};
  transition: transform ${theme.motion.base}, background-color ${theme.motion.base}, color ${theme.motion.base};

  &:hover {
    transform: translateY(-1px);
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const SelectCategoryTextBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

export const Hr = styled.hr`
  border: none;
  height: 1px;
  margin: ${theme.spacing.lg} 0;
  background: linear-gradient(90deg, transparent, ${theme.colors.borderStrong}, transparent);
`;

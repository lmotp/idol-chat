import styled from '@emotion/styled';
import { theme } from '@/design-system/theme';
import type { AddressSuggestion } from '@/types/domain/address';

type LocationSearchItemProps = {
  item: AddressSuggestion;
  onSelect: (item: AddressSuggestion) => void;
};

const ItemButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  background: ${theme.colors.surfaceElevated};
  text-align: left;
  cursor: pointer;
  box-shadow: ${theme.shadow.inset};
  transition: border-color ${theme.motion.base}, transform ${theme.motion.base}, box-shadow ${theme.motion.base};

  &:hover,
  &:focus-visible {
    border-color: ${theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.soft};
    outline: none;
  }
`;

const ItemTitle = styled.div`
  color: ${theme.colors.text};
  font-size: ${theme.typography.body};
  font-weight: 700;
  line-height: 1.4;
`;

const ItemMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.small};
  line-height: 1.5;
`;

const LocationSearchItem = ({ item, onSelect }: LocationSearchItemProps) => {
  const secondaryInfo = [item.roadAddress, item.jibunAddress].filter(Boolean);

  return (
    <li>
      <ItemButton type="button" aria-label={item.label} onClick={() => onSelect(item)}>
        <ItemTitle>{item.label}</ItemTitle>
        {secondaryInfo.length > 0 ? (
          <ItemMeta>
            {item.roadAddress ? <span>도로명: {item.roadAddress}</span> : null}
            {item.jibunAddress ? <span>지번: {item.jibunAddress}</span> : null}
          </ItemMeta>
        ) : null}
      </ItemButton>
    </li>
  );
};

export default LocationSearchItem;


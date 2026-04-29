import styled from '@emotion/styled';
import { theme } from '@/design-system/theme';
import { LocationSearchEmptyWrap } from './LocationModal.styles';

type LocationSearchEmptyProps = {
  title: string;
  description?: string;
};

const EmptyTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.text};
  font-size: ${theme.typography.body};
  font-weight: 700;
`;

const EmptyDescription = styled.p`
  margin: ${theme.spacing.xs} 0 0;
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.small};
  line-height: 1.5;
`;

const LocationSearchEmpty = ({ title, description }: LocationSearchEmptyProps) => {
  return (
    <LocationSearchEmptyWrap>
      <EmptyTitle>{title}</EmptyTitle>
      {description ? <EmptyDescription>{description}</EmptyDescription> : null}
    </LocationSearchEmptyWrap>
  );
};

export default LocationSearchEmpty;


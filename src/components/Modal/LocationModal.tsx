import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/design-system/theme';
import { addressApi } from '@/services/address/addressApi';
import type { AddressSuggestion } from '@/types/domain/address';
import LocationSearchEmpty from './LocationSearchEmpty';
import LocationSearchItem from './LocationSearchItem';
import {
  LocationResultList,
  LocationSearchFooter,
  LocationSearchFooterPrimaryButton,
  LocationSearchFooterSecondaryButton,
} from './LocationModal.styles';
import type { FormEvent } from 'react';

type LocationModalProps = {
  setNowLocation: (value: string) => void;
  onClose?: () => void;
  onUseCurrentLocation?: () => Promise<string>;
};

const LocationModalWrap = styled.div`
  width: 100%;
  padding: ${theme.spacing.xl};
`;

const LocationModalHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
`;

const LocationModalTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text};
  font-size: ${theme.typography.heading};
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const LocationModalDescription = styled.p`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.small};
  line-height: 1.5;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const SearchField = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: stretch;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 48px;
  padding: 0 ${theme.spacing.md};
  border: 1px solid ${theme.colors.borderStrong};
  border-radius: ${theme.radii.round};
  background: ${theme.colors.surfaceElevated};
  color: ${theme.colors.text};
  font-size: ${theme.typography.body};
  outline: none;
  transition: border-color ${theme.motion.base}, box-shadow ${theme.motion.base};

  &::placeholder {
    color: ${theme.colors.textSoft};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primarySoft};
  }
`;

const SearchButton = styled.button`
  min-width: 92px;
  height: 48px;
  padding: 0 ${theme.spacing.lg};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radii.round};
  color: ${theme.colors.surfaceElevated};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover});
  font-weight: 700;
  box-shadow: ${theme.shadow.soft};
  transition: transform ${theme.motion.base}, box-shadow ${theme.motion.base}, opacity ${theme.motion.base};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.medium};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const SearchStatus = styled.div`
  margin-top: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.small};
  line-height: 1.5;
`;

const SearchError = styled.div`
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.danger};
  font-size: ${theme.typography.small};
  line-height: 1.5;
`;

const SearchSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`;

const LocationModal = ({ setNowLocation, onClose, onUseCurrentLocation }: LocationModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const next = await addressApi.search(query);
      setResults(next);
    } catch {
      setError('주소를 불러오지 못했습니다.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: AddressSuggestion) => {
    setNowLocation(item.label);
    setResults([]);
    onClose?.();
  };

  const handleUseCurrentLocation = async () => {
    try {
      setError(null);
      const address = onUseCurrentLocation ? await onUseCurrentLocation() : '';

      if (!address) {
        throw new Error('현재 위치를 가져오지 못했습니다.');
      }

      setNowLocation(address);
    } catch {
      setError('현재 위치를 가져오지 못했습니다. 직접 주소를 검색해 주세요.');
    }
  };

  const isEmpty = !loading && !error && results.length === 0;
  const showEmptyResults = hasSearched && isEmpty;
  const showInitialPrompt = !hasSearched && isEmpty;

  return (
    <LocationModalWrap>
      <LocationModalHeader>
        <LocationModalTitle>주소 검색</LocationModalTitle>
        <LocationModalDescription>동, 구, 도로명으로 검색해서 위치를 선택하세요.</LocationModalDescription>
      </LocationModalHeader>

      <SearchForm onSubmit={handleSubmit}>
        <SearchField>
          <SearchInput
            type="text"
            aria-label="주소 검색"
            placeholder="예: 자양동, 광진구, 테헤란로"
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;
              setQuery(nextQuery);

              if (error) {
                setError(null);
              }

              if (!nextQuery.trim()) {
                setHasSearched(false);
                setResults([]);
              }
            }}
          />
          <SearchButton type="submit" disabled={loading}>
            {loading ? '검색 중' : '검색'}
          </SearchButton>
        </SearchField>
        {error ? <SearchError role="alert">{error}</SearchError> : null}
      </SearchForm>

      <SearchSection aria-live="polite">
        {loading ? <SearchStatus>주소를 불러오는 중입니다.</SearchStatus> : null}
        {showInitialPrompt ? (
          <LocationSearchEmpty
            title="검색어를 입력해 주세요."
            description="검색어를 입력한 뒤 검색 버튼을 누르면 결과가 표시됩니다."
          />
        ) : showEmptyResults ? (
          <LocationSearchEmpty
            title="검색 결과가 없습니다."
            description="다른 키워드로 다시 검색해 보세요."
          />
        ) : (
          <LocationResultList>
            {results.map((item) => (
              <LocationSearchItem key={item.id} item={item} onSelect={handleSelect} />
            ))}
          </LocationResultList>
        )}
      </SearchSection>

      <LocationSearchFooter>
        <LocationSearchFooterPrimaryButton type="button" onClick={handleUseCurrentLocation}>
          현재 위치 사용
        </LocationSearchFooterPrimaryButton>
        <LocationSearchFooterSecondaryButton type="button" onClick={() => onClose?.()}>
          취소
        </LocationSearchFooterSecondaryButton>
      </LocationSearchFooter>
    </LocationModalWrap>
  );
};

export default LocationModal;

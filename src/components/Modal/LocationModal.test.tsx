import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationModal from './LocationModal';
import { addressApi } from '@/services/address/addressApi';
import type { AddressSuggestion } from '@/types/domain/address';

jest.mock('@/services/address/addressApi', () => ({
  addressApi: {
    search: jest.fn(),
  },
}));

const searchMock = addressApi.search as jest.MockedFunction<typeof addressApi.search>;

describe('LocationModal', () => {
  beforeEach(() => {
    searchMock.mockReset();
  });

  it('renders search results from addressApi and selects an item', async () => {
    const user = userEvent.setup();
    const setNowLocation = jest.fn();
    const onClose = jest.fn();
    const results: AddressSuggestion[] = [
      {
        id: '1',
        label: '서울 광진구 자양동 123-45',
        roadAddress: '서울 광진구 자양로 1',
        jibunAddress: '서울 광진구 자양동 123-45',
      },
    ];

    searchMock.mockResolvedValueOnce(results);

    render(<LocationModal setNowLocation={setNowLocation} onClose={onClose} />);

    await user.type(screen.getByLabelText('주소 검색'), '자양동');
    await user.click(screen.getByRole('button', { name: '검색' }));

    expect(searchMock).toHaveBeenCalledWith('자양동');

    const item = await screen.findByRole('button', { name: '서울 광진구 자양동 123-45' });
    await user.click(item);

    expect(setNowLocation).toHaveBeenCalledWith('서울 광진구 자양동 123-45');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows an empty state when the search returns no results', async () => {
    const user = userEvent.setup();
    searchMock.mockResolvedValueOnce([]);

    render(<LocationModal setNowLocation={jest.fn()} />);

    await user.type(screen.getByLabelText('주소 검색'), '부정확한 검색어');
    await user.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
  });
});

import { addressApi } from '@/services/address/addressApi';

export const useCurrentLocation = () => {
  const resolveCurrentLocation = async (): Promise<string> => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      throw new Error('현재 위치를 사용할 수 없는 브라우저입니다.');
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });

    const address = await addressApi.reverse(position.coords.latitude, position.coords.longitude);
    if (!address) {
      throw new Error('현재 위치를 주소로 변환하지 못했습니다.');
    }

    return address;
  };

  return { resolveCurrentLocation };
};

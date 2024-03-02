import { useEffect } from 'react';
import { dataIsErrorSelector } from '~/store/data.slice';
import { useAppSelector } from '~/store/hooks';

export function ErrorContainer() {
  const isError = useAppSelector(dataIsErrorSelector);

  useEffect(() => {
    if (isError) {
      alert(
        'ВОЗНИКЛА СЕРЬЕЗНАЯ ОШИБКА!. Дальнейшая работа не гарантирована! РЕКОМЕНДУЕМ обновить страницу и проверить сетевое соединение!',
      );
    }
  }, [isError]);

  return <></>;
}

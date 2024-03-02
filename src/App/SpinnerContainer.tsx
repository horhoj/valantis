import { dataIsLoadingSelector } from '~/store/data.slice';
import { useAppSelector } from '~/store/hooks';
import { Spinner } from '~/ui/Spinner';

export function SpinnerContainer() {
  const isLoading = useAppSelector(dataIsLoadingSelector);

  return <Spinner isShow={isLoading} />;
}

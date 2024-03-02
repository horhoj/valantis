import classNames from 'classnames';
import styles from './Loader.module.scss';
import { dataIsLoadingSelector } from '~/store/data.slice';
import { useAppSelector } from '~/store/hooks';

interface LoaderProps {
  children?: React.ReactNode;
}
export function Loader({ children }: LoaderProps) {
  const isLoading = useAppSelector(dataIsLoadingSelector);

  return (
    <div className={classNames(styles.Loader, isLoading && styles.isLoading)}>
      {children}
      {isLoading && <div className={styles.loaderViewLayout} />}
    </div>
  );
}

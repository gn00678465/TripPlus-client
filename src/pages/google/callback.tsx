import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, name, roles } = context.query;
  if (!!token && !!name && !!roles) {
    return {
      props: {
        userData: {
          token,
          name,
          roles: JSON.parse(roles as string)
        }
      }
    };
  }
  return {
    notFound: true
  };
};

export interface GoogleCallbackProps {
  userData: ApiAuth.UserInfo;
}

export default function GoogleCallback({ userData }: GoogleCallbackProps) {
  const router = useRouter();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    setUserInfo(userData);
    router.push('/');
  }, [userData]);

  return <div></div>;
}

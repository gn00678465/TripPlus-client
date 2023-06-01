import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps as _BreadcrumbProps
} from '@chakra-ui/react';

export interface Breadcrumb {
  name: string;
  url: string;
}

interface BreadcrumbProps extends _BreadcrumbProps {
  breadcrumb: Breadcrumb[];
}

const BreadcrumbList = ({ breadcrumb, ...rest }: BreadcrumbProps) => {
  return (
    <>
      <Breadcrumb color={'gray.500'} {...rest}>
        {breadcrumb.map((item, index) => (
          <BreadcrumbItem
            key={item.name}
            isCurrentPage={index === breadcrumb.length - 1}
            className={index === breadcrumb.length - 1 ? 'text-gray-600' : ''}
          >
            <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbList;

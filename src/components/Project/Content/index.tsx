import { ReactNode } from 'react';

export interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <>
      <div className="content">{children}</div>
      <style jsx global>
        {`
          .content {
            color: #4f4f4f;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            letter-spacing: 1px;
          }

          .content p,
          ol,
          ul {
            color: #4f4f4f;
            margin-bottom: 0.75rem;
          }

          .content h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: 16px;
            line-height: 19px;
            letter-spacing: 1px;
            color: #1a1a1a;
            margin-bottom: 0.75rem;
          }

          .content *:last-child {
            margin-bottom: 0;
          }

          ul li:not(:last-child) {
            margin-bottom: 0.25rem;
          }

          ol li:not(:last-child) {
            margin-bottom: 0.25rem;
          }

          strong {
            font-weight: 700;
          }

          @media screen and (min-width: 768px) {
            .content {
              font-size: 16px;
              font-weight: 400;
              line-height: 24px;
              letter-spacing: 1px;
            }

            .content h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-size: 20px;
              line-height: 24px;
              letter-spacing: 1px;
              color: #1a1a1a;
              margin-bottom: 1rem;
            }

            .content p,
            ol,
            ul {
              margin-bottom: 1rem;
            }
          }
        `}
      </style>
    </>
  );
};

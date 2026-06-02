import React from 'react';

interface PageHeaderProps {
  breadcrumbs: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumbs, title, description, action }) => {
  return (
    <div className="page-header">
      <div className="breadcrumbs">{breadcrumbs}</div>
      <div className="title-row">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {action && <div className="page-header-action mt-2 mt-sm-0">{action}</div>}
      </div>
    </div>
  );
};
export default PageHeader;

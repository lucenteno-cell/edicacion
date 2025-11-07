import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const PlusIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

export const PermissionIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 1.944c1.923 0 3.74.764 5.12 2.143l-1.413 1.414A5.002 5.002 0 0010 4a5 5 0 00-3.707 1.501L4.88 4.087A7.002 7.002 0 0110 1.944zM18.056 10a8.026 8.026 0 01-2.143 5.12l-1.414-1.413A5.002 5.002 0 0016 10a5 5 0 00-1.501-3.707l1.414-1.414A8.026 8.026 0 0118.056 10zM1.944 10a8.026 8.026 0 012.143-5.12l1.414 1.413A5.002 5.002 0 004 10a5 5 0 001.501 3.707l-1.414 1.414A8.026 8.026 0 011.944 10zM10 18.056c-1.923 0-3.74-.764-5.12-2.143l1.413-1.414A5.002 5.002 0 0010 16a5 5 0 003.707-1.501l1.414 1.414A7.002 7.002 0 0110 18.056z" clipRule="evenodd" />
        <path d="M10 3a1 1 0 01.867.5l.267.533a1 1 0 001.732 0l.267-.533A1 1 0 0114 3h2a1 1 0 011 1v2a1 1 0 01-.5.867l-.533.267a1 1 0 000 1.732l.533.267A1 1 0 0117 10v2a1 1 0 01-1 1h-2a1 1 0 01-.867-.5l-.267-.533a1 1 0 00-1.732 0l-.267.533A1 1 0 0110 14H8a1 1 0 01-1-1v-2a1 1 0 01.5-.867l.533-.267a1 1 0 000-1.732l-.533-.267A1 1 0 013 8V6a1 1 0 011-1h2a1 1 0 01.867.5l.267.533a1 1 0 001.732 0l.267-.533A1 1 0 0110 3z" />
    </svg>
);


export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm5 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

export const UserGroupIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0m3.75-9a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0m2.25-4.125c1.121-1.121 3.303-1.121 4.424 0m-4.424 0a6.375 6.375 0 01-3.162 5.162m3.162-5.162a6.375 6.375 0 003.162 5.162" />
    </svg>
);

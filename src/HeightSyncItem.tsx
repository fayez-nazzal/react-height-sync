import React, { useContext, useEffect } from 'react';
import { SyncContext } from './HeightSyncWrapper';

const HeightSyncItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { registerItem, onParentScroll, unregisterItem } =
    useContext(SyncContext);

  useEffect(() => {
    if (!ref.current) return;
    const items = Array.from(ref.current?.children || []) as HTMLElement[];
    registerItem(items, ref.current);

    return () => {
      unregisterItem(items, ref?.current);
    };
  }, []);

  return (
    <div
      onScroll={onParentScroll}
      style={{ overflow: 'auto' }}
      className={className}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default HeightSyncItem;

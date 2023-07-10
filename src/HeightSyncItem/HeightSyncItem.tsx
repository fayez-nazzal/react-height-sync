import React from "react";
import { SyncContext } from "../HeightSyncWrapper";

const HeightSyncItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const itemRefs = (children as any[]).map(() =>
    React.useRef<HTMLDivElement>(null)
  );
  const { registerItem, syncScroll, unregisterItem } =
    React.useContext(SyncContext);

  React.useEffect(() => {
    registerItem(itemRefs);
    return () => unregisterItem(itemRefs);
  }, []);

  return (
    <div
      onScroll={
        syncScroll ? (e) => syncScroll(e.currentTarget.scrollTop) : undefined
      }
      style={{ overflow: "auto" }}
      className={className}
    >
      {(children as any[]).map((child, index) =>
        React.cloneElement(child, { ref: itemRefs[index] })
      )}
    </div>
  );
};

export default HeightSyncItem;

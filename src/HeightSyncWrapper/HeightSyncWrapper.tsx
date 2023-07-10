import React from "react";

type SyncContextType = {
  registerItem: (item: React.RefObject<HTMLDivElement>[]) => void;
  unregisterItem: (item: React.RefObject<HTMLDivElement>[]) => void;
  syncScroll: ((scrollTop: number) => void) | null;
};

export const SyncContext = React.createContext<SyncContextType>({
  registerItem: () => {},
  unregisterItem: () => {},
  syncScroll: null,
});

type HeightSyncWrapperProps = {
  syncScroll: boolean;
  children: React.ReactNode;
};

const HeightSyncWrapper: React.FC<HeightSyncWrapperProps> = ({
  children,
  syncScroll,
}) => {
  const [items, setItems] = React.useState<React.RefObject<HTMLDivElement>[][]>(
    []
  );
  const [scrollTop, setScrollTop] = React.useState(0);

  const registerItem = (item: React.RefObject<HTMLDivElement>[]) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const unregisterItem = (item: React.RefObject<HTMLDivElement>[]) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  React.useEffect(() => {
    const maxHeights =
      items[0]?.map((_, i) =>
        Math.max(...items.map((item) => item[i]?.current?.offsetHeight || 0))
      ) || [];

    for (const itemRefs of items) {
      for (let i = 0; i < itemRefs.length; i++) {
        const ref = itemRefs[i];
        ref.current.style.height = `${maxHeights[i]}px`;
      }
    }
  }, [items]);

  React.useEffect(() => {
    for (const itemRefs of items) {
      for (const ref of itemRefs) {
        ref.current.scrollTop = scrollTop;
      }
    }
  }, [scrollTop, items]);

  return (
    <SyncContext.Provider
      value={{
        registerItem,
        unregisterItem,
        syncScroll: syncScroll ? setScrollTop : null,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export default HeightSyncWrapper;

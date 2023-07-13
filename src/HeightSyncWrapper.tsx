import React from 'react';

type SyncContextType = {
  registerItem: (item: HTMLElement[], parent: HTMLElement) => void;
  unregisterItem: (item: HTMLElement[], parent?: HTMLElement | null) => void;
  onParentScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

export const SyncContext = React.createContext<SyncContextType>({
  registerItem: () => {},
  unregisterItem: () => {},
  onParentScroll: () => {},
});

type HeightSyncWrapperProps = {
  syncScroll: boolean;
  children: React.ReactNode;
};

const HeightSyncWrapper: React.FC<HeightSyncWrapperProps> = ({
  children,
  syncScroll,
}) => {
  const [items, setItems] = React.useState<HTMLElement[][]>([]);
  const [parents, setParents] = React.useState<HTMLElement[]>([]);

  const registerItem = (item: HTMLElement[], parent: HTMLElement) => {
    setItems((prevItems) => [...prevItems, item]);
    setParents((prevParents) => [...prevParents, parent]);
  };

  const unregisterItem = (item: HTMLElement[], parent?: HTMLElement | null) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
    setParents((prevParents) => prevParents.filter((p) => p !== parent));
  };

  React.useEffect(() => {
    const maxHeights =
      items[0]?.map((_, i) =>
        Math.max(...items.map((item) => item[i]?.offsetHeight || 0))
      ) || [];

    for (const elements of items) {
      for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];
        elem.style.height = `${maxHeights[i]}px`;
      }
    }
  }, [items]);

  const onParentScroll = ({ currentTarget }: React.UIEvent<HTMLDivElement>) => {
    if (!syncScroll) return;

    for (const parent of parents) {
      if (parent.isEqualNode(currentTarget)) continue;
      parent.scrollTop = currentTarget.scrollTop;
    }
  };

  return (
    <SyncContext.Provider
      value={{
        registerItem,
        unregisterItem,
        onParentScroll,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export default HeightSyncWrapper;

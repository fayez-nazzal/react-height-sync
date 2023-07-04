# 🔄 React Height Sync

[![npm version](https://img.shields.io/npm/v/@height-sync/react.svg?style=flat)](https://www.npmjs.com/package/@height-sync/react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@height-sync/react)](https://bundlephobia.com/result?p=@height-sync/react)

A simple yet powerful React library for syncing the heights and scroll position of multiple components.

## 📦 Installation

```bash
npm install @height-sync/react

# OR
pnpm install @height-sync/react

# OR
yarn add @height-sync/react
```

## 🔨 Usage

```tsx
import HeightSyncWrapper from "@height-sync/react/HeightSyncWrapper";
import HeightSyncItem from "@height-sync/react/HeightSyncItem";

<HeightSyncWrapper syncScroll={true}>
  <HeightSyncItem>
    <div>item1</div>
    <div style={{ height: "30px" }}>item2</div>
    <div>item3</div>
  </HeightSyncItem>
  <HeightSyncItem>
    <div>item4</div>
    <div style={{ height: "20px" }}>item5</div>
    <div>item6</div>
  </HeightSyncItem>
</HeightSyncWrapper>;
```

In this example, the height of each corresponding child of the HeightSyncItem components will be the same, based on the tallest element in each position, and scrolling one HeightSyncItem will cause the other to scroll as well.

## ⚙ API

- HeightSyncWrapper - A wrapper component that handles the synchronization of its children. It accepts a syncScroll prop which, when true, syncs the scroll position of its children.

- HeightSyncItem - Represents an individual item that should have its height synced with other HeightSyncItem components. Place the elements you want to have their height synced within this component.

## 🚀 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📃 License

MIT

import React from "react";
import HeightSyncWrapper from "./HeightSyncWrapper";
import HeightSyncItem from "./HeightSyncItem";

export default {
  title: "Height Sync",
};

const BasicStory = (args) => (
  <HeightSyncWrapper {...args}>
    <HeightSyncItem>
      <div style={{ height: 200 }}>item 1</div>
      <div style={{ height: 50 }}>item 2</div>
      <div style={{ height: 40 }}>item 3</div>
    </HeightSyncItem>
    <HeightSyncItem>
      <div style={{ height: 300 }}>item 1</div>
      <div style={{ height: 40 }}>item 2</div>
      <div style={{ height: 80 }}>item 3</div>
    </HeightSyncItem>
  </HeightSyncWrapper>
);

export const HeightSync = BasicStory.bind({});

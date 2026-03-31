import React from "react";
import { Image, Button, Tag } from "antd";
import Card from "./components/Card";
import AntCard from "./components/AntCard";
import "./App.css";

export default function App() {
  const items = [
    {
      id: 1,
      name: "Image 1",
      image_url: "https://picsum.photos/id/1018/400/300",
      description: "First card image"
    },
    {
      id: 2,
      name: "Image 2",
      image_url: "https://picsum.photos/id/1015/400/300",
      description: "Second card image"
    }
  ];

  return (
    <>
      <header>
        <h1>My First App</h1>
      </header>

      <main>
        <p>Hello React!</p>

        <h2>Custom Cards</h2>
        {items.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            image_url={item.image_url}
            description={item.description}
          />
        ))}

        <h2>Ant Design Image</h2>
        <Image
          width={200}
          src="https://picsum.photos/id/1025/400/300"
        />

        <h2>Ant Design Card</h2>
        <AntCard
          name="Forest"
          image_url="https://picsum.photos/id/1040/400/300"
          description="This is an Ant Design card."
        />

        <h2>Button</h2>
        <Button type="primary">Click Me</Button>

        <h2>Tag</h2>
        <Tag color="blue">Example Tag</Tag>

      </main>
    </>
  );
}
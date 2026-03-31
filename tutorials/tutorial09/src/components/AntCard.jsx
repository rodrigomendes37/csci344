import React from "react";
import { Card } from "antd";

export default function AntCard({ name, image_url, description }) {
  return (
    <Card title={name} style={{ width: 250 }}>
      <img src={image_url} alt={name} width="200" />
      <p>{description}</p>
    </Card>
  );
}
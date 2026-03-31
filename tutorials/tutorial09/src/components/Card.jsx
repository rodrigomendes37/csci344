import React from "react";
import "./Card.css";

export default function Card({ name, image_url, description }) {
  return (
    <section className="card">
      <h3>{name}</h3>
      <img src={image_url} alt={name} width="200" />
      <p>{description}</p>
    </section>
  );
}
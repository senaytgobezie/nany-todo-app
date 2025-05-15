"use client"
import Red from "@/components/Red";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [color, setColor] = useState("blue");
  const [size, setSize] = useState(100)
  return (
    <div>
      <h1>Hello Home</h1>
      <Link href="/home/a"> A page</Link>
      <Red size={300} color={color} />
      <input type="color" placeholder="pick color" value={color} onChange={(event) => { setColor(event.target.value) }} />
      <input type="number" placeholder="pick size" value={size} onChange={(event) => { setSize(Number(event.target.value)) }} />
    </div>
  )
}

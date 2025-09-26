import React, { useState, useEffect } from "react";
import "./Banner.css";

const banners = [
  { id: 1, img: "/images/banner1.jpg", title: "Banner 1", desc: "This is banner 1" },
  { id: 2, img: "/images/banner2.jpg", title: "Banner 2", desc: "This is banner 2" },
  { id: 3, img: "/images/banner3.jpg", title: "Banner 3", desc: "This is banner 3" }
];

function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      <button onClick={() => setIndex((index - 1 + banners.length) % banners.length)}>◀</button>
      <div className="banner-content">
        <img src={banners[index].img} alt={banners[index].title} />
        <div className="banner-text">
          <h3>{banners[index].title}</h3>
          <p>{banners[index].desc}</p>
        </div>
      </div>
      <button onClick={() => setIndex((index + 1) % banners.length)}>▶</button>
    </div>
  );
}

export default Banner;

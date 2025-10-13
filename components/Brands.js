import Image from "next/image";

export default function Brands() {
  return (
    <section id="home" className="brands">
      <div className="brands-container">
        <Image
          src="/images/1.png"
          alt="Brand Logo 1"
          width={200}
          height={120}
          className="brand-image"
        />
        <Image
          src="/images/2.png"
          alt="Brand Logo 2"
          width={200}
          height={120}
          className="brand-image"
        />
        <Image
          src="/images/3.png"
          alt="Brand Logo 3"
          width={200}
          height={120}
          className="brand-image"
        />
        <Image
          src="/images/4.png"
          alt="Brand Logo 4"
          width={200}
          height={120}
          className="brand-image"
        />
      </div>
    </section>
  );
}

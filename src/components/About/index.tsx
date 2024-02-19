import React from "react";

const highlights = [
  {
    title: "10.5k",
    description: "Sallers active our site",
  },
  {
    title: "33k",
    description: "Monthly product sale",
  },
  {
    title: "44.5k",
    description: "Customer active in our site",
  },
  {
    title: "25k",
    description: "Annual gross sale in our site",
  },
];

const keypoints = [
  {
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    title: "MONEY BACK GUARANTEE",
    description: "We reurn money within 30 days",
  },
];

const people = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
  },
];
const About: React.FC = () => {
  return (
    <div className="p-44">
      {/* about  */}
      <div className="flex gap-16">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-16">Our Story</h1>
          <p className="mb-8" style={{ lineHeight: 1.7 }}>
            Launced in 2024, QUickBizz is South Asia’s premier online B2B
            makterplace with an active presense in India. Supported by wide
            range of tailored marketing, data and service solutions, QuickBizz
            has 10,500 sellers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            QUickBizz has more than 1 Million products to offer, growing at a
            very fast. QuickBizz offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="bg-gray-200 flex-grow w-full"></div>
      </div>

      {/* hightlights */}
      <div className="mt-24 flex w-full justify-between gap-5">
        {highlights.map((highlight) => (
          <div className="p-5 w-full border border-gray-300 flex flex-col gap-2 items-center">
            <div className="rounded-full w-24 h-24 bg-gray-300"></div>
            <h1 className="text-2xl font-bold">{highlight.title}</h1>
            <p>{highlight.description}</p>
          </div>
        ))}
      </div>

      {/* people  */}
      <div className="mt-24 flex w-full justify-between gap-5">
        {people.map((people) => (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-96 bg-gray-300"></div>
            <div className="flex flex-col">
              <h1 className="text-2xl">{people.name}</h1>
              <p>{people.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* key points  */}
      {/* hightlights */}
      <div className="mt-24 flex w-full justify-between gap-5">
        {keypoints.map((highlight) => (
          <div className="p-5 w-full flex flex-col gap-2 items-center">
            <div className="rounded-full w-24 h-24 bg-gray-300"></div>
            <h1 className="text-2xl font-bold">{highlight.title}</h1>
            <p>{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

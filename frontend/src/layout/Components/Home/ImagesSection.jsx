import React from "react";

const ImagesSection = () => {
  const featuredImages = [
    {
      src: "https://media.istockphoto.com/id/482783107/photo/world-of-books.jpg?s=612x612&w=0&k=20&c=9WgP-LFqYrOZKWOCwHvA7tXmDpeNVS7x7b-GZ1yW7xM=",
      alt: "Featured Product 1",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxesPR6rDe9zCQ4R6NCT58NSqx4-aRZdNgg&s",
      alt: "Featured Product 2",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3zVDVi8vJYw9--64RC2GQdY-WTBZWwzMQw&s",
      alt: "Featured Product 3",
    },
  ];

  return (
    <section className="bg-bg-color mb-10">
      <div className="flex flex-col items-center justify-center lg:gap-4 lg:flex-row gap-6  overflow-hidden shadow-lg">
        {featuredImages.map((img, idx) => (
          <div key={idx} className="w-full  lg:w-1/3">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-72 object-cover transition duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImagesSection;

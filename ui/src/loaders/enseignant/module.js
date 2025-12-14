import { defer } from "react-router-dom";

const lecons = [
  {
    id: 1,
    title: "Lesson 1",
    description: "This is the first lesson",
    modification: "12-jan-2025",
  },
  {
    id: 2,
    title: "Lesson 2",
    description: "This is the second lesson",
    modification: "12-jan-2025",
  },
  {
    id: 3,
    title: "Lesson 3",
    description: "This is the third lesson",
    modification: "12-jan-2025",
  },
];

const module = {
  titre: "Module",
  description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
          minima ipsam nam! Cupiditate iusto at quos quia ad sunt id
          exercitationem, quisquam, consequatur, quod tenetur praesentium ut rem
          officia accusamus.`,
};

export default async function (params) {
  return defer({
    module: new Promise((resolve) => {
      setTimeout(() => {
        resolve(module);
      }, 1000);
    }),
    lecons: new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve(lecons);
      }, 1000);
    }),
  });
}

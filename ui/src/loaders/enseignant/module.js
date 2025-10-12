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

export default async function (params) {
  return defer({
    lecons: new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve(lecons);
      }, 1000);
    }),
  });
}

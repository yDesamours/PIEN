export function boxArgument(component, data, id, order) {
  return {
    data,
    component,
    id,
    order,
  };
}

export const storage = {
  setCourse: (state) => {
    localStorage.setItem("course", JSON.stringify(state));
  },
  getCourse: () => {
    const course = localStorage.getItem("course");
    return course ? JSON.parse(course) : null;
  },
};

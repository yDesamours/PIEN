import CourseBulderProvider from "../../../../context/courseContext";
import ContentChoser from "./contentChoser/contentChoser";
import CourseContent from "./CourseContent";

export default function CourseBuilder() {
  return (
    <CourseBulderProvider>
      <div className="relative h-full flex space-x-1">
        <CourseContent />
        <ContentChoser />
      </div>
    </CourseBulderProvider>
  );
}

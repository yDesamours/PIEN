import TabPane from "../../../../components/tabpane/tabpane";
import TabPaneContent from "../../../../components/tabpane/tabPaneContent";
import CourseBulderProvider from "../../../../context/courseContext";
import ResourceChoser from "../organizer/resourceChoser";
import ResourceList from "../organizer/resourceList";
import BuilderToolbar from "./builderToolbar";
import ContentChoser from "./contentChoser/contentChoser";
import CourseContent from "./CourseContent";
import Preview from "./preview";

export default function CourseBuilder() {
  return (
    <CourseBulderProvider>
      <ResourceChoser>
        <TabPane defaultValue="builder">
          <BuilderToolbar />
          <TabPaneContent value="builder">
            <div
              className="relative h-full flex gap-2 bg-gray-200"
              id="course-builder"
            >
              <CourseContent />
              <ContentChoser />
              <ResourceList />
            </div>
          </TabPaneContent>
          <TabPaneContent value="preview">
            <Preview />
          </TabPaneContent>
        </TabPane>
      </ResourceChoser>
    </CourseBulderProvider>
  );
}

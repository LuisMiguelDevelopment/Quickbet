import DefaultLayout from "@/layouts/default";
import { Banner } from "@/components/banner";
import MovieList from "@/components/popular";
import { useRef } from "react";

export default function IndexPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const onMouseMove = (event: MouseEvent) => {
      const x = event.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <DefaultLayout>
        <section className="">
          <Banner />
        </section>
        <div className="flex">
          <section
            className="bg-gray-900"
            style={{ width: "200px", height: "100vh" }}
          ></section>
          <section className="w-full">
            <h2 style={{fontSize:"1.8rem"}}  >Popular</h2>
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              className="flex gap-5 mt-5 overflow-x-hidden scrollbar-hide cursor-grab "
            >
              <MovieList />
            </div>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}

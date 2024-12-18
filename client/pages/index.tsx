import DefaultLayout from "@/layouts/default";
import { Banner } from "@/components/banner";
import MovieList from "@/components/popular";
import { useRef } from "react";
import NowPaying from "@/components/nowPaying";

export default function IndexPage() {
  const movieListRef = useRef<HTMLDivElement>(null);
  const nowPayingRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const container = ref.current;
    if (!container) return;

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    const startX =
      "touches" in e ? e.touches[0].pageX : e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const onMove = (event: MouseEvent | TouchEvent) => {
      const x =
        "touches" in event
          ? event.touches[0].pageX
          : event.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    const onUp = () => {
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
  };

  return (
    <DefaultLayout>
      <section>
        <Banner />
      </section>
      <div className="flex">
        <section
          style={{ width: "500px", height: "100vh", background: "#262626" }}
        ></section>
        <div className="gap-5 mt-5 overflow-x-hidden ml-5">
          <section className="w-full">
            <h2 style={{ fontSize: "1.8rem" }}>Popular</h2>
            <div
              ref={movieListRef}
              onMouseDown={(e) => handleMouseDown(e, movieListRef)}
              onTouchStart={(e) => handleMouseDown(e, movieListRef)}
              className="flex gap-5 mt-5 overflow-x-hidden scrollbar-hide cursor-grab"
            >
              <MovieList />
            </div>
          </section>

          <section className="w-full">
            <h2 style={{ fontSize: "1.8rem" }}>Now Paying</h2>
            <div
              ref={nowPayingRef}
              onMouseDown={(e) => handleMouseDown(e, nowPayingRef)}
              onTouchStart={(e) => handleMouseDown(e, nowPayingRef)}
              className="flex gap-5 mt-5 overflow-x-hidden scrollbar-hide cursor-grab"
            >
              <NowPaying />
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );
}

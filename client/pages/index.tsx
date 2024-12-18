import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Banner } from "@/components/banner";
import MovieList from "@/components/movieList";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center  gap-4 ">
        <Banner />
      </section>
      <section className="flex flex-wrap gap-5 mt-10">
        <MovieList />
      </section>
    </DefaultLayout>
  );
}

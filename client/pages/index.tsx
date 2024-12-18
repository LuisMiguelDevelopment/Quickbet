import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Banner } from "@/components/banner";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center  gap-4 ">
       <Banner/>
      </section>
    </DefaultLayout>
  );
}

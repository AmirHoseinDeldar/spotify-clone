import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import Image from "next/image";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden">
      <Header>
        <div className="mb-3">
          <h1 className="text-white text-3xl font-semibold mb-3">
            خوش برگشتید
          </h1>
          <div className="grid grid-cols-1 sm:grid-col-2 xl:grid-col-3 2xl:grid-col-4 gap-3 ml-4">
            <ListItem
              image="/images/liked.png"
              name="آهنگ مورد علاقه"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            جدیدترین اهنگ ها
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}

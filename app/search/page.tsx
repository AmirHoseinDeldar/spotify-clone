import { getSongsByTitle } from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import React from "react";
import { SearchContent } from "./components/SearchContent";
import SearchInput from "@/components/SearchInput";

interface SearchPops {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchPops) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="form-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl">سرچ</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;

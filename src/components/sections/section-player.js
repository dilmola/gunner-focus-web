"use client";

import React from "react";
import jerseyNumbers from "@/libs/jerseyNumbers";
import flags from "@/libs/nationalFlags";
import preferredFoot from "@/libs/preferredFoot";
import Image from "next/image";

export default function SectionPlayer({ playerData }) {
  return (
    <section className="space-y-4">
      <section className="background-card w-full rounded-lg p-2 gap-2 md:p-4 flex flex-col sm:grid sm:grid-cols-2 lg:gap-36 content-center text-romanceColor">
        <article className="flex flex-row gap-2">
          <figure>
            <Image
              src={playerData?.player.photo ?? "/"}
              alt={playerData?.player.photo ?? "-"}
              className="h-12 w-12 sm:h-28 sm:w-28 rounded mr-6 bg-gainsboroColor object-contain"
              width={108}
              height={108}
            />
          </figure>
          <div>
            <p className="text-lg sm:text-2xl font-bold">
              {playerData?.player?.name}
            </p>
            <p className="font-semibold text-sm">
              {playerData?.statistics?.[0]?.games?.position ?? "-"}
            </p>
          </div>
        </article>
        <article className="items-stretch flex flex-col sm:grid sm:grid-cols-3 gap-2 p-2 sm:p-6 bg-gainsboroColor dark:bg-montanaColor rounded-md text-sm  text-mirageOpa50Color dark:text-romanceOpa50Color font-medium">
          <div className="self-start sm:self-center">
            <p>Captain</p>
            <p className="font-semibold text-lg text-mirageColor dark:text-romanceColor">
              {playerData?.statistics?.[0]?.games?.captain ? "Yes" : "-"}
            </p>
          </div>
          <div className="self-start sm:self-center">
            <p>Shirt number</p>
            <p className="font-semibold text-lg text-mirageColor dark:text-romanceColor">
              #{jerseyNumbers[playerData?.player?.id] ?? "-"}
            </p>
          </div>
          <div className="self-start sm:self-center">
            <p>Nationality</p>
            <div className="flex font-semibold text-lg space-x-2 text-mirageColor dark:text-romanceColor">
              <img
                src={flags[playerData?.player?.nationality]?.src}
                alt={playerData?.player?.nationality}
                className="h-6 rounded"
              />
              <p>{playerData?.player?.nationality}</p>
            </div>
          </div>
        </article>
      </section>
      <section className="bg-whitesmokeColor dark:bg-codgreyColor rounded-lg p-2 md:p-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-mirageOpa50Color dark:text-romanceOpa50Color font-medium">
        <article>
          <h3>First name</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.player?.firstname}
          </p>
        </article>
        <article>
          <h3>Last name</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.player?.lastname}
          </p>
        </article>
        <article>
          <h3>Age</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.player?.age}
          </p>
        </article>
        <article>
          <h3>Weight</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.player?.weight}
          </p>
        </article>
        <article>
          <h3>Height</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.player?.height}
          </p>
        </article>
        <article>
          <h3>Preferred foot</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {preferredFoot[playerData?.player?.id] ?? "-"}
          </p>
        </article>
        <article>
          <h3>Appearances</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.statistics?.[0]?.games?.appearances ?? "-"}
          </p>
        </article>
        <article>
          <h3>Minutes</h3>
          <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
            {playerData?.statistics?.[0]?.games?.minutes ?? "-"}
          </p>
        </article>
        <article className="flex flex-col space-y-2 sm:col-span-2 bg-gainsboroColor dark:bg-montanaColor p-4 rounded text-mirageOpa50Color dark:text-romanceOpa50Color">
          <h3>Birth</h3>
          <div className="grid grid-cols-3">
            <div>
              <h4>Date</h4>
              <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
                {playerData?.player?.birth?.date ?? "-"}
              </p>
            </div>
            <div>
              <h4>Place</h4>
              <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
                {playerData?.player?.birth?.place ?? "-"}
              </p>
            </div>
            <div>
              <h4>Country</h4>
              <div className="flex space-x-2">
                <img
                  src={flags[playerData?.player?.birth?.country]?.src}
                  alt={playerData?.player?.birth?.country}
                  className="h-6 rounded"
                />
                <p className="text-mirageColor dark:text-romanceColor text-lg font-bold">
                  {playerData?.player?.birth?.country ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

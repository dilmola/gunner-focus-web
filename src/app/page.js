"use client";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen pl-6 pr-6 mx-auto max-w-[740px]">
      <div className="items-start">
        <p className="text-6xl font-bold">Hi!!, I’m Web Developer</p>
        <p className="mt-2 text-xl font-medium opacity-45">
          I derive immense joy and fulfillment from the art of crafting
          websites.
        </p>
        <a
          href="https://drive.google.com/file/d/1oqkJoMfO16RfphG3oGQyCQ3bY3OyrZpH/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 inline-block font-medium items-center bg-white text-white p-2 rounded-lg"
        >
          Resume
        </a>
      </div>
    </div>
  );
}

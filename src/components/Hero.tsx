function Hero() {
  return (
    <div className="h-[calc(100vh_-_3.5rem)] bg-hero bg-center object-cover">
      <main className="container mx-auto flex h-full flex-col items-end justify-center px-6 md:px-0">
        <div className="flex max-w-md flex-col items-center justify-center gap-12">
          <h1 className="flex-col items-end justify-center whitespace-break-spaces text-center font-lato text-4xl font-extrabold uppercase leading-normal text-neutral-50 [text-shadow:_0px_4px_4px_rgba(0,_0,_0,_0.25)]">
            Lorem ipsum dolor sit amet consectetur
          </h1>
          <button
            type="button"
            className="border-4 border-neutral-50 bg-neutral-50/20 px-8 py-4 font-lato text-xl font-extrabold uppercase leading-normal text-neutral-50 hover:bg-neutral-50/30"
          >
            Ver mais
          </button>
        </div>
      </main>
    </div>
  );
}

export default Hero;

const Trust = () => {
  const data = [
    {
      author: "Dr. Elena",
      dignitary: "Professor of Pharmacology",
      review:
        "BNS Pharma's commitment to research and development has significantly advanced our understanding of drug delivery systems.",
    },
    {
      author: "Dr. Elena",
      dignitary: "Professor of Pharmacology",
      review:
        "BNS Pharma's commitment to research and development has significantly advanced our understanding of drug delivery systems.",
    },
  ];
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex">
          {/* FIRST BLOCK INTRO  */}
          <div>
            <h2 className="heading-2">Institutional Trust</h2>
            <p className="mt-4 text-sm">
              Our partnerships with leading academic institutions and research
              organizations demonstrate our commitment to scientific excellence
              and innovation.
            </p>
          </div>

          {/* OTHER CARDS  */}
          {data.map((item, index) => (
            <div
              className="bg-muted-foreground/8 px-8 py-6 mr-2 relative"
              key={index}
            >
              <p className="italic">"{item.review}"</p>

              {/* APOSTROPHE */}
              <div className="absolute top-4 right-4 text-8xl text-muted-foreground/20">
                "
              </div>

              {/* AUTHOR DETALS  */}
              <div className="flex gap-2 items-center mt-4">
                <div className="size-10 flex items-center justify-center font-bold rounded-xs shadow bg-muted-foreground/20">
                  {item.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-primary font-semibold">{item.author}</h3>
                  <p className="text-muted-foreground -mt-1">
                    {item.dignitary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
